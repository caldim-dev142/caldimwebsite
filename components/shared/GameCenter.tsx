"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, RotateCcw, Award, ShieldAlert, Gamepad2 } from "lucide-react";

// --- Types & Constants for CHESS ---
type PieceType = "p" | "r" | "n" | "b" | "q" | "k";
type PieceColor = "w" | "b";

interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean;
}

type ChessBoard = (Piece | null)[][];

const initialChessBoard = (): ChessBoard => {
  const backRow = (color: PieceColor): (Piece | null)[] => [
    { type: "r", color },
    { type: "n", color },
    { type: "b", color },
    { type: "q", color },
    { type: "k", color },
    { type: "b", color },
    { type: "n", color },
    { type: "r", color },
  ];
  const pawnRow = (color: PieceColor): (Piece | null)[] =>
    Array(8).fill(null).map(() => ({ type: "p", color }));

  return [
    backRow("b"),
    pawnRow("b"),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    pawnRow("w"),
    backRow("w"),
  ];
};

const chessPieceSymbols: Record<PieceColor, Record<PieceType, string>> = {
  w: { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" },
  b: { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" },
};

// --- Programmatic Sudoku Generator Functions ---
function isValidSudokuPlace(grid: number[][], r: number, c: number, val: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[r][i] === val) return false;
    if (grid[i][c] === val) return false;
    const boxR = Math.floor(r / 3) * 3 + Math.floor(i / 3);
    const boxC = Math.floor(c / 3) * 3 + (i % 3);
    if (grid[boxR][boxC] === val) return false;
  }
  return true;
}

function fillSudokuGrid(grid: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (const val of nums) {
          if (isValidSudokuPlace(grid, r, c, val)) {
            grid[r][c] = val;
            if (fillSudokuGrid(grid)) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSudoku(): { puzzle: number[][]; solution: number[][] } {
  const solution = Array(9).fill(null).map(() => Array(9).fill(0));
  fillSudokuGrid(solution);

  const puzzle = solution.map(row => [...row]);

  let cellsToRemove = 48;
  while (cellsToRemove > 0) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      cellsToRemove--;
    }
  }

  return { puzzle, solution };
}

interface GameCenterProps {
  onClose: () => void;
}

export const GameCenter: React.FC<GameCenterProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"chess" | "sudoku">("chess");

  // --- CHESS STATE & LOGIC ---
  const [chessBoard, setChessBoard] = useState<ChessBoard>(initialChessBoard());
  const [chessTurn, setChessTurn] = useState<PieceColor>("w");
  const [chessSelected, setChessSelected] = useState<[number, number] | null>(null);
  const [chessValidMoves, setChessValidMoves] = useState<[number, number][]>([]);
  const [chessStatus, setChessStatus] = useState<string>("Your turn. Play as White.");
  const [chessWinner, setChessWinner] = useState<PieceColor | "draw" | null>(null);
  const [chessCpuThinking, setChessCpuThinking] = useState(false);

  const isChessInside = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8;

  // 1. Raw geometric moves
  const getRawChessMoves = useCallback((r: number, c: number, currentBoard: ChessBoard): [number, number][] => {
    const piece = currentBoard[r][c];
    if (!piece) return [];

    const moves: [number, number][] = [];
    const color = piece.color;
    const oppColor: PieceColor = color === "w" ? "b" : "w";

    switch (piece.type) {
      case "p": {
        const dir = color === "w" ? -1 : 1;
        if (isChessInside(r + dir, c) && !currentBoard[r + dir][c]) {
          moves.push([r + dir, c]);
          const startRow = color === "w" ? 6 : 1;
          if (r === startRow && !currentBoard[r + 2 * dir][c]) {
            moves.push([r + 2 * dir, c]);
          }
        }
        const captureOffsets = [-1, 1];
        for (const offset of captureOffsets) {
          const nextR = r + dir;
          const nextC = c + offset;
          if (isChessInside(nextR, nextC)) {
            const destPiece = currentBoard[nextR][nextC];
            if (destPiece && destPiece.color === oppColor) {
              moves.push([nextR, nextC]);
            }
          }
        }
        break;
      }
      case "r": {
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (const [dr, dc] of dirs) {
          let nextR = r + dr;
          let nextC = c + dc;
          while (isChessInside(nextR, nextC)) {
            const destPiece = currentBoard[nextR][nextC];
            if (!destPiece) {
              moves.push([nextR, nextC]);
            } else {
              if (destPiece.color === oppColor) moves.push([nextR, nextC]);
              break;
            }
            nextR += dr;
            nextC += dc;
          }
        }
        break;
      }
      case "b": {
        const dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        for (const [dr, dc] of dirs) {
          let nextR = r + dr;
          let nextC = c + dc;
          while (isChessInside(nextR, nextC)) {
            const destPiece = currentBoard[nextR][nextC];
            if (!destPiece) {
              moves.push([nextR, nextC]);
            } else {
              if (destPiece.color === oppColor) moves.push([nextR, nextC]);
              break;
            }
            nextR += dr;
            nextC += dc;
          }
        }
        break;
      }
      case "n": {
        const offsets = [
          [2, 1], [2, -1], [-2, 1], [-2, -1],
          [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
        for (const [dr, dc] of offsets) {
          const nextR = r + dr;
          const nextC = c + dc;
          if (isChessInside(nextR, nextC)) {
            const destPiece = currentBoard[nextR][nextC];
            if (!destPiece || destPiece.color === oppColor) {
              moves.push([nextR, nextC]);
            }
          }
        }
        break;
      }
      case "q": {
        const dirs = [
          [1, 0], [-1, 0], [0, 1], [0, -1],
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        for (const [dr, dc] of dirs) {
          let nextR = r + dr;
          let nextC = c + dc;
          while (isChessInside(nextR, nextC)) {
            const destPiece = currentBoard[nextR][nextC];
            if (!destPiece) {
              moves.push([nextR, nextC]);
            } else {
              if (destPiece.color === oppColor) moves.push([nextR, nextC]);
              break;
            }
            nextR += dr;
            nextC += dc;
          }
        }
        break;
      }
      case "k": {
        const dirs = [
          [1, 0], [-1, 0], [0, 1], [0, -1],
          [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        for (const [dr, dc] of dirs) {
          const nextR = r + dr;
          const nextC = c + dc;
          if (isChessInside(nextR, nextC)) {
            const destPiece = currentBoard[nextR][nextC];
            if (!destPiece || destPiece.color === oppColor) {
              moves.push([nextR, nextC]);
            }
          }
        }
        break;
      }
    }
    return moves;
  }, []);

  // 2. Check detector
  const isKingInCheck = useCallback((color: PieceColor, board: ChessBoard): boolean => {
    let kingR = -1;
    let kingC = -1;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.type === "k" && p.color === color) {
          kingR = r;
          kingC = c;
          break;
        }
      }
      if (kingR !== -1) break;
    }

    if (kingR === -1) return false;

    const oppColor: PieceColor = color === "w" ? "b" : "w";
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p && p.color === oppColor) {
          const rawMoves = getRawChessMoves(r, c, board);
          if (rawMoves.some(([tr, tc]) => tr === kingR && tc === kingC)) {
            return true;
          }
        }
      }
    }
    return false;
  }, [getRawChessMoves]);

  // 3. Legal moves (raw moves filtered by checking if they keep own King safe)
  const getChessMoves = useCallback((r: number, c: number, currentBoard: ChessBoard): [number, number][] => {
    const piece = currentBoard[r][c];
    if (!piece) return [];
    const rawMoves = getRawChessMoves(r, c, currentBoard);

    return rawMoves.filter(([tr, tc]) => {
      const tempBoard = currentBoard.map(row => [...row]);
      tempBoard[tr][tc] = tempBoard[r][c];
      tempBoard[r][c] = null;
      return !isKingInCheck(piece.color, tempBoard);
    });
  }, [getRawChessMoves, isKingInCheck]);

  // 4. Verify if any legal moves exist
  const hasLegalMoves = useCallback((color: PieceColor, currentBoard: ChessBoard): boolean => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = currentBoard[r][c];
        if (p && p.color === color) {
          const moves = getChessMoves(r, c, currentBoard);
          if (moves.length > 0) return true;
        }
      }
    }
    return false;
  }, [getChessMoves]);

  const executeChessMove = useCallback((fromR: number, fromC: number, toR: number, toC: number) => {
    setChessBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      const p = newBoard[fromR][fromC];
      if (p && p.type === "p" && (toR === 0 || toR === 7)) {
        newBoard[toR][toC] = { type: "q", color: p.color, hasMoved: true };
      } else {
        newBoard[toR][toC] = p ? { ...p, hasMoved: true } : null;
      }
      newBoard[fromR][fromC] = null;

      const nextColor = chessTurn === "w" ? "b" : "w";
      const oppColor: PieceColor = nextColor === "w" ? "b" : "w";

      const inCheck = isKingInCheck(nextColor, newBoard);
      const hasMoves = hasLegalMoves(nextColor, newBoard);

      if (!hasMoves) {
        if (inCheck) {
          setChessWinner(oppColor);
          setChessStatus(oppColor === "w" ? "Checkmate! You win!" : "Checkmate! CPU wins.");
        } else {
          setChessWinner("draw");
          setChessStatus("Stalemate! Game is a draw.");
        }
      } else {
        setChessTurn(nextColor);
        if (inCheck) {
          setChessStatus(nextColor === "w" ? "Check! Save your King." : "Check! CPU's King is checked.");
        } else {
          setChessStatus(nextColor === "w" ? "Your turn. Make a move." : "CPU is playing...");
        }
      }

      return newBoard;
    });
    setChessSelected(null);
    setChessValidMoves([]);
  }, [chessTurn, isKingInCheck, hasLegalMoves]);

  const handleChessSquareClick = (r: number, c: number) => {
    if (chessTurn !== "w" || chessWinner || chessCpuThinking) return;

    const piece = chessBoard[r][c];
    const isVal = chessValidMoves.some(([vr, vc]) => vr === r && vc === c);
    if (chessSelected && isVal) {
      executeChessMove(chessSelected[0], chessSelected[1], r, c);
      return;
    }

    if (piece && piece.color === "w") {
      setChessSelected([r, c]);
      setChessValidMoves(getChessMoves(r, c, chessBoard));
    } else {
      setChessSelected(null);
      setChessValidMoves([]);
    }
  };

  const getPieceValue = (type: PieceType): number => {
    const values: Record<PieceType, number> = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 9000 };
    return values[type];
  };

  const evaluateBoard = useCallback((board: ChessBoard): number => {
    let score = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = board[r][c];
        if (p) {
          const val = getPieceValue(p.type);
          if (p.color === "b") {
            score += val;
            if (r >= 3 && r <= 4 && c >= 3 && c <= 4) score += 2;
            if (p.type === "p") score += r;
          } else {
            score -= val;
            if (r >= 3 && r <= 4 && c >= 3 && c <= 4) score -= 2;
            if (p.type === "p") score -= (7 - r);
          }
        }
      }
    }
    return score;
  }, []);

  const makeChessCpuMove = useCallback(() => {
    setChessCpuThinking(true);
    const cpuMoves: { from: [number, number]; to: [number, number]; score: number }[] = [];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = chessBoard[r][c];
        if (piece && piece.color === "b") {
          const moves = getChessMoves(r, c, chessBoard);
          for (const [tr, tc] of moves) {
            const tempBoard = chessBoard.map(row => [...row]);
            const target = tempBoard[tr][tc];
            tempBoard[tr][tc] = { ...piece, hasMoved: true };
            tempBoard[r][c] = null;

            let cpuMoveScore = evaluateBoard(tempBoard);

            if (target && target.type === "k" && target.color === "w") {
              cpuMoveScore += 100000;
            }

            let bestPlayerResponseScore = -Infinity;
            let hasPlayerMoves = false;

            for (let pr = 0; pr < 8; pr++) {
              for (let pc = 0; pc < 8; pc++) {
                const playerPiece = tempBoard[pr][pc];
                if (playerPiece && playerPiece.color === "w") {
                  const playerMoves = getChessMoves(pr, pc, tempBoard);
                  for (const [ptr, ptc] of playerMoves) {
                    hasPlayerMoves = true;
                    const postPlayerBoard = tempBoard.map(row => [...row]);
                    postPlayerBoard[ptr][ptc] = { ...playerPiece, hasMoved: true };
                    postPlayerBoard[pr][pc] = null;

                    const playerResponseScore = -evaluateBoard(postPlayerBoard);
                    if (playerResponseScore > bestPlayerResponseScore) {
                      bestPlayerResponseScore = playerResponseScore;
                    }
                  }
                }
              }
            }

            let netScore = cpuMoveScore;
            if (hasPlayerMoves) {
              netScore -= bestPlayerResponseScore;
            }

            netScore += Math.random() * 2;

            cpuMoves.push({ from: [r, c], to: [tr, tc], score: netScore });
          }
        }
      }
    }

    if (cpuMoves.length === 0) {
      setChessWinner("w");
      setChessStatus("Victory! CPU has no moves.");
      setChessCpuThinking(false);
      return;
    }

    cpuMoves.sort((a, b) => b.score - a.score);
    const best = cpuMoves[0];
    executeChessMove(best.from[0], best.from[1], best.to[0], best.to[1]);
    setChessCpuThinking(false);
  }, [chessBoard, getChessMoves, executeChessMove, evaluateBoard]);

  useEffect(() => {
    if (activeTab === "chess" && chessTurn === "b" && !chessWinner) {
      const timer = setTimeout(makeChessCpuMove, 700);
      return () => clearTimeout(timer);
    }
  }, [chessTurn, chessWinner, activeTab, makeChessCpuMove]);

  const resetChess = () => {
    setChessBoard(initialChessBoard());
    setChessTurn("w");
    setChessSelected(null);
    setChessValidMoves([]);
    setChessStatus("Your turn. Play as White.");
    setChessWinner(null);
  };

  // --- SUDOKU STATE & LOGIC ---
  const [sudokuPuzzleState, setSudokuPuzzleState] = useState<number[][]>([]);
  const [sudokuSolutionState, setSudokuSolutionState] = useState<number[][]>([]);
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>([]);
  const [sudokuSelected, setSudokuSelected] = useState<[number, number] | null>(null);
  const [sudokuConflicts, setSudokuConflicts] = useState<Set<string>>(new Set());
  const [sudokuStatus, setSudokuStatus] = useState<string>("Fill the grid. Avoid duplicates.");
  const [sudokuWinner, setSudokuWinner] = useState(false);

  const startNewSudokuGame = useCallback(() => {
    const { puzzle, solution } = generateSudoku();
    setSudokuPuzzleState(puzzle);
    setSudokuSolutionState(solution);
    setSudokuBoard(puzzle.map(row => [...row]));
    setSudokuSelected(null);
    setSudokuConflicts(new Set());
    setSudokuStatus("Fill the grid. Avoid duplicates.");
    setSudokuWinner(false);
  }, []);

  useEffect(() => {
    startNewSudokuGame();
  }, [startNewSudokuGame]);

  const checkSudokuConflicts = (grid: number[][]) => {
    const conflictCells = new Set<string>();
    
    for (let r = 0; r < 9; r++) {
      const seen = new Map<number, number[]>();
      for (let c = 0; c < 9; c++) {
        const val = grid[r][c];
        if (val !== 0) {
          if (!seen.has(val)) seen.set(val, []);
          seen.get(val)!.push(c);
        }
      }
      for (const cols of Array.from(seen.values())) {
        if (cols.length > 1) {
          cols.forEach((c: number) => conflictCells.add(`${r}-${c}`));
        }
      }
    }

    for (let c = 0; c < 9; c++) {
      const seen = new Map<number, number[]>();
      for (let r = 0; r < 9; r++) {
        const val = grid[r][c];
        if (val !== 0) {
          if (!seen.has(val)) seen.set(val, []);
          seen.get(val)!.push(r);
        }
      }
      for (const rows of Array.from(seen.values())) {
        if (rows.length > 1) {
          rows.forEach((r: number) => conflictCells.add(`${r}-${c}`));
        }
      }
    }

    for (let blockR = 0; blockR < 3; blockR++) {
      for (let blockC = 0; blockC < 3; blockC++) {
        const seen = new Map<number, [number, number][]>();
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const currR = blockR * 3 + r;
            const currC = blockC * 3 + c;
            const val = grid[currR][currC];
            if (val !== 0) {
              if (!seen.has(val)) seen.set(val, []);
              seen.get(val)!.push([currR, currC]);
            }
          }
        }
        for (const coords of Array.from(seen.values())) {
          if (coords.length > 1) {
            coords.forEach(([ar, ac]: [number, number]) => conflictCells.add(`${ar}-${ac}`));
          }
        }
      }
    }
    return conflictCells;
  };

  const handleSudokuCellClick = (r: number, c: number) => {
    if (sudokuWinner) return;
    if (sudokuPuzzleState[r] && sudokuPuzzleState[r][c] !== 0) return;
    setSudokuSelected([r, c]);
  };

  const setSudokuVal = useCallback((r: number, c: number, val: number) => {
    if ((sudokuPuzzleState[r] && sudokuPuzzleState[r][c] !== 0) || sudokuWinner) return;

    setSudokuBoard((prev) => {
      const newGrid = prev.map(row => [...row]);
      newGrid[r][c] = val;

      const newConflicts = checkSudokuConflicts(newGrid);
      setSudokuConflicts(newConflicts);

      let full = true;
      let matches = true;
      for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
        for (let colIdx = 0; colIdx < 9; colIdx++) {
          if (newGrid[rowIdx][colIdx] === 0) full = false;
          if (sudokuSolutionState[rowIdx] && newGrid[rowIdx][colIdx] !== sudokuSolutionState[rowIdx][colIdx]) {
            matches = false;
          }
        }
      }

      if (full && matches && newConflicts.size === 0) {
        setSudokuWinner(true);
        setSudokuStatus("Victory! Puzzle completed.");
      } else if (newConflicts.size > 0) {
        setSudokuStatus("Conflict detected! Double check entries.");
      } else {
        setSudokuStatus("Keep going! Fill all cells correctly.");
      }

      return newGrid;
    });
  }, [sudokuWinner, sudokuPuzzleState, sudokuSolutionState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "sudoku" || !sudokuSelected) return;
      const [r, c] = sudokuSelected;
      if (e.key >= "1" && e.key <= "9") {
        setSudokuVal(r, c, parseInt(e.key));
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        setSudokuVal(r, c, 0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, sudokuSelected, setSudokuVal]);

  const resetSudoku = () => {
    startNewSudokuGame();
  };

  const isKingChecked = (r: number, c: number): boolean => {
    const piece = chessBoard[r][c];
    if (piece && piece.type === "k") {
      return isKingInCheck(piece.color, chessBoard);
    }
    return false;
  };

  return (
    <div className="absolute bottom-[75px] right-0 w-[290px] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 font-sans text-slate-200 select-none animate-in fade-in slide-in-from-bottom-5 duration-200">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Gamepad2 size={16} className="text-cyan-400 shrink-0" />
          <span className="text-xs font-bold tracking-tight text-white">CALDIM Arcade</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 hover:bg-slate-800/80 rounded transition-colors"
          aria-label="Close Arcade"
        >
          <X size={15} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab("chess")}
          className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
            activeTab === "chess"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          ♔ Chess (Mid AI)
        </button>
        <button
          onClick={() => setActiveTab("sudoku")}
          className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
            activeTab === "sudoku"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          🔢 Sudoku (Mid)
        </button>
      </div>

      {activeTab === "chess" ? (
        <div className="flex flex-col gap-3">
          <div className="relative border border-slate-800 rounded-lg overflow-hidden bg-slate-950 p-1">
            <div className="grid grid-cols-8 gap-0">
              {chessBoard.map((row, rIdx) =>
                row.map((piece, cIdx) => {
                  const isDark = (rIdx + cIdx) % 2 === 1;
                  const isSelected = chessSelected && chessSelected[0] === rIdx && chessSelected[1] === cIdx;
                  const isValid = chessValidMoves.some(([vr, vc]) => vr === rIdx && vc === cIdx);
                  const isCapture = isValid && chessBoard[rIdx][cIdx] !== null;
                  const isChecked = isKingChecked(rIdx, cIdx);

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleChessSquareClick(rIdx, cIdx)}
                      className={`aspect-square flex items-center justify-center relative cursor-pointer ${
                        isDark ? "bg-slate-800/90" : "bg-slate-300"
                      } ${isSelected ? "ring-2 ring-amber-400 ring-inset" : ""} ${
                        isChecked ? "bg-red-500/50 border-2 border-red-500/80 animate-pulse" : ""
                      }`}
                    >
                      {piece && (
                        <span
                          className={`text-2xl font-semibold select-none ${
                            piece.color === "w"
                              ? "text-slate-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.85)]"
                              : "text-slate-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
                          }`}
                        >
                          {chessPieceSymbols[piece.color][piece.type]}
                        </span>
                      )}
                      {isValid && !isCapture && (
                        <div className="w-2 h-2 rounded-full bg-emerald-400/85 shadow-sm" />
                      )}
                      {isValid && isCapture && (
                        <div className="absolute inset-0 border-2 border-red-500/80 bg-red-500/10" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[10px]">
              <span className={`font-semibold tracking-wide flex items-center gap-1.5 ${
                chessWinner ? "text-amber-400 font-bold" : chessTurn === "w" ? "text-cyan-400" : "text-slate-400"
              }`}>
                {chessWinner ? (
                  <Award size={12} className="shrink-0" />
                ) : chessTurn === "w" ? (
                  <ShieldAlert size={12} className="shrink-0 animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping" />
                )}
                {chessStatus}
              </span>
              <button
                onClick={resetChess}
                className="flex items-center gap-1 text-[9px] font-bold uppercase text-slate-400 hover:text-white hover:bg-slate-800/80 px-2 py-1 rounded transition-all"
              >
                <RotateCcw size={10} />
                Reset
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950 p-1">
            <div className="grid grid-cols-9 gap-0">
              {sudokuBoard.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const isPreset = sudokuPuzzleState[rIdx] && sudokuPuzzleState[rIdx][cIdx] !== 0;
                  const isSelected = sudokuSelected && sudokuSelected[0] === rIdx && sudokuSelected[1] === cIdx;
                  const hasConflict = sudokuConflicts.has(`${rIdx}-${cIdx}`);
                  
                  const borderR = cIdx % 3 === 2 && cIdx !== 8 ? "border-r border-r-slate-500" : "border-r border-r-slate-800/40";
                  const borderB = rIdx % 3 === 2 && rIdx !== 8 ? "border-b border-b-slate-500" : "border-b border-b-slate-800/40";

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleSudokuCellClick(rIdx, cIdx)}
                      className={`aspect-square flex items-center justify-center relative text-sm font-semibold select-none cursor-pointer transition-all ${borderR} ${borderB} ${
                        isSelected
                          ? "bg-amber-400/20"
                          : isPreset
                          ? "bg-slate-800/40 text-slate-400"
                          : "bg-slate-900 text-cyan-400 hover:bg-slate-800/50"
                      } ${hasConflict ? "bg-red-500/25 text-red-400" : ""}`}
                    >
                      {val !== 0 ? val : ""}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => {
                  if (sudokuSelected) {
                    setSudokuVal(sudokuSelected[0], sudokuSelected[1], num);
                  }
                }}
                disabled={!sudokuSelected || sudokuWinner}
                className="py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => {
                if (sudokuSelected) {
                  setSudokuVal(sudokuSelected[0], sudokuSelected[1], 0);
                }
              }}
              disabled={!sudokuSelected || sudokuWinner}
              className="py-1 bg-slate-950 hover:bg-slate-900 text-red-400 rounded text-[9px] font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-[10px]">
              <span className={`font-semibold tracking-wide flex items-center gap-1.5 ${
                sudokuWinner ? "text-amber-400 font-bold" : sudokuConflicts.size > 0 ? "text-red-400" : "text-cyan-400"
              }`}>
                {sudokuWinner ? (
                  <Award size={12} className="shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
                {sudokuStatus}
              </span>
              <button
                onClick={resetSudoku}
                className="flex items-center gap-1 text-[9px] font-bold uppercase text-slate-400 hover:text-white hover:bg-slate-800/80 px-2 py-1 rounded transition-all"
              >
                <RotateCcw size={10} />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCenter;
