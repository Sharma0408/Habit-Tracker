const XPBar = ({ xp, level }) => {
  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const xpProgress = xp - xpForCurrentLevel;
  const percentage = Math.min((xpProgress / 100) * 100, 100);

  return (
    <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <span className="text-white font-bold text-lg">Level {level}</span>
        </div>
        <span className="text-gray-400 text-sm">{xp} XP total</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-gray-500 text-xs">{xpProgress} / 100 XP</span>
        <span className="text-gray-500 text-xs">Next level: {xpForNextLevel} XP</span>
      </div>
    </div>
  );
};

export default XPBar;