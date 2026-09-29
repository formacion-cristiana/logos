import React, { useMemo, useState } from "react";
import { getCategoryGlossary, getNameGlossary, getWordGlossary } from "@/lib/words";

export default function Glossaries({ lang }) {
  const [open, setOpen] = useState({ cat: false, names: false, words: false });
  const cats = useMemo(() => getCategoryGlossary(lang), [lang]);
  const names = useMemo(() => getNameGlossary(lang), [lang]);
  const words = useMemo(() => getWordGlossary(lang), [lang]);

  return (
    <div className="mt-8 space-y-3">
      <h2 className="text-xl font-bold text-[#1d1d1b] m-0">🔤 GLOSARIOS</h2>

      <Section title="Glosario de Categorías" open={open.cat} onToggle={() => setOpen((o) => ({ ...o, cat: !o.cat }))} count={cats.length}>
        <dl className="grid gap-x-6 gap-y-1" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {cats.map((c, i) => (
            <div key={i} className="flex flex-col">
              <dt className="font-semibold text-[#1d1d1b] text-sm">{c.term}</dt>
              <dd className="m-0 text-sm text-[#68645b]">{c.def}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Glosario de Nombres" open={open.names} onToggle={() => setOpen((o) => ({ ...o, names: !o.names }))} count={names.length}>
        <dl className="grid gap-x-6 gap-y-1" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          {names.map((c, i) => (
            <div key={i} className="flex flex-col">
              <dt className="font-semibold text-[#1d1d1b] text-sm">{c.term}</dt>
              {c.defs.map((d, j) => (
                <dd key={j} className="m-0 text-sm text-[#68645b]"><span className="text-[0.7rem] font-semibold text-[#4a6fa5] uppercase">{d.category}:</span> {d.def}</dd>
              ))}
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Glosario de Palabras" open={open.words} onToggle={() => setOpen((o) => ({ ...o, words: !o.words }))} count={words.length}>
        <dl className="grid gap-x-6 gap-y-1" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {words.map((c, i) => (
            <div key={i} className="flex flex-col">
              <dt className="font-semibold text-[#1d1d1b] text-sm">{c.term}</dt>
              {c.defs.map((d, j) => (
                <dd key={j} className="m-0 text-sm text-[#68645b]"><span className="text-[0.7rem] font-semibold text-[#4a6fa5] uppercase">{d.category}:</span> {d.def}</dd>
              ))}
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}

function Section({ title, open, onToggle, count, children }) {
  return (
    <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-[#1d1d1b] hover:bg-[#faf8f5]"
      >
        <span>{title} <span className="text-sm font-normal text-[#68645b]">({count})</span></span>
        <span className="text-[#4a6fa5]">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}