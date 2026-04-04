const User = require("../models/user.model");
const Habit = require("../models/Habit");



exports.createHabit = async (req, res) => {
  try {
    const { title, difficulty } = req.body;
    const xpMap = { easy: 10, medium: 20, hard: 30 };
    const xpReward = xpMap[difficulty] || 10;

    const habit = new Habit({
      title,
      difficulty,
      xpReward,
      userId: req.user.id,
    });

    await habit.save();

    res.json({
      success: true,
      habit,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id });

    res.json({
      success: true,
      habits,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    await Habit.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Habit deleted",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    const habit = await Habit.findById(habitId);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Add today's completion
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    habit.completedDates.push(today);

    // Update streak
    if (habit.lastCompleted) {
      const last = new Date(habit.lastCompleted);
      last.setHours(0, 0, 0, 0);

      const diffDays = (today - last) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        habit.streak += 1; // completed yesterday → streak continues
      } else if (diffDays > 1) {
        habit.streak = 1;  // missed a day → reset streak
      }
    } else {
      habit.streak = 1;    // first time completing
    }

    habit.lastCompleted = today;

    await habit.save();

    // Increase XP
    const user = await User.findById(req.user.id);

    user.totalXP = (user.totalXP || 0) + habit.xpReward;

    // Level formula
    user.level = Math.floor(user.totalXP / 100) + 1;

    await user.save();

    res.json({
      success: true,
      message: "Habit completed!",
      streak: habit.streak,
      totalXP: user.totalXP,
      level: user.level
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};