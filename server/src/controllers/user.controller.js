const User = require("../models/user.model");

// GET /api/user/profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp || 0,
        totalXP: user.totalXP || 0,
        level: user.level || 1,
        streak: user.streak || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/user/leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("name totalXP level")
      .sort({ totalXP: -1 })
      .limit(10);

    res.json({
      success: true,
      leaderboard: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};