const User = require("../models/user.model");
const Habit = require("../models/Habit");



exports.createHabit = async (req, res) => {
  try {
    const { title, difficulty } = req.body;

    const habit = new Habit({
      title,
      difficulty,
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
    habit.completedDates.push(today);

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
      totalXP: user.totalXP,
      level: user.level
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};