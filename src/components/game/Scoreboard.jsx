import React from "react";

export default function Scoreboard({ players, scores, currentPlayer, eliminated = [] }) {
  return (
    <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}>
      {players.map((p, i) => {
        const active = i === currentPlayer;
        const isOut = eliminated.includes(i);
        const max = Math.max(1, ...scores);
        const fill = max ? `${(scores[i] / max) * 100}%` : "0%";
        return (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl border border-[#d9d2c5] bg-white px-3 py-2 flex flex-col justify-between ${isOut ? "opacity-40" : ""}`}
            style={active && !isOut ? { outline: `3px solid ${p.color}`, boxShadow: `0 0 8px ${p.color}` } : undefined}
          >
            <span className="z-[2] font-bold truncate">{p.name || `Jugador ${i + 1}`}{isOut && <span className="ml-1 text-[0.65rem] font-semibold text-[#9b2c2c]">✕</span>}</span>
            <span
              className="relative z-[2] rounded-md mt-1 px-1 py-0.5"
              style={{
                background: `linear-gradient(to right, ${p.color} 0%, ${p.color} ${fill}, transparent ${fill}, transparent 100%)`
              }}
            >
              {scores[i]} pts
            </span>
          </div>
        );
      })}
    </div>
  );
}