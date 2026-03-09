const User = require("../models/user.model");

exports.getLeaderboard = async (req, res) => {
  try {

    const users = await User.find()
      .select("name totalXP level")
      .sort({ totalXP: -1 })
      .limit(10);

    res.json({
      success: true,
      leaderboard: users
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};