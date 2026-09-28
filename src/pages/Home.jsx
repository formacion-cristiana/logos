import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameShell from "@/components/game/GameShell";
import Glossaries from "@/components/game/Glossaries";
import { LANGS, LANG_LABELS } from "@/lib/words";

const GAMES = [
  { key: "yhwh", title: "YHWH ✡️", desc: "ADIVINÁ palabras agregando vocales.", to: "https://formacion-cristiana.github.io/yhwh", ready: true ,    external: true},
  { key: "wordle", title: "LETRAS 🟢🟡🔴", desc: "ADIVINÁ palabras iterativamente, letra por letra.", to: "/wordle", ready: true },
  { key: "crucigrama", title: "CRUZADAS ⚔️", desc: "ADIVINÁ palabras entrelazadas.", to: "/crucigrama", ready: true },
  { key: "ahorcado", title: "CRUCIFICADO ✝️", desc: "ADIVINÁ palabras durante el Vía Crucis.", to: "/ahorcado", ready: true },
  { key: "sopa", title: "KAOS 🌊", desc: "ENCONTRÁ palabras escondidas.", to: "/sopa", ready: true },
  { key: "categorizar", title: "KOSMOS ⚛️", desc: "ORDENÁ palabras en categorías.", to: "/categorizar", ready: true },
  { key: "cronos", title: "CRONOS 🕞", desc: "ORDENÁ palabras en el tiempo.", to: "/cronos", ready: false },
  { key: "triadas", title: "TRÍADAS 🔱", desc: "AGRUPÁ palabras de a tres.", to: "/triadas", ready: false } 
];

export default function Home() {
  const [lang, setLang] = useState("es");
  return (
    <GameShell title="PURAS PALABRAS" subtitle="Juegos de 1 o más jugadores para construir un glosario Cristiano">
    <div className="text-center text-l font-bold text-[#444444]">
                     🎲   ·   ADIVINÁ · ENCONTRÁ    ·  🧩🕹️    ·  ORDENÁ · AGRUPÁ  ·   🎳🥇   ·   COMPETÍ ·   DESAFIÁ  · 🎯 
    </div>


      <div className="grid gap-4 mt-4 " style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {GAMES.map((g) =>
          g.ready ? (
            <Link
              key={g.key}
              to={g.to}
              className="block rounded-2xl p-5 bg-[#fffdf8] border border-[#d9d2c5] hover:border-[#4a6fa5] hover:shadow-md transition"
            >
              <h3 className="m-0 mb-1 text-2xl font-bold text-[#1d1d1b]">{g.title}</h3>
              <p className="m-0 text-sm text-[#68645b]">{g.desc}</p>
              
            </Link>
          ) : (
            <div
              key={g.key}
              className="rounded-2xl p-5 bg-[#fffdf8] border border-[#d9d2c5] opacity-70"
            >
              <div className="flex items-center justify-between">
                <h3 className="m-0 mb-1 text-xl font-bold text-[#1d1d1b]">{g.title}</h3>
                <span className="text-[0.7rem] px-2 py-0.5 rounded-full bg-[#eee7f4] text-[#73548f] font-semibold">
                  Próximamente
                </span>
              </div>
              <p className="m-0 text-sm text-[#68645b]">{g.desc}</p>
            </div>
          )
        )}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <span className="text-sm text-[#68645b]">Glosarios en:</span>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border border-[#d9d2c5] rounded-lg px-2 py-1.5 bg-white text-sm"
        >
          {LANGS.map((l) => (
            <option key={l} value={l}>{LANG_LABELS[l]}</option>
          ))}
        </select>
      </div>

      <Glossaries lang={lang} />
    </GameShell>
  );
}