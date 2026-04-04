const difficultyConfig = {
  easy:   { color: "text-green-400",  bg: "bg-green-400/10",  border: "border-green-400/30",  xp: 10, label: "Easy" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", xp: 20, label: "Medium" },
  hard:   { color: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/30",    xp: 30, label: "Hard" },
};

const HabitCard = ({ habit, onComplete, onDelete, isCompletedToday }) => {
  const config = difficultyConfig[habit.difficulty] || difficultyConfig.easy;

  return (
    <div className={`bg-gray-800 border ${isCompletedToday ? "border-indigo-500/50" : "border-gray-700"} rounded-2xl p-5 flex justify-between items-center gap-4`}>
      
      {/* Left side */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-white font-semibold text-lg ${isCompletedToday ? "line-through text-gray-500" : ""}`}>
            {habit.title}
          </h3>
          {isCompletedToday && <span className="text-green-400 text-sm">✓ Done</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2 py-1 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
            {config.label}
          </span>
          <span className="text-gray-500 text-xs">+{habit.xpReward} XP</span>
          <span className="text-gray-500 text-xs">🔥 {habit.streak} streak</span>
        </div>
      </div>

      {/* Right side — buttons */}
      <div className="flex items-center gap-2">
        {!isCompletedToday && (
          <button
            onClick={() => onComplete(habit._id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => onDelete(habit._id)}
          className="bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg transition"
        >
          🗑
        </button>
      </div>
    </div>
  );
};

export default HabitCard;