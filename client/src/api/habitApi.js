import API from "./axios";

export const getHabits = () => {
  return API.get("/habits");
};

export const createHabit = (data) => {
  return API.post("/habits", data);
};

export const completeHabit = (id) => {
  return API.put(`/habits/complete/${id}`);
};