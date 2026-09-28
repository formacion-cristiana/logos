import React from "react";

export default function SopaGrid({ grid, size, foundCells, selCells, hintCells, onCellClick, onCellHover }) {
  const foundSet = new Set((foundCells || []).map((c) => `${c.r},${c.c}`));
  const selSet = new Set((selCells || []).map((c) => `${c.r},${c.c}`));
  const hintSet = new Set(hintCells || []);
  return (
    <div
      className="inline-grid gap-0.5"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
    >
      {grid.map((row, r) =>
        row.map((ch, c) => {
          const key = `${r},${c}`;
          const isFound = foundSet.has(key);
          const isSel = selSet.has(key);
          const isHint = hintSet.has(key);
          return (
            <button
              key={key}
              onClick={() => onCellClick(r, c)}
              onMouseEnter={() => onCellHover && onCellHover(r, c)}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded text-xs sm:text-sm font-bold uppercase flex items-center justify-center border transition"
              style={{
                background: isFound ? "#236b3b" : isSel ? "#eef2f8" : isHint ? "#fde68a" : "#fffdf8",
                color: isFound ? "#fff" : "#1d1d1b",
                borderColor: isSel ? "#4a6fa5" : isHint ? "#d9a441" : "#d9d2c5",
                outline: isHint && !isSel ? "2px solid #d9a441" : isSel ? "2px solid #4a6fa5" : undefined
              }}
            >
              {ch}
            </button>
          );
        })
      )}
    </div>
  );
}