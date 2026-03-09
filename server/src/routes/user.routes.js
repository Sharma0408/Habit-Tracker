const express = require("express");
const router = express.Router();

const { getLeaderboard } = require("../controllers/user.controller");

router.get("/leaderboard", getLeaderboard);

module.exports = router;