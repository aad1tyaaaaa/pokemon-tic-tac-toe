'use client';

import { useEffect, useState } from 'react';

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  wins: number;
  losses: number;
  aiWins: number;
  draws: number;
  timestamp: number;
}

const LEADERBOARD_KEY = 'pokemon-tictactoe-leaderboard';

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load leaderboard:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const addEntry = (playerName: string, result: 'win' | 'loss' | 'draw') => {
    const existingIndex = entries.findIndex(
      (e) => e.playerName.toLowerCase() === playerName.toLowerCase()
    );

    if (existingIndex > -1) {
      // Update existing entry
      const updated = [...entries];
      const entry = updated[existingIndex];
      updated[existingIndex] = {
        ...entry,
        ...(result === 'win' && { wins: entry.wins + 1 }),
        ...(result === 'loss' && { aiWins: (entry.aiWins || entry.losses) + 1, losses: entry.losses + 1 }),
        ...(result === 'draw' && { draws: entry.draws + 1 }),
        timestamp: Date.now(),
      };
      setEntries(updated);
    } else {
      // Create new entry
      const newEntry: LeaderboardEntry = {
        id: Math.random().toString(36).substr(2, 9),
        playerName,
        wins: result === 'win' ? 1 : 0,
        losses: result === 'loss' ? 1 : 0,
        aiWins: result === 'loss' ? 1 : 0,
        draws: result === 'draw' ? 1 : 0,
        timestamp: Date.now(),
      };
      setEntries([...entries, newEntry]);
    }
  };

  const getTopEntries = (limit: number = 10) => {
    return [...entries]
      .sort((a, b) => {
        const aTotal = a.wins + a.losses + a.draws;
        const bTotal = b.wins + b.losses + b.draws;
        const aWinRate = aTotal > 0 ? a.wins / aTotal : 0;
        const bWinRate = bTotal > 0 ? b.wins / bTotal : 0;
        if (bWinRate !== aWinRate) return bWinRate - aWinRate;
        return b.wins - a.wins;
      })
      .slice(0, limit);
  };

  const clearLeaderboard = () => {
    setEntries([]);
  };

  return {
    entries,
    addEntry,
    getTopEntries,
    clearLeaderboard,
    isLoaded,
  };
}
