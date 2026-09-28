import React from "react";
import { pickRevealed, ampersandAfter } from "@/lib/wordle";

export default function PrintSheet({ pool }) {
  if (!pool?.length) return null;
  return (
    <div className="bg-white text-black p-6">
      <h2 className="text-xl font-bold mb-1">YHWH · WORDLE</h2>
      <p className="text-sm mb-4">
        Escribe una letra por casilla. Verde = letra y posición correctas. Amarillo = en la
        palabra, otra posición. 6 filas por palabra. Las casillas ya rellenas son pistas.
      </p>
      <ol className="list-decimal ml-5 space-y-5">
        {pool.map((w, idx) => {
          const total = w.letters.length;
          const toReveal = total > 6 ? total - 6 : 0;
          const rev = pickRevealed(total, toReveal);
          const ampSet = ampersandAfter(w.segLens);

          const hintCells = [];
          for (let i = 0; i < total; i++) {
            hintCells.push(
              <span
                key={i}
                className="inline-flex items-center justify-center border-2 border-black rounded w-7 h-9 mx-0.5 font-bold uppercase"
              >
                {rev.has(i) ? w.letters[i] : ""}
              </span>
            );
            if (ampSet.has(i))
              hintCells.push(<span key={`amp-${i}`} className="mx-1 font-bold">&</span>);
          }

          return (
            <li key={idx}>
              <div className="text-xs text-gray-600">
                {w.category} · {w.subcategory}
              </div>
              {w.help && <div className="text-xs text-gray-500 mb-1">Pista: {w.help}</div>}
              <div className="flex flex-wrap items-center mb-1">{hintCells}</div>
              <div className="space-y-1">
                {Array.from({ length: 6 }).map((_, r) => (
                  <div key={r} className="flex flex-wrap items-center">
                    {w.letters.map((_, i) => (
                      <React.Fragment key={i}>
                        <span className="inline-flex items-center justify-center border border-gray-400 rounded w-7 h-8 mx-0.5" />
                        {ampSet.has(i) && <span className="mx-1 text-gray-400">&</span>}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}