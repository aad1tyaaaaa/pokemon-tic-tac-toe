'use client';

import { Board, BOARD_SIZE } from '@/lib/gameLogic';
import { MewIcon, BulbasaurIcon } from './PokemonPieces';

interface GameBoardProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  disabled?: boolean;
}

export function GameBoard({ board, onCellClick, disabled = false }: GameBoardProps) {
  return (
    <div className="flex justify-center">
      <div
        className="grid gap-0 bg-red-600 p-1"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
          width: 'fit-content',
          border: '3px dashed #000',
        }}
      >
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <button
              key={`${rowIdx}-${colIdx}`}
              onClick={() => !disabled && cell === 'empty' && onCellClick(rowIdx, colIdx)}
              disabled={disabled || cell !== 'empty'}
              className="w-20 h-20 bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition-colors disabled:cursor-not-allowed border-2 border-red-600"
            >
              {cell === 'player' && <MewIcon size={50} />}
              {cell === 'ai' && <BulbasaurIcon size={50} />}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
