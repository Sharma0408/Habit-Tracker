const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  register,
  loginUser,
  getProfile,
} = require("../controllers/auth.controller");

// Public routes
router.post("/register", register);
router.post("/login", loginUser);

// Protected route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;