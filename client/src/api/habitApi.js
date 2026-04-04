
import api from "./axios";

// Get all habits for logged-in user
export const getHabits = async () => {
  const response = await api.get("/habits");
  return response.data;
};

// Create a new habit
export const createHabit = async (habitData) => {
  const response = await api.post("/habits", habitData);
  return response.data;
};

// Mark a habit as complete for today (gives XP)
export const markHabitComplete = async (habitId) => {
  const response = await api.patch(`/habits/complete/${habitId}`);
  return response.data;
};

// Delete a habit
export const deleteHabit = async (habitId) => {
  const response = await api.delete(`/habits/${habitId}`);
  return response.data;
};