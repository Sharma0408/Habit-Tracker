const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createHabit,
  getHabits,
  deleteHabit,
  completeHabit,
} = require("../controllers/habitController");

router.post("/", authMiddleware, createHabit);
router.get("/", authMiddleware, getHabits);
router.delete("/:id", authMiddleware, deleteHabit);
router.patch("/complete/:habitId", authMiddleware, completeHabit);

module.exports = router;