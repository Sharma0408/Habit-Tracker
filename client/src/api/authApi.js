// client/src/api/authApi.js

import api from "./axios";

// Register new user
export const registerUser = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Get logged-in user profile (XP, level, streak)
export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};