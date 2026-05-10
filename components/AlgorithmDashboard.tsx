'use client';

import { useState } from 'react';
import { Board, createEmptyBoard } from '@/lib/gameLogic';
import { getBestMoveWithAnalysis } from '@/lib/minimax';

export function AlgorithmDashboard() {
  const [analysis, setAnalysis] = useState<ReturnType<typeof getBestMoveWithAnalysis> | null>(null);
  const [depth, setDepth] = useState(4);
  const [selectedBoard, setSelectedBoard] = useState<'empty' | 'game1' | 'game2'>('empty');

  const boardExamples: Record<string, Board> = {
    empty: createEmptyBoard(),
    game1: [
      ['player', 'empty', 'empty', 'empty'],
      ['empty', 'ai', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty'],
    ],
    game2: [
      ['player', 'ai', 'player', 'empty'],
      ['ai', 'player', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty'],
    ],
  };

  const handleAnalyze = () => {
    const board = boardExamples[selectedBoard];
    const result = getBestMoveWithAnalysis(board, depth);
    setAnalysis(result);
  };

  return (
    <div className="w-full bg-yellow-50 border-2 border-red-300 rounded p-4 overflow-hidden">
      <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
        MINIMAX ANALYZER
      </h3>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[280px]">
          {/* Controls */}
          <div className="space-y-3 mb-4 p-3 bg-white border-2 border-red-200 rounded">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Test Board:
              </label>
              <select
                value={selectedBoard}
                onChange={(e) =>
                  setSelectedBoard(e.target.value as 'empty' | 'game1' | 'game2')
                }
                className="w-full px-3 py-2 border-2 border-red-300 rounded text-sm"
              >
                <option value="empty">Empty Board</option>
                <option value="game1">Early Game</option>
                <option value="game2">Mid Game</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Depth: {depth}
              </label>
              <input
                type="range"
                min="2"
                max="7"
                value={depth}
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-600 mt-1">
                Higher depth = stronger AI (slower)
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition-colors"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {analysis && (
        <div className="space-y-3">
          {/* Best move */}
          {analysis.bestMove && (
            <div className="p-3 bg-green-100 border-2 border-green-400 rounded">
              <div className="font-bold text-green-800 text-sm mb-1">
                Best Move
              </div>
              <div className="text-lg font-bold text-green-900">
                Row {analysis.bestMove[0]}, Col {analysis.bestMove[1]}
              </div>
            </div>
          )}

          {/* Evaluation metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-purple-100 border-2 border-purple-300 rounded">
              <div className="text-xs font-bold text-purple-700">Score</div>
              <div className="text-lg font-bold text-purple-900">
                {analysis.score > 0 ? `+${analysis.score}` : analysis.score}
              </div>
            </div>
            <div className="p-2 bg-orange-100 border-2 border-orange-300 rounded">
              <div className="text-xs font-bold text-orange-700">Nodes</div>
              <div className="text-lg font-bold text-orange-900">
                {analysis.nodesEvaluated.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-100 border-2 border-blue-300 rounded">
            <div className="font-bold text-blue-900 text-sm mb-2">
              Top Moves Evaluated
            </div>
            <div className="space-y-1">
              {analysis.evaluatedMoves.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-xs bg-white px-2 py-1 rounded border border-blue-200"
                >
                  <span className="font-semibold">
                    [{m.move[0]}, {m.move[1]}]
                  </span>
                  <span className="text-blue-900 font-bold">
                    {m.score > 0 ? `+${m.score}` : m.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gray-100 border-2 border-gray-300 rounded text-xs text-gray-700">
            <div className="font-bold mb-1">About Minimax</div>
            <p className="leading-relaxed">
              The Minimax algorithm evaluates game positions by exploring possible
              future moves. It assigns scores: positive favors AI, negative favors
              player, zero means neutral. The algorithm explores up to {depth} moves
              ahead and uses heuristics for quick evaluation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
