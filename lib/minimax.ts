import {
  Board,
  Cell,
  checkWin,
  getEmptyPositions,
  isBoardFull,
  countThreats,
} from './gameLogic';

export interface MinimaxResult {
  score: number;
  bestMove: [number, number] | null;
  depth: number;
  nodesEvaluated: number;
}

export interface MinimaxAnalysis extends MinimaxResult {
  evaluatedMoves: Array<{
    move: [number, number];
    score: number;
  }>;
}

class MinimaxEvaluator {
  private nodesEvaluated = 0;
  private maxDepth: number;

  constructor(maxDepth: number) {
    this.maxDepth = maxDepth;
  }

  evaluate(board: Board): MinimaxResult {
    this.nodesEvaluated = 0;
    const emptyPositions = getEmptyPositions(board);

    if (emptyPositions.length === 0) {
      return {
        score: 0,
        bestMove: null,
        depth: 0,
        nodesEvaluated: 1,
      };
    }

    let bestScore = -Infinity;
    let bestMove: [number, number] | null = null;

    for (const move of emptyPositions) {
      const newBoard = board.map((row) => [...row]);
      newBoard[move[0]][move[1]] = 'ai';

      const score = this.minimax(newBoard, 0, false);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    return {
      score: bestScore,
      bestMove,
      depth: this.maxDepth,
      nodesEvaluated: this.nodesEvaluated,
    };
  }

  evaluateWithAnalysis(board: Board): MinimaxAnalysis {
    this.nodesEvaluated = 0;
    const emptyPositions = getEmptyPositions(board);
    const evaluatedMoves: Array<{ move: [number, number]; score: number }> = [];

    if (emptyPositions.length === 0) {
      return {
        score: 0,
        bestMove: null,
        depth: 0,
        nodesEvaluated: 1,
        evaluatedMoves: [],
      };
    }

    let bestScore = -Infinity;
    let bestMove: [number, number] | null = null;

    for (const move of emptyPositions) {
      const newBoard = board.map((row) => [...row]);
      newBoard[move[0]][move[1]] = 'ai';

      const score = this.minimax(newBoard, 0, false);
      evaluatedMoves.push({ move, score });

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }

    evaluatedMoves.sort((a, b) => b.score - a.score);

    return {
      score: bestScore,
      bestMove,
      depth: this.maxDepth,
      nodesEvaluated: this.nodesEvaluated,
      evaluatedMoves: evaluatedMoves.slice(0, 4),
    };
  }

  private minimax(
    board: Board,
    depth: number,
    isMaximizing: boolean
  ): number {
    this.nodesEvaluated++;

    // Terminal node checks
    if (checkWin(board, 'ai')) return 100 - depth; // AI wins
    if (checkWin(board, 'player')) return depth - 100; // Player wins
    if (isBoardFull(board)) return 0; // Draw

    // Depth limit reached - evaluate heuristically
    if (depth >= this.maxDepth) {
      return this.evaluatePosition(board);
    }

    const emptyPositions = getEmptyPositions(board);

    if (isMaximizing) {
      // AI is maximizing
      let maxScore = -Infinity;

      for (const [row, col] of emptyPositions) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = 'ai';
        const score = this.minimax(newBoard, depth + 1, false);
        maxScore = Math.max(maxScore, score);
      }

      return maxScore;
    } else {
      // Player is minimizing
      let minScore = Infinity;

      for (const [row, col] of emptyPositions) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = 'player';
        const score = this.minimax(newBoard, depth + 1, true);
        minScore = Math.min(minScore, score);
      }

      return minScore;
    }
  }

  private evaluatePosition(board: Board): number {
    const aiThreats = countThreats(board, 'ai');
    const playerThreats = countThreats(board, 'player');

    // Weight: AI's threats are good, player's threats are bad
    return aiThreats * 10 - playerThreats * 10;
  }
}

export function getBestMove(
  board: Board,
  maxDepth: number = 5
): MinimaxResult {
  const evaluator = new MinimaxEvaluator(maxDepth);
  return evaluator.evaluate(board);
}

export function getBestMoveWithAnalysis(
  board: Board,
  maxDepth: number = 5
): MinimaxAnalysis {
  const evaluator = new MinimaxEvaluator(maxDepth);
  return evaluator.evaluateWithAnalysis(board);
}
