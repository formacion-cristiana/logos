import React from "react";

export default function CrosswordGrid({ grid, numberMap, input, status, wordCells, selected, onCellClick }) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const wordSet = new Set([...(wordCells || [])].map((c) => `${c.r},${c.c}`));
  return (
    <div className="inline-block overflow-x-auto">
      <div className="inline-grid gap-px bg-[#d9d2c5]" style={{ gridTemplateColumns: `repeat(${cols}, 28px)` }}>
        {grid.map((row, r) =>
          row.map((cell, c) => {
            if (cell === null) return <div key={`${r}-${c}`} className="w-7 h-7 bg-[#e8e8e8]" />;
            if (cell === "&") return <div key={`${r}-${c}`} className="w-7 h-7 flex items-center justify-center text-sm font-bold bg-[#cdd9ee] text-[#4a6fa5]">&</div>;
            const key = `${r},${c}`;
            const num = numberMap.get(key);
            const isSel = selected && selected.r === r && selected.c === c;
            const inWord = wordSet.has(key);
            const st = status?.[r]?.[c];
            const bg = isSel ? "#4a6fa5" : inWord ? "#eef2f8" : "#ffffff";
            const color = isSel ? "#fff" : "#1d1d1b";
            return (
              <button
                key={key}
                onClick={() => onCellClick(r, c)}
                className="relative w-7 h-7 flex items-center justify-center text-sm font-bold uppercase"
                style={{ background: bg, color }}
              >
                {num ? <span className="absolute top-0 left-0.5 text-[0.5rem] font-normal leading-none text-[#68645b]">{num}</span> : null}
                <span style={st === "correct" ? { color: "#236b3b" } : st === "wrong" ? { color: "#9b2c2c" } : undefined}>
                  {input?.[r]?.[c] || ""}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}