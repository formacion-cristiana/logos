import React, { useMemo, useState } from "react";
import { getSubcategories, shuffle } from "@/lib/words";

// Componente compartido: tras adivinar una palabra, pregunta a qué subcategoría
// pertenece. Si el jugador acierta, suma +1 pt de bonus.
// Props:
//   word  -> { word/compound, category, subcategory }
//   lang  -> idioma actual
//   onDone(bonusAwarded) -> callback al pulsar "Continuar"
export default function SubcategoryBonus({ word, lang, onDone }) {
  const options = useMemo(() => {
    const subs = getSubcategories(lang, word.category);
    const correct = word.subcategory;
    const distractors = shuffle(subs.filter((s) => s !== correct)).slice(0, 3);
    const opts = shuffle([correct, ...distractors]);
    return opts.length ? opts : [correct];
  }, [word, lang]);

  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null);

  const handlePick = (sub) => {
    if (result) return;
    setPicked(sub);
    setResult(sub === word.subcategory ? "correct" : "wrong");
  };

  const display = word.compound || word.word || "";

  return (
    <div className="rounded-2xl border-2 border-[#c49de7] bg-[#f6f0fb] p-5 text-center">
      <div className="text-sm text-[#68645b] mb-1">¡Palabra adivinada!</div>
      <div className="text-2xl font-bold mb-1 uppercase">{display}</div>
      <div className="text-sm text-[#68645b] mb-3">
        ¿A qué subcategoría pertenece? <span className="font-semibold">(+1 pt bonus)</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {options.map((opt) => {
          let style = { background: "#fff", borderColor: "#d9d2c5", color: "#1d1d1b" };
          if (result) {
            if (opt === word.subcategory)
              style = { background: "#dcfce7", borderColor: "#236b3b", color: "#236b3b", fontWeight: 700 };
            else if (opt === picked)
              style = { background: "#fee2e2", borderColor: "#9b2c2c", color: "#9b2c2c" };
            else style = { background: "#f5f5f5", borderColor: "#e5e5e5", color: "#aaa" };
          } else if (opt === picked) {
            style = { background: "#eef2f8", borderColor: "#4a6fa5", color: "#4a6fa5", fontWeight: 700 };
          }
          return (
            <button
              key={opt}
              onClick={() => handlePick(opt)}
              disabled={!!result}
              className="px-3 py-2 rounded-lg border text-sm transition"
              style={style}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {result && (
        <>
          <div className={`text-sm font-semibold mb-3 ${result === "correct" ? "text-[#236b3b]" : "text-[#9b2c2c]"}`}>
            {result === "correct" ? "¡Correcto! +1 pt" : `Era: ${word.subcategory}`}
          </div>
          <button
            onClick={() => onDone(result === "correct")}
            className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2 font-semibold"
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
}