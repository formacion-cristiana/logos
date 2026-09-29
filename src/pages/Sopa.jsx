import React, { useState, useCallback, useMemo, useRef } from "react";
import GameShell from "@/components/game/GameShell";
import GameConfig from "@/components/game/GameConfig";
import Scoreboard from "@/components/game/Scoreboard";
import SopaGrid from "@/components/sopa/SopaGrid";
import SubcategoryBonus from "@/components/game/SubcategoryBonus";
import { useCountdown } from "@/hooks/useCountdown";
import { getCompoundWords, shuffle, normalizeLetter, t } from "@/lib/words";

const DIRS_ALL = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
const DIRS_NO_DIAG = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const THRESHOLD = 12; // máx. palabras simples por sopa antes de dividir por subcategoría

function buildPuzzle(words, size, diagonals) {
  const DIRS = diagonals ? DIRS_ALL : DIRS_NO_DIAG;
  const grid = Array.from({ length: size }, () => Array(size).fill(""));
  const placed = [];
  const sorted = [...words].sort((a, b) => b.normalized.length - a.normalized.length);
  for (const w of sorted) {
    const letters = w.normalized.split("");
    const len = letters.length;
    if (len > size) continue;
    let ok = false;
    for (let attempt = 0; attempt < 300 && !ok; attempt++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      const r0 = Math.floor(Math.random() * size);
      const c0 = Math.floor(Math.random() * size);
      const rEnd = r0 + dr * (len - 1);
      const cEnd = c0 + dc * (len - 1);
      if (rEnd < 0 || rEnd >= size || cEnd < 0 || cEnd >= size) continue;
      let fits = true;
      for (let k = 0; k < len; k++) {
        const cur = grid[r0 + dr * k][c0 + dc * k];
        if (cur && cur !== letters[k]) { fits = false; break; }
      }
      if (!fits) continue;
      for (let k = 0; k < len; k++) grid[r0 + dr * k][c0 + dc * k] = letters[k];
      placed.push({ ...w, r0, c0, dr, dc, len });
      ok = true;
    }
  }
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!grid[r][c]) grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return { grid, placed, size };
}

function lineCells(a, b) {
  if (!a || !b) return [];
  const dr = Math.sign(b.r - a.r), dc = Math.sign(b.c - a.c);
  if (dr === 0 && dc === 0) return [a];
  if (a.r !== b.r && a.c !== b.c && Math.abs(b.r - a.r) !== Math.abs(b.c - a.c)) return null;
  const len = Math.max(Math.abs(b.r - a.r), Math.abs(b.c - a.c));
  const cells = [];
  for (let k = 0; k <= len; k++) cells.push({ r: a.r + dr * k, c: a.c + dc * k });
  return cells;
}

// Construye una lista de sopas a partir de las categorías elegidas.
// Una sopa por categoría; si tiene muchas palabras (>THRESHOLD), una por subcategoría.
function buildSoups(lang, categories, diagonals) {
  const all = getCompoundWords(lang).filter((w) => w.tokens.length && categories.includes(w.category));
  const soups = [];
  for (const catName of categories) {
    const catWords = all.filter((w) => w.category === catName);
    const subs = {};
    catWords.forEach((w) => {
      if (!subs[w.subcategory]) subs[w.subcategory] = [];
      if (subs[w.subcategory].length < 8) subs[w.subcategory].push(w); // hasta 8 compuestas por subcategoría
    });
    const bySub = Object.entries(subs).map(([sub, comps]) => {
      const simples = [];
      comps.forEach((w) => {
        w.tokens.forEach((tok, ti) => {
          simples.push({
            word: tok,
            normalized: w.normTokens[ti],
            category: w.category,
            subcategory: w.subcategory,
            help: w.help || w.subcategory,
            compound: w.compound
          });
        });
      });
      return { sub, simples };
    });
    const total = bySub.reduce((a, s) => a + s.simples.length, 0);
    const maxLen = Math.max(6, ...bySub.flatMap((s) => s.simples.map((x) => x.normalized.length)));
    const size = Math.min(16, Math.max(10, maxLen + 2));
    if (total <= THRESHOLD) {
      const words = bySub.flatMap((s) => s.simples);
      if (words.length) soups.push({ title: catName, category: catName, grouped: bySub.filter((s) => s.simples.length), puzzle: buildPuzzle(words, size, diagonals) });
    } else {
      bySub.forEach((s) => {
        if (!s.simples.length) return;
        const sm = Math.min(16, Math.max(10, Math.max(6, ...s.simples.map((x) => x.normalized.length)) + 2));
        soups.push({ title: `${catName} > ${s.sub}`, category: catName, subcategory: s.sub, grouped: [s], puzzle: buildPuzzle(s.simples, sm, diagonals) });
      });
    }
  }
  return soups;
}

export default function Sopa() {

  const mtitle ="KAOS 🌊"
  const msubtitle = "🎣 PESCÁ las palabras escondidas en el MAR de letras 🔤"
  const mrules = "Al encontrar una palabra escondida clicá la primera y la última letra."

  const [lang, setLang] = useState("es");
  const [phase, setPhase] = useState("config");
  const [view, setView] = useState("play");
  const [config, setConfig] = useState(null);
  const [scores, setScores] = useState([]);
  const [soups, setSoups] = useState([]);
  const [soupIdx, setSoupIdx] = useState(0);
  const [found, setFound] = useState(new Set());
  const [selStart, setSelStart] = useState(null);
  const [hover, setHover] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [bonusWord, setBonusWord] = useState(null);
  const [bonusIsLast, setBonusIsLast] = useState(false);
  const [hintCells, setHintCells] = useState(new Set());
  const [startError, setStartError] = useState("");

  const timeoutHandlerRef = useRef(() => {});
  const turnTime = config?.turnTime ?? 60;
  const { seconds, running, start, pause, resume, reset } = useCountdown(turnTime, () => timeoutHandlerRef.current());

  const puzzle = soups[soupIdx]?.puzzle;

  const startSoup = useCallback((idx, player) => {
    setSoupIdx(idx);
    setFound(new Set());
    setSelStart(null);
    setHover(null);
    setHintCells(new Set());
    setCurrentPlayer(player);
    setFeedback(null);
    setAwaitingContinue(false);
    setBonusWord(null);
    reset(turnTime);
    start(turnTime);
  }, [reset, start, turnTime]);

  const handleStart = useCallback((cfg) => {
    const ss = buildSoups(cfg.lang || lang, cfg.categories, cfg.diagonals !== false);
    if (!ss.length || !ss.some((s) => s.puzzle.placed.length)) { setStartError("Esas categorías no tienen palabras válidas."); return; }
    setStartError("");
    setConfig(cfg);
    setScores(Array(cfg.players.length).fill(0));
    setSoups(ss);
    setView("play");
    setPhase("play");
    startSoup(0, 0);
  }, [lang, startSoup]);

  const addScore = useCallback((idx, delta) => {
    setScores((prev) => { const n = [...prev]; n[idx] = Math.max(0, n[idx] + delta); return n; });
  }, []);

  const foundCells = useMemo(() => {
    if (!puzzle) return [];
    const cells = [];
    found.forEach((i) => {
      const w = puzzle.placed[i];
      for (let k = 0; k < w.len; k++) cells.push({ r: w.r0 + w.dr * k, c: w.c0 + w.dc * k });
    });
    return cells;
  }, [puzzle, found]);

  const selCells = useMemo(() => {
    if (!selStart || !hover) return [];
    return lineCells(selStart, hover) || [];
  }, [selStart, hover]);

  const handleCellClick = useCallback((r, c) => {
    if (phase !== "play" || !puzzle || awaitingContinue || bonusWord) return;
    if (!selStart) { setSelStart({ r, c }); setHover({ r, c }); return; }
    if (selStart.r === r && selStart.c === c) { setSelStart(null); setHover(null); return; }
    const cells = lineCells(selStart, { r, c });
    setSelStart(null); setHover(null);
    if (!cells) { setFeedback({ type: "bad", text: "La selección debe ser una línea recta." }); return; }
    const seq = cells.map((cell) => puzzle.grid[cell.r][cell.c]).join("");
    const rev = seq.split("").reverse().join("");
    const idx = puzzle.placed.findIndex((w, i) => !found.has(i) && (w.normalized === seq || w.normalized === rev));
    if (idx >= 0) {
      const w = puzzle.placed[idx];
      const next = new Set(found); next.add(idx);
      setFound(next);
      addScore(currentPlayer, w.normalized.length);
      const isLast = next.size >= puzzle.placed.length;
      setBonusIsLast(isLast);
      setBonusWord(w);
      pause();
    } else {
      setFeedback({ type: "bad", text: "No es una palabra de la lista." });
    }
  }, [phase, puzzle, awaitingContinue, bonusWord, selStart, found, addScore, currentPlayer, pause]);

  const handleBonusDone = useCallback((bonus) => {
    if (bonus) addScore(currentPlayer, 1);
    setBonusWord(null);
    if (bonusIsLast) {
      const nextIdx = soupIdx + 1;
      if (nextIdx >= soups.length) {
        setFeedback({ type: "good", text: `¡Última sopa completada!` });
        setAwaitingContinue(true);
      } else {
        setFeedback({ type: "good", text: `¡Sopa completada!` });
        setAwaitingContinue(true);
      }
    } else {
      reset(turnTime); start(turnTime);
    }
  }, [bonusIsLast, addScore, currentPlayer, reset, start, turnTime, soupIdx, soups]);

  const handleContinue = useCallback(() => {
    const nextIdx = soupIdx + 1;
    if (nextIdx >= soups.length) { setPhase("end"); pause(); return; }
    startSoup(nextIdx, (currentPlayer + 1) % config.players.length);
  }, [soupIdx, soups, startSoup, currentPlayer, config, pause]);

  const handleRevealLetter = useCallback(() => {
    if (phase !== "play" || !puzzle || awaitingContinue || bonusWord) return;
    const unfound = puzzle.placed.map((w, i) => ({ w, i })).filter(({ i }) => !found.has(i));
    if (!unfound.length) return;
    const pick = unfound[Math.floor(Math.random() * unfound.length)];
    const key = `${pick.w.r0},${pick.w.c0}`;
    setHintCells((prev) => new Set(prev).add(key));
    addScore(currentPlayer, -1);
    setFeedback({ type: "partial", text: "Letra revelada (-1 pt)." });
  }, [phase, puzzle, awaitingContinue, bonusWord, found, addScore, currentPlayer]);

  const handlePass = useCallback(() => {
    if (phase !== "play" || awaitingContinue || bonusWord) return;
    const next = (currentPlayer + 1) % config.players.length;
    setCurrentPlayer(next);
    setSelStart(null); setHover(null);
    setFeedback({ type: "partial", text: `Turno de ${config.players[next].name}.` });
    reset(turnTime); start(turnTime);
  }, [phase, awaitingContinue, bonusWord, currentPlayer, config, reset, start, turnTime]);

  timeoutHandlerRef.current = () => {
    if (phase !== "play" || awaitingContinue || bonusWord) return;
    const next = (currentPlayer + 1) % config.players.length;
    setCurrentPlayer(next);
    setSelStart(null); setHover(null);
    setFeedback({ type: "bad", text: `Se acabó el tiempo. Turno de ${config.players[next].name}.` });
    reset(turnTime); start(turnTime);
  };

  const handleEndGame = useCallback(() => { setPhase("end"); pause(); reset(0); }, [pause, reset]);

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const winner = useMemo(() => {
    if (phase !== "end" || !config) return null;
    const max = Math.max(...scores);
    const winners = scores.map((s, i) => (s === max ? i : -1)).filter((i) => i >= 0);
    if (winners.length > 1) return { tie: true, names: winners.map((i) => config.players[i].name) };
    return { tie: false, name: config.players[winners[0]].name, score: max };
  }, [phase, config, scores]);

  const grouped = useMemo(() => {
    if (!puzzle) return [];
    const map = new Map();
    puzzle.placed.forEach((w, i) => {
      if (!map.has(w.subcategory)) map.set(w.subcategory, []);
      map.get(w.subcategory).push({ w, i });
    });
    return [...map.entries()];
  }, [puzzle]);

  return (
         <GameShell title={mtitle} subtitle={msubtitle}>
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; } }`}</style>
      {phase === "config" && (
        <>
          <GameConfig
            lang={lang}
            setLang={setLang}
            onStart={handleStart}
            startLabel="Comenzar Pesca"
            minCategories={1}
            rules={t(lang, mrules)}
            gameOptions={[{ key: "diagonals", label: "Permitir palabras en diagonales", default: true }]}
          />
          {startError && <p className="text-[#9b2c2c] font-medium mt-3 text-center">{startError}</p>}
        </>
      )}
      {phase === "play" && config && view === "play" && puzzle && (
        <div className="no-print">
          <Scoreboard players={config.players} scores={scores} currentPlayer={currentPlayer} />
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <div>
              <div className="text-sm text-[#68645b]">Sopa {soupIdx + 1}/{soups.length} · {soups[soupIdx].title} · {found.size}/{puzzle.placed.length} encontradas</div>
              <div className="font-semibold">Turno de <span style={{ color: config.players[currentPlayer].color }}>{config.players[currentPlayer].name}</span></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-3xl font-bold tabular-nums ${seconds <= 10 ? "text-[#9b2c2c]" : ""}`}>{fmtTime(seconds)}</div>
              <button onClick={() => (running ? pause() : resume())} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">{running ? "Pausa" : "Continuar"}</button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
            <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4 overflow-x-auto">
              <SopaGrid grid={puzzle.grid} size={puzzle.size} foundCells={foundCells} selCells={selCells} hintCells={hintCells} onCellClick={handleCellClick} onCellHover={(r, c) => selStart && setHover({ r, c })} />
            </div>
            <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4">
              <h3 className="font-semibold mb-2">Palabras a encontrar ({puzzle.placed.length})</h3>
              <div className="space-y-2 mb-2">
                {grouped.map(([sub, items]) => (
                  <div key={sub}>
                    <div className="text-xs font-bold text-[#4a6fa5] uppercase tracking-wide">{sub}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map(({ w, i }) => (
                        <span key={i} className={`text-sm px-2 py-0.5 rounded ${found.has(i) ? "line-through text-[#236b3b] font-semibold" : "text-[#1d1d1b]"}`}>{w.word}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {bonusWord ? (
                <SubcategoryBonus word={bonusWord} lang={lang} onDone={handleBonusDone} />
              ) : (
                <>
                  {feedback && <div className={`mt-3 text-sm font-medium ${feedback.type === "good" ? "text-[#236b3b]" : feedback.type === "bad" ? "text-[#9b2c2c]" : "text-[#946b16]"}`}>{feedback.text}</div>}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {awaitingContinue ? (
                      <button onClick={handleContinue} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-4 py-2 text-sm font-semibold">Continuar</button>
                    ) : (
                      <>
                        <button onClick={handlePass} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">Pasar turno</button>
                        <button onClick={handleRevealLetter} className="bg-white text-[#4a6fa5] border border-[#d9a441] rounded-lg px-3 py-2 text-sm font-semibold">💡 Revelar letra (-1 pt)</button>
                        <button onClick={() => { pause(); setView("print"); }} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">🖨️ Imprimir</button>
                        <button onClick={handleEndGame} className="bg-white text-[#9b2c2c] border border-[#9b2c2c] rounded-lg px-3 py-2 text-sm">Terminar</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {view === "print" && soups.length > 0 && (
        <div>
          {soups.map((s, si) => {
            const p = s.puzzle;
            const gmap = new Map();
            p.placed.forEach((w, i) => { if (!gmap.has(w.subcategory)) gmap.set(w.subcategory, []); gmap.get(w.subcategory).push({ w, i }); });
            return (
              <div key={si} className="bg-white text-black p-6 mb-6 break-inside-avoid">
                <h2 className="text-xl font-bold mb-1">YHWH · PESCADORES DE PALABRAS — {s.title}</h2>
                <div className="inline-grid gap-0 mt-3" style={{ gridTemplateColumns: `repeat(${p.size}, 28px)` }}>
                  {p.grid.map((row, r) => row.map((ch, c) => (
                    <div key={`${r}-${c}`} className="w-7 h-7 flex items-center justify-center border border-black text-sm font-bold uppercase">{ch}</div>
                  )))}
                </div>
                <h3 className="font-semibold mt-4 mb-1">Palabras:</h3>
                <div className="space-y-2">
                  {[...gmap.entries()].map(([sub, items]) => (
                    <div key={sub}>
                      <div className="font-bold text-sm underline">{sub}</div>
                      <ul className="list-disc ml-6">
                        {items.map(({ w, i }) => (
                          <li key={i} className="text-sm"><span className="font-semibold">{w.word}:</span> {w.help || w.subcategory}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="no-print flex justify-center gap-3 mt-4">
            <button onClick={() => window.print()} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold">🖨️ Imprimir</button>
            <button onClick={() => { setView("play"); if (phase === "play" && !awaitingContinue && !bonusWord) resume(); }} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-5 py-2.5">← Volver</button>
          </div>
        </div>
      )}
      {phase === "end" && config && view === "play" && (
        <div className="bg-[#fffdf8] border border-[#d9d2c5] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold m-0 mb-4">Fin de la partida</h2>
          <div className="grid gap-2.5 max-w-md mx-auto mb-6">
            {config.players.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-3.5 border border-[#d9d2c5] rounded-xl bg-white">
                <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full" style={{ background: p.color }} />{p.name}</span>
                <strong>{scores[i]} puntos</strong>
              </div>
            ))}
          </div>
          {winner && <p className="text-lg font-semibold mb-4">{winner.tie ? `Empate: ${winner.names.join(", ")}` : `Ganador: ${winner.name} (${winner.score} pts)`}</p>}
          <button onClick={() => setPhase("config")} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold">Nueva partida</button>
        </div>
      )}
    </GameShell>
  );
}