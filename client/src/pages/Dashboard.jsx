import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getHabits, createHabit, markHabitComplete, deleteHabit } from "../api/habitApi";

import Navbar from "../components/Navbar";
import XPBar from "../components/XPBar";
import HabitCard from "../components/HabitCard";

const Dashboard = () => {
  const { user, refreshUser } = useAuth();

  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newHabit, setNewHabit] = useState({ title: "", difficulty: "easy" });
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // Fetch habits on load
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data.habits);
    } catch (err) {
      setError("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  // Check if habit is completed today
  const isCompletedToday = (habit) => {
    const today = new Date().toDateString();
    return habit.completedDates?.some(
      (date) => new Date(date).toDateString() === today
    );
  };

  // Add new habit
  const handleAddHabit = async () => {
    if (!newHabit.title.trim()) return;
    setAdding(true);
    try {
      const data = await createHabit(newHabit);
      setHabits([...habits, data.habit]);
      setNewHabit({ title: "", difficulty: "easy" });
      setShowForm(false);
    } catch (err) {
      setError("Failed to create habit");
    } finally {
      setAdding(false);
    }
  };

  // Complete a habit
  const handleComplete = async (habitId) => {
    try {
      await markHabitComplete(habitId);
      await fetchHabits();
      await refreshUser(); // update XP + level in navbar
    } catch (err) {
      setError("Failed to complete habit");
    }
  };

  // Delete a habit
  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setHabits(habits.filter((h) => h._id !== habitId));
    } catch (err) {
      setError("Failed to delete habit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* XP Bar */}
        <XPBar xp={user?.totalXP || user?.xp || 0} level={user?.level || 1} />

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Header + Add button */}
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-xl">
            Your Habits
            <span className="text-gray-500 font-normal text-sm ml-2">
              ({habits.length})
            </span>
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            {showForm ? "Cancel" : "+ Add Habit"}
          </button>
        </div>

        {/* Add Habit Form */}
        {showForm && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-semibold">New Habit</h3>
            <input
              type="text"
              placeholder="e.g. Read for 20 minutes"
              value={newHabit.title}
              onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
            />
            <select
              value={newHabit.difficulty}
              onChange={(e) => setNewHabit({ ...newHabit, difficulty: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="easy">Easy (+10 XP)</option>
              <option value="medium">Medium (+20 XP)</option>
              <option value="hard">Hard (+30 XP)</option>
            </select>
            <button
              onClick={handleAddHabit}
              disabled={adding}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-semibold py-3 rounded-lg transition"
            >
              {adding ? "Adding..." : "Add Habit"}
            </button>
          </div>
        )}

        {/* Habits List */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading habits...</div>
        ) : habits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🎯</p>
            <p className="text-gray-400">No habits yet. Add your first one!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onComplete={handleComplete}
                onDelete={handleDelete}
                isCompletedToday={isCompletedToday(habit)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;