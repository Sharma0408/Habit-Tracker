const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    xpReward: {
      type: Number,
      default: 10,
    },

    completedDates: [
      {
        type: Date,
      },
    ],

    streak: {
      type: Number,
      default: 0,
    },

    lastCompleted: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);