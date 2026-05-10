'use client';

import { useState, useEffect } from 'react';
import { GameContainer } from '@/components/GameContainer';
import { Leaderboard } from '@/components/Leaderboard';
import { AlgorithmDashboard } from '@/components/AlgorithmDashboard';
import { useLeaderboard } from '@/hooks/useLeaderboard';

export default function Home() {
  const [stats, setStats] = useState({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
  });
  const [mounted, setMounted] = useState(false);
  const { addEntry } = useLeaderboard();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGameEnd = (
    status: string,
    newStats: { playerWins: number; aiWins: number; draws: number }
  ) => {
    setStats(newStats);
    // Record the game result
    if (status === 'player-won') {
      addEntry('Player', 'win');
    } else if (status === 'ai-won') {
      addEntry('Bulbasaur', 'win');
    } else if (status === 'draw') {
      addEntry('Player', 'draw');
    }
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen bg-pink-300 p-4 overflow-x-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,.05) 2px, rgba(255,255,255,.05) 4px)',
      }}
    >
      {/* Overlaid text - decorative background element */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden sm:block"
        style={{
          zIndex: 0,
        }}
      >
        <div className="absolute top-20 left-10 text-4xl md:text-6xl font-black text-pink-200 opacity-20 select-none" style={{ fontFamily: '"Press Start 2P", cursive' }}>
          BULBASAUR
        </div>
        <div className="absolute bottom-32 right-12 text-4xl md:text-6xl font-black text-pink-200 opacity-20 select-none" style={{ fontFamily: '"Press Start 2P", cursive' }}>
          MEW
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="retro-title-lg text-yellow-500 mb-2 drop-shadow-lg">
            POKEMON
          </h1>
          <h2 className="retro-title-md text-red-600 mb-4 drop-shadow-lg leading-tight">
            4x4 TIC-TAC-TOE
          </h2>
          <p className="text-sm sm:text-lg font-bold text-gray-800 bg-yellow-200 inline-block px-4 py-2 rounded border-2 border-red-600">
            Challenge the Minimax AI!
          </p>
        </div>

        {/* Main game area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Game section */}
          <div className="lg:col-span-2 bg-pink-100 border-4 border-red-600 rounded p-6 shadow-lg">
            <div className="flex justify-center">
              <GameContainer
                initialStats={stats}
                onGameEnd={handleGameEnd}
              />
            </div>
          </div>

          {/* Right sidebar - Leaderboard */}
          <div className="bg-pink-100 border-4 border-red-600 rounded p-4 shadow-lg h-fit">
            <Leaderboard currentStats={stats} />
          </div>
        </div>

        {/* Bottom section - Algorithm Dashboard */}
        <div className="bg-pink-100 border-4 border-red-600 rounded p-6 shadow-lg mb-8 flex justify-center">
          <AlgorithmDashboard />
        </div>

        {/* Advanced AI Explanation Section */}
        <div className="bg-yellow-100 border-4 border-red-400 rounded-xl p-4 sm:p-8 mb-8 shadow-[8px_8px_0px_rgba(220,38,38,1)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-3xl font-black text-red-600 mb-6 text-center underline decoration-wavy" style={{ fontFamily: '"Press Start 2P", cursive' }}>
              HOW BULBASAUR THINKS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="space-y-4">
                <div className="bg-white p-4 border-2 border-red-200 rounded-lg transform -rotate-1 shadow-md">
                  <h3 className="font-bold text-lg text-blue-700 mb-2">The Minimax Logic</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Bulbasaur uses the <strong>Minimax Algorithm</strong>. It views the game as a tree of possibilities. 
                    It wants to <strong>maximize</strong> its own score while assuming you will try to 
                    <strong>minimize</strong> it by playing your best possible move.
                  </p>
                </div>
                
                <div className="bg-white p-4 border-2 border-red-200 rounded-lg transform rotate-1 shadow-md">
                  <h3 className="font-bold text-lg text-green-700 mb-2">Recursive Search</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Every time you click, Bulbasaur looks <strong>4 moves ahead</strong>. It simulates 
                    thousands of game states in milliseconds to find the path that leads to a certain win or a draw.
                  </p>
                </div>
              </div>

              {/* Animated Minimax Visualization */}
              <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl border-4 border-yellow-400 shadow-inner min-h-[300px]">
                <div className="relative w-full h-48 flex justify-center items-center">
                  {/* Visualizing a Tree Node Structure with SVG */}
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    {/* Root */}
                    <circle cx="100" cy="20" r="12" fill="#ef4444" className="animate-pulse">
                      <title>Bulbasaur's Turn (Max)</title>
                    </circle>
                    <text x="100" y="24" fontSize="8" textAnchor="middle" fill="white" className="font-bold pointer-events-none">MAX</text>
                    
                    {/* Connections */}
                    <line x1="100" y1="32" x2="60" y2="60" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="100" y1="32" x2="140" y2="60" stroke="#94a3b8" strokeWidth="2" />
                    
                    {/* Level 1 Nodes */}
                    <circle cx="60" cy="70" r="10" fill="#3b82f6">
                      <title>Your Turn (Min)</title>
                    </circle>
                    <text x="60" y="73" fontSize="6" textAnchor="middle" fill="white" className="font-bold pointer-events-none">MIN</text>
                    
                    <circle cx="140" cy="70" r="10" fill="#3b82f6"></circle>
                    <text x="140" y="73" fontSize="6" textAnchor="middle" fill="white" className="font-bold pointer-events-none">MIN</text>
                    
                    {/* More connections */}
                    <line x1="60" y1="80" x2="40" y2="100" stroke="#cbd5e1" strokeWidth="1" />
                    <line x1="60" y1="80" x2="80" y2="100" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* Level 2 Leaves */}
                    <circle cx="40" cy="110" r="6" fill="#10b981"></circle>
                    <circle cx="80" cy="110" r="6" fill="#f59e0b"></circle>
                    <circle cx="125" cy="110" r="6" fill="#10b981"></circle>
                    <circle cx="155" cy="110" r="6" fill="#ef4444"></circle>
                  </svg>
                  
                  {/* Explanatory overlay for the SVG */}
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-bounce mt-2 mr-2">
                    Level: 4
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Decision Tree Visualization</span>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-[10px] font-bold text-gray-600">AI Advantage</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-[10px] font-bold text-gray-600">Player Turn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-dashed border-red-300 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">🔍</div>
                <p className="text-xs font-bold text-gray-600 uppercase">Exploration</p>
                <p className="text-[10px] text-gray-500">Searches every possible cell combination</p>
              </div>
              <div>
                <div className="text-2xl mb-1">⚖️</div>
                <p className="text-xs font-bold text-gray-600 uppercase">Heuristics</p>
                <p className="text-[10px] text-gray-500">Scores positions based on threat counts</p>
              </div>
              <div>
                <div className="text-2xl mb-1">⚡</div>
                <p className="text-xs font-bold text-gray-600 uppercase">Optimization</p>
                <p className="text-[10px] text-gray-500">Alpha-Beta pruning logic applies depth limits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
