const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { getLeaderboard, getProfile } = require("../controllers/user.controller");

router.get("/profile", authMiddleware, getProfile);      // ADD THIS
router.get("/leaderboard", authMiddleware, getLeaderboard);

module.exports = router;