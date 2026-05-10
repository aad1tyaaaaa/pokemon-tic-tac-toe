'use client';

import { useState, useEffect } from 'react';
import {
  Board,
  createEmptyBoard,
  getGameStatus,
  getEmptyPositions,
} from '@/lib/gameLogic';
import { getBestMove } from '@/lib/minimax';
import { GameBoard } from './GameBoard';
import { CherubiSVG, MewIcon, BulbasaurIcon } from './PokemonPieces';

interface GameContainerProps {
  onGameEnd?: (status: string, stats: { playerWins: number; aiWins: number; draws: number }) => void;
  initialStats?: { playerWins: number; aiWins: number; draws: number };
}

export function GameContainer({
  onGameEnd,
  initialStats = { playerWins: 0, aiWins: 0, draws: 0 },
}: GameContainerProps) {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [status, setStatus] = useState<'playing' | 'player-won' | 'ai-won' | 'draw'>('playing');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [stats, setStats] = useState(initialStats);

  // AI move effect
  useEffect(() => {
    if (status === 'playing' && isAIThinking) {
      const timer = setTimeout(() => {
        const result = getBestMove(board, 4);
        if (result.bestMove) {
          const [row, col] = result.bestMove;
          const newBoard = board.map((r) => [...r]);
          newBoard[row][col] = 'ai';

          const gameStatus = getGameStatus(newBoard);
          setBoard(newBoard);
          setStatus(gameStatus);

          if (gameStatus !== 'playing') {
            const newStats = { ...stats };
            if (gameStatus === 'ai-won') {
              newStats.aiWins++;
            } else if (gameStatus === 'draw') {
              newStats.draws++;
            }
            setStats(newStats);
            onGameEnd?.(gameStatus, newStats);
          }
        }
        setIsAIThinking(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isAIThinking, status, board, stats, onGameEnd]);

  const handleCellClick = (row: number, col: number) => {
    if (status !== 'playing' || isAIThinking) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = 'player';

    const gameStatus = getGameStatus(newBoard);
    setBoard(newBoard);
    setStatus(gameStatus);

    if (gameStatus !== 'playing') {
      const newStats = { ...stats };
      if (gameStatus === 'player-won') {
        newStats.playerWins++;
      } else if (gameStatus === 'draw') {
        newStats.draws++;
      }
      setStats(newStats);
      onGameEnd?.(gameStatus, newStats);
      return;
    }

    // Trigger AI move
    setIsAIThinking(true);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setStatus('playing');
    setIsAIThinking(false);
  };

  const getStatusText = () => {
    if (isAIThinking) return "Bulbasaur is thinking...";
    if (status === 'player-won') return "You won! Mew prevails!";
    if (status === 'ai-won') return "Bulbasaur wins!";
    if (status === 'draw') return "It's a draw!";
    return "Your turn (Mew)";
  };

  const getStatusColor = () => {
    if (status === 'player-won') return 'text-yellow-600';
    if (status === 'ai-won') return 'text-orange-600';
    if (status === 'draw') return 'text-gray-600';
    return 'text-gray-700';
  };

  const getTacticSuggestion = () => {
    if (status !== 'ai-won') return null;
    return (
      <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-400 rounded-lg text-sm text-blue-800 animate-in fade-in slide-in-from-bottom-2">
        <p className="font-bold mb-1">💡 Bulbasaur's Winning Tactics:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Try to control the center of the 4x4 board early on.</li>
          <li>Block your opponent as soon as they get 2 pieces in a row.</li>
          <li>Look for "forks" where you can create two winning lines at once.</li>
          <li>In 4x4, the 1st player has a strong advantage if they take corners or center.</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Decorative top element */}
      <div className="flex items-center gap-3">
        <MewIcon size={40} />
        <h2 className="text-2xl font-bold text-center text-gray-800">
          MEW vs BULBASAUR
        </h2>
        <BulbasaurIcon size={40} />
      </div>

      {/* Game board */}
      <GameBoard
        board={board}
        onCellClick={handleCellClick}
        disabled={status !== 'playing' || isAIThinking}
      />

      {/* Status display */}
      <div className={`text-center text-lg font-bold ${getStatusColor()}`}>
        {getStatusText()}
      </div>

      {getTacticSuggestion()}

      {/* Win/Loss/Draw counts */}
      <div className="flex gap-4 text-sm font-semibold text-gray-700 bg-pink-50 p-3 rounded border-2 border-red-300">
        <div>🏆 You: {stats.playerWins}</div>
        <div>🍃 Bulbasaur: {stats.aiWins}</div>
        <div>🤝 Draws: {stats.draws}</div>
      </div>

      {/* New Game button */}
      <button
        onClick={resetGame}
        disabled={status === 'playing' && !isAIThinking}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold rounded border-2 border-red-700 transition-colors"
      >
        New Game
      </button>
    </div>
  );
}
