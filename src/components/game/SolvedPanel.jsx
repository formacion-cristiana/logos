import React, { useMemo } from "react";

// Panel izquierdo: muestra las palabras ya adivinadas, agrupadas por categoría.
// Props:
//   items -> array de { word, category } (las palabras descubiertas)
//   title -> título del panel (opcional)
export default function SolvedPanel({ items, title = "Palabras descubiertas" }) {
  const grouped = useMemo(() => {
    const map = new Map();
    items.forEach((it) => {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it.word);
    });
    return [...map.entries()];
  }, [items]);

  return (
    <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4 h-fit lg:sticky lg:top-4">
      <h3 className="font-semibold text-[#1d1d1b] m-0 mb-2 text-sm uppercase tracking-wide">{title} <span className="text-[#68645b] font-normal">({items.length})</span></h3>
      {grouped.length === 0 ? (
        <p className="text-sm text-[#68645b] m-0">—</p>
      ) : (
        <div className="space-y-2">
          {grouped.map(([cat, words]) => (
            <div key={cat}>
              <div className="text-xs font-bold text-[#4a6fa5] uppercase">{cat}</div>
              <div className="flex flex-wrap gap-1">
                {words.map((w, i) => (
                  <span key={i} className="text-sm px-1.5 py-0.5 rounded bg-[#eef2f8] text-[#1d1d1b]">{w}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}