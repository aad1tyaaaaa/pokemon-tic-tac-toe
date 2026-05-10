export type Cell = 'empty' | 'player' | 'ai';
export type Board = Cell[][];

export const BOARD_SIZE = 4;
export const WIN_LENGTH = 3;

export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill('empty'));
}

export function getEmptyPositions(board: Board): [number, number][] {
  const positions: [number, number][] = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 'empty') {
        positions.push([row, col]);
      }
    }
  }
  return positions;
}

export function checkWin(board: Board, player: Cell): boolean {
  // Check rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col <= BOARD_SIZE - WIN_LENGTH; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player
      ) {
        return true;
      }
    }
  }

  // Check columns
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row <= BOARD_SIZE - WIN_LENGTH; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row <= BOARD_SIZE - WIN_LENGTH; row++) {
    for (let col = 0; col <= BOARD_SIZE - WIN_LENGTH; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player
      ) {
        return true;
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row <= BOARD_SIZE - WIN_LENGTH; row++) {
    for (let col = WIN_LENGTH - 1; col < BOARD_SIZE; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col - 1] === player &&
        board[row + 2][col - 2] === player
      ) {
        return true;
      }
    }
  }

  return false;
}

export function isBoardFull(board: Board): boolean {
  return getEmptyPositions(board).length === 0;
}

export function getGameStatus(board: Board): 'playing' | 'player-won' | 'ai-won' | 'draw' {
  if (checkWin(board, 'player')) return 'player-won';
  if (checkWin(board, 'ai')) return 'ai-won';
  if (isBoardFull(board)) return 'draw';
  return 'playing';
}

export function countThreats(board: Board, player: Cell): number {
  let count = 0;

  // Check all possible winning lines
  // Rows
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col <= BOARD_SIZE - WIN_LENGTH; col++) {
      let playerCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < WIN_LENGTH; i++) {
        if (board[row][col + i] === player) playerCount++;
        if (board[row][col + i] === 'empty') emptyCount++;
      }
      if (playerCount === WIN_LENGTH - 1 && emptyCount === 1) count++;
    }
  }

  // Columns
  for (let col = 0; col < BOARD_SIZE; col++) {
    for (let row = 0; row <= BOARD_SIZE - WIN_LENGTH; row++) {
      let playerCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < WIN_LENGTH; i++) {
        if (board[row + i][col] === player) playerCount++;
        if (board[row + i][col] === 'empty') emptyCount++;
      }
      if (playerCount === WIN_LENGTH - 1 && emptyCount === 1) count++;
    }
  }

  // Diagonals (top-left to bottom-right)
  for (let row = 0; row <= BOARD_SIZE - WIN_LENGTH; row++) {
    for (let col = 0; col <= BOARD_SIZE - WIN_LENGTH; col++) {
      let playerCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < WIN_LENGTH; i++) {
        if (board[row + i][col + i] === player) playerCount++;
        if (board[row + i][col + i] === 'empty') emptyCount++;
      }
      if (playerCount === WIN_LENGTH - 1 && emptyCount === 1) count++;
    }
  }

  // Diagonals (top-right to bottom-left)
  for (let row = 0; row <= BOARD_SIZE - WIN_LENGTH; row++) {
    for (let col = WIN_LENGTH - 1; col < BOARD_SIZE; col++) {
      let playerCount = 0;
      let emptyCount = 0;
      for (let i = 0; i < WIN_LENGTH; i++) {
        if (board[row + i][col - i] === player) playerCount++;
        if (board[row + i][col - i] === 'empty') emptyCount++;
      }
      if (playerCount === WIN_LENGTH - 1 && emptyCount === 1) count++;
    }
  }

  return count;
}
