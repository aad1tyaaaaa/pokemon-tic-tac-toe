'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  id: string;
  name: string;
  wins: number;
  losses: number;
  aiWins?: number;
  draws: number;
  winRate: number;
  timestamp: number;
}

interface LeaderboardProps {
  currentStats?: {
    playerWins: number;
    aiWins: number;
    draws: number;
  };
  onStatsUpdate?: (entries: LeaderboardEntry[]) => void;
}

export function Leaderboard({ currentStats, onStatsUpdate }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Load leaderboard on mount
  useEffect(() => {
    const saved = localStorage.getItem('pokemonTicTacToe_leaderboard');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEntries(parsed);
      } catch (e) {
        console.error('Failed to parse leaderboard:', e);
      }
    }
  }, []);

  // Notify parent of updates
  useEffect(() => {
    onStatsUpdate?.(entries);
  }, [entries, onStatsUpdate]);

  const handleSaveScore = () => {
    if (!playerName.trim() || !currentStats) return;

    const totalGames =
      currentStats.playerWins + currentStats.aiWins + currentStats.draws;
    const winRate =
      totalGames > 0 ? ((currentStats.playerWins / totalGames) * 100).toFixed(1) : '0.0';

    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      name: playerName.trim(),
      wins: currentStats.playerWins,
      losses: currentStats.aiWins,
      aiWins: currentStats.aiWins,
      draws: currentStats.draws,
      winRate: parseFloat(winRate),
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...entries].sort((a, b) => {
      if (b.winRate !== a.winRate) return b.winRate - a.winRate;
      return b.wins - a.wins;
    });

    setEntries(updated);
    localStorage.setItem('pokemonTicTacToe_leaderboard', JSON.stringify(updated));
    setPlayerName('');
    setShowInput(false);
  };

  const clearLeaderboard = () => {
    if (confirm('Clear all leaderboard entries?')) {
      setEntries([]);
      localStorage.removeItem('pokemonTicTacToe_leaderboard');
    }
  };

  return (
    <div className="w-full max-w-sm bg-pink-50 border-2 border-red-300 rounded p-4">
      <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
        LEADERBOARD
      </h3>

      {/* Score saver */}
      {currentStats && (
        <div className="mb-4 p-3 bg-white border-2 border-red-200 rounded">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="w-full px-3 py-2 bg-red-400 hover:bg-red-500 text-white font-bold rounded text-sm transition-colors"
            >
              Save Current Score
            </button>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter name"
                maxLength={20}
                className="flex-1 px-2 py-1 border-2 border-red-300 rounded text-sm"
                onKeyPress={(e) =>
                  e.key === 'Enter' && handleSaveScore()
                }
                autoFocus
              />
              <button
                onClick={handleSaveScore}
                disabled={!playerName.trim()}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold rounded text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setPlayerName('');
                }}
                className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard list */}
      {entries.length > 0 ? (
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-gray-600 grid grid-cols-5 gap-1 px-2 pb-2 border-b border-red-200 uppercase">
            <div>Rank</div>
            <div>Name</div>
            <div>User</div>
            <div>AI</div>
            <div>Rate</div>
          </div>
          {entries.slice(0, 10).map((entry, idx) => (
            <div
              key={entry.id}
              className="text-[10px] grid grid-cols-5 gap-1 px-2 py-1 bg-white rounded border border-red-100 hover:bg-pink-100 transition-colors"
            >
              <div className="font-bold text-red-600">#{idx + 1}</div>
              <div className="truncate font-semibold">{entry.name}</div>
              <div className="text-green-600 font-bold">{entry.wins}</div>
              <div className="text-red-500 font-bold">{entry.aiWins ?? entry.losses}</div>
              <div className="text-yellow-600 font-bold">
                {entry.winRate}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-600 text-sm">
          No scores yet. Play to earn a spot!
        </div>
      )}

      {/* Clear button */}
      {entries.length > 0 && (
        <button
          onClick={clearLeaderboard}
          className="w-full mt-4 px-3 py-2 bg-red-200 hover:bg-red-300 text-gray-700 font-bold rounded text-xs transition-colors"
        >
          Clear Leaderboard
        </button>
      )}
    </div>
  );
}
