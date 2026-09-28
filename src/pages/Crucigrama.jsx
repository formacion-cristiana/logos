import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import GameShell from "@/components/game/GameShell";
import GameConfig from "@/components/game/GameConfig";
import Scoreboard from "@/components/game/Scoreboard";
import CrosswordGrid from "@/components/crucigrama/CrosswordGrid";
import SubcategoryBonus from "@/components/game/SubcategoryBonus";
import { generateCrossword } from "@/lib/crossword";
import { useCountdown } from "@/hooks/useCountdown";
import { getCompoundWords, shuffle, normalizeLetter, t } from "@/lib/words";

function wordStart(grid, r, c, dir) {
  const dr = dir, dc = 1 - dir;
  let sr = r, sc = c;
  while (sr - dr >= 0 && sc - dc >= 0 && grid[sr - dr][sc - dc] !== null) { sr -= dr; sc -= dc; }
  return { sr, sc };
}
function collectCells(grid, sr, sc, dir) {
  const dr = dir, dc = 1 - dir;
  const cells = [];
  let r = sr, c = sc;
  while (r < grid.length && c < grid[0].length && grid[r][c] !== null) { cells.push({ r, c }); r += dr; c += dc; }
  return cells;
}

export default function Crucigrama() {
  const msubtitle = "Cada cruce un punto de encuentro, una letra de ayuda mutua."
  const mrules = "El Jugador 1 tiene que adivinar las palabras horizontales. El Jugador 2 las verticales. Si hay un Jugador 3 puede adivinar cualquiera. <p>Clica una casilla para elegir la palabra; vuelve a clicar para cambiar de dirección.</p>"

  const [lang, setLang] = useState("es");
  const [phase, setPhase] = useState("config");
  const [view, setView] = useState("play");
  const [config, setConfig] = useState(null);
  const [scores, setScores] = useState([]);
  const [cw, setCw] = useState(null);
  const [input, setInput] = useState(null);
  const [status, setStatus] = useState(null);
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [startError, setStartError] = useState("");
  const [solvedWords, setSolvedWords] = useState(new Set());
  const [bonusWord, setBonusWord] = useState(null);
  const [bonusQueue, setBonusQueue] = useState([]);
  const didPauseForBonus = useRef(false);

  const timeoutHandlerRef = useRef(() => {});
  const turnTime = config?.turnTime ?? 60;
  const { seconds, running, start, pause, resume, reset } = useCountdown(turnTime, () => timeoutHandlerRef.current());

  const buildCw = useCallback((categories) => {
    const raw = shuffle(getCompoundWords(lang))
      .filter((w) => w.tokens.length && categories.includes(w.category));
    const words = raw
      .map((w) => ({ ...w, normalized: w.normTokens.join("&"), display: w.compound }))
      .filter((w) => w.normalized.length >= 3 && w.normalized.length <= 12)
      .slice(0, 12);
    return generateCrossword(words);
  }, [lang]);

  const startPuzzle = useCallback((c, cfg, player) => {
    setCw(c);
    setInput(c.grid.map((row) => row.map((cell) => (cell === null ? null : (cell === "&" ? "&" : "")))));
    setStatus(c.grid.map((row) => row.map(() => null)));
    setSelected(null);
    setDir(0);
    setCurrentPlayer(player);
    setFeedback(null);
    setAwaitingContinue(false);
    setSolvedWords(new Set());
    setBonusWord(null);
    setBonusQueue([]);
    didPauseForBonus.current = false;
    reset(cfg.turnTime);
    start(cfg.turnTime);
  }, [reset, start]);

  const handleStart = useCallback((cfg) => {
    const c = buildCw(cfg.categories);
    if (!c.placed.length) { setStartError("Esas categorías no tienen palabras válidas (3-10 letras)."); return; }
    setStartError("");
    setConfig(cfg);
    setScores(Array(cfg.players.length).fill(0));
    setView("play");
    setPhase("play");
    startPuzzle(c, cfg, 0);
  }, [buildCw, startPuzzle]);

  const addScore = useCallback((idx, delta) => {
    setScores((prev) => { const n = [...prev]; n[idx] = Math.max(0, n[idx] + delta); return n; });
  }, []);

  const currentWordCells = useMemo(() => {
    if (!cw || !selected) return [];
    const { sr, sc } = wordStart(cw.grid, selected.r, selected.c, dir);
    return collectCells(cw.grid, sr, sc, dir);
  }, [cw, selected, dir]);

  const handleCellClick = useCallback((r, c) => {
    if (phase !== "play" || !cw || awaitingContinue || bonusWord) return;
    if (cw.grid[r][c] === null || cw.grid[r][c] === "&") return;
    if (selected && selected.r === r && selected.c === c) {
      setDir((d) => (d === 0 ? 1 : 0));
    } else {
      setSelected({ r, c });
      const s0 = wordStart(cw.grid, r, c, 0);
      const across = collectCells(cw.grid, s0.sr, s0.sc, 0).length > 1;
      const s1 = wordStart(cw.grid, r, c, 1);
      const down = collectCells(cw.grid, s1.sr, s1.sc, 1).length > 1;
      setDir(!across && down ? 1 : 0);
    }
  }, [phase, cw, selected, awaitingContinue]);

  const typeLetter = useCallback((letter) => {
    if (phase !== "play" || !cw || !selected || awaitingContinue || bonusWord) return;
    const L = normalizeLetter(letter.toUpperCase());
    if (!/^[A-Z]$/.test(L)) return;
    setInput((prev) => { const n = prev.map((row) => [...row]); n[selected.r][selected.c] = L; return n; });
    const idx = currentWordCells.findIndex((cc) => cc.r === selected.r && cc.c === selected.c);
    let ni = idx + 1;
    while (ni < currentWordCells.length && cw.grid[currentWordCells[ni].r][currentWordCells[ni].c] === "&") ni++;
    if (idx >= 0 && ni < currentWordCells.length) {
      const next = currentWordCells[ni];
      setSelected({ r: next.r, c: next.c });
    }
  }, [phase, cw, selected, awaitingContinue, bonusWord, currentWordCells]);

  const backspace = useCallback(() => {
    if (phase !== "play" || !cw || !selected || awaitingContinue || bonusWord) return;
    const idx = currentWordCells.findIndex((cc) => cc.r === selected.r && cc.c === selected.c);
    if (input[selected.r][selected.c]) {
      setInput((prev) => { const n = prev.map((row) => [...row]); n[selected.r][selected.c] = ""; return n; });
      return;
    }
    let pi = idx - 1;
    while (pi >= 0 && cw.grid[currentWordCells[pi].r][currentWordCells[pi].c] === "&") pi--;
    if (pi >= 0) {
      const prevCell = currentWordCells[pi];
      setInput((p) => { const n = p.map((row) => [...row]); n[prevCell.r][prevCell.c] = ""; return n; });
      setSelected({ r: prevCell.r, c: prevCell.c });
    }
  }, [phase, cw, selected, awaitingContinue, bonusWord, currentWordCells, input]);

  const handleCheck = useCallback(() => {
    if (phase !== "play" || !cw || awaitingContinue || bonusWord) return;
    setStatus(cw.grid.map((row, r) => row.map((cell, c) => {
      if (cell === null) return null;
      const v = input[r][c];
      return v ? (v === cell ? "correct" : "wrong") : null;
    })));
    let correct = 0, total = 0;
    for (let r = 0; r < cw.grid.length; r++)
      for (let c = 0; c < cw.grid[0].length; c++) {
        if (cw.grid[r][c] === null) continue;
        total++;
        if (input[r][c] === cw.grid[r][c]) correct++;
      }
    if (correct === total) {
      setFeedback({ type: "good", text: `¡Crucigrama resuelto!` });
      setAwaitingContinue(true);
      pause();
    } else {
      const next = (currentPlayer + 1) % config.players.length;
      setCurrentPlayer(next);
      setFeedback({ type: "partial", text: `${correct}/${total} correctas. Turno de ${config.players[next].name}.` });
      reset(turnTime); start(turnTime);
    }
  }, [phase, cw, input, awaitingContinue, addScore, currentPlayer, config, pause, reset, start, turnTime]);

  timeoutHandlerRef.current = () => {
    if (phase !== "play" || awaitingContinue || bonusWord) return;
    const next = (currentPlayer + 1) % config.players.length;
    setCurrentPlayer(next);
    setFeedback({ type: "bad", text: `Se acabó el tiempo. Turno de ${config.players[next].name}.` });
    reset(turnTime); start(turnTime);
  };

  const handleContinue = useCallback(() => {
    const c = buildCw(config.categories);
    if (!c.placed.length) { setPhase("end"); pause(); return; }
    startPuzzle(c, config, (currentPlayer + 1) % config.players.length);
  }, [buildCw, config, startPuzzle, currentPlayer, pause]);

  const handleBonusDone = useCallback((bonus) => {
    if (bonus) addScore(currentPlayer, 1);
    setBonusWord(null);
    setBonusQueue((q) => q.slice(1));
  }, [addScore, currentPlayer]);

  const handleEndGame = useCallback(() => { setPhase("end"); pause(); reset(0); }, [pause, reset]);

  useEffect(() => {
    const handler = (e) => {
      if (phase !== "play" || awaitingContinue || bonusWord || view !== "play" || !selected) return;
      if (e.key === "Backspace") { e.preventDefault(); backspace(); }
      else if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]$/.test(e.key)) { typeLetter(e.key); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, awaitingContinue, view, selected, backspace, typeLetter]);

  // Auto-detect completed words and award points as they are solved.
  useEffect(() => {
    if (!cw || phase !== "play" || awaitingContinue || !input || bonusWord) return;
    const newly = [];
    cw.placed.forEach((p, idx) => {
      if (solvedWords.has(idx)) return;
      const cells = collectCells(cw.grid, p.row, p.col, p.dir);
      if (!cells.length) return;
      const ok = cells.every((cc) => {
        const g = cw.grid[cc.r][cc.c];
        if (g === "&") return input[cc.r]?.[cc.c] === "&";
        return input[cc.r]?.[cc.c] && input[cc.r][cc.c] === g;
      });
      if (ok) newly.push(idx);
    });
    if (!newly.length) return;
    const next = new Set(solvedWords);
    newly.forEach((idx) => { next.add(idx); addScore(currentPlayer, cw.placed[idx].normalized.length); });
    setSolvedWords(next);
    pause();
    didPauseForBonus.current = true;
    setBonusQueue((q) => [...q, ...newly.map((idx) => cw.placed[idx])]);
  }, [input]);

  // Mostrar el siguiente bonus pendiente.
  useEffect(() => {
    if (!bonusWord && bonusQueue.length) {
      setBonusWord(bonusQueue[0]);
    }
  }, [bonusWord, bonusQueue]);

  // Al terminar la secuencia de bonus: completar o reanudar el temporizador.
  useEffect(() => {
    if (!cw || phase !== "play" || awaitingContinue) return;
    if (bonusWord || bonusQueue.length) return;
    if (solvedWords.size === cw.placed.length && cw.placed.length) {
      setFeedback({ type: "good", text: "¡Crucigrama resuelto!" });
      setAwaitingContinue(true);
      pause();
    } else if (didPauseForBonus.current) {
      didPauseForBonus.current = false;
      resume();
    }
  }, [bonusWord, bonusQueue, solvedWords, cw, phase, awaitingContinue]);

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const winner = useMemo(() => {
    if (phase !== "end" || !config) return null;
    const max = Math.max(...scores);
    const winners = scores.map((s, i) => (s === max ? i : -1)).filter((i) => i >= 0);
    if (winners.length > 1) return { tie: true, names: winners.map((i) => config.players[i].name) };
    return { tie: false, name: config.players[winners[0]].name, score: max };
  }, [phase, config, scores]);

  return (
    <GameShell title="CRUZADAS ⚔️" subtitle={msubtitle}>
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; } }`}</style>
      {phase === "config" && (
        <>
          <GameConfig lang={lang} setLang={setLang} onStart={handleStart} startLabel="Comenzar" minCategories={1} rules={t(lang, mrules)} />
          {startError && <p className="text-[#9b2c2c] font-medium mt-3 text-center">{startError}</p>}
        </>
      )}
      {phase === "play" && config && view === "play" && cw && (
        <div className="no-print">
          <Scoreboard players={config.players} scores={scores} currentPlayer={currentPlayer} />
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <div className="font-semibold">Turno de <span style={{ color: config.players[currentPlayer].color }}>{config.players[currentPlayer].name}</span></div>
            <div className="flex items-center gap-2">
              <div className={`text-3xl font-bold tabular-nums ${seconds <= 10 ? "text-[#9b2c2c]" : ""}`}>{fmtTime(seconds)}</div>
              <button onClick={() => (running ? pause() : resume())} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">{running ? "Pausa" : "Continuar"}</button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
            <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4 overflow-x-auto">
              <CrosswordGrid grid={cw.grid} numberMap={cw.numberMap} input={input} status={status} wordCells={currentWordCells} selected={selected} onCellClick={handleCellClick} />
            </div>
            <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4">
              {bonusWord && (
                <div className="mb-3">
                  <SubcategoryBonus word={bonusWord} lang={lang} onDone={handleBonusDone} />
                </div>
              )}
              <h3 className="font-semibold mb-1">Pistas</h3>
              <ul className="text-sm space-y-1 mb-3">
                {(() => {
                  const map = new Map();
                  cw.across.forEach((w) => map.set(w.number, { ...(map.get(w.number) || {}), h: w.help || w.subcategory }));
                  cw.down.forEach((w) => map.set(w.number, { ...(map.get(w.number) || {}), v: w.help || w.subcategory }));
                  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([num, c]) => (
                    <li key={num}><span className="font-semibold">{num}.</span> {c.h && <span>↔ {c.h}</span>}{c.h && c.v ? " · " : ""}{c.v && <span>↕ {c.v}</span>}</li>
                  ));
                })()}
              </ul>
              {feedback && <div className={`text-sm font-medium ${feedback.type === "good" ? "text-[#236b3b]" : feedback.type === "bad" ? "text-[#9b2c2c]" : "text-[#946b16]"}`}>{feedback.text}</div>}
              {!bonusWord && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {awaitingContinue ? (
                    <button onClick={handleContinue} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-4 py-2 text-sm font-semibold">Nuevo crucigrama</button>
                  ) : (
                    <>
                      <button onClick={handleCheck} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-4 py-2 text-sm font-semibold">Comprobar</button>
                      <button onClick={() => { pause(); setView("print"); }} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">🖨️ Imprimir</button>
                      <button onClick={handleEndGame} className="bg-white text-[#9b2c2c] border border-[#9b2c2c] rounded-lg px-3 py-2 text-sm">Terminar</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {view === "print" && cw && (
        <div>
          <div className="bg-white text-black p-6">
            <h2 className="text-xl font-bold mb-1">YHWH · CRUCIGRAMA</h2>
            <div className="inline-grid gap-px bg-[#d9d2c5] mt-3" style={{ gridTemplateColumns: `repeat(${cw.cols}, 28px)` }}>
              {cw.grid.map((row, r) => row.map((cell, c) => {
                if (cell === null) return <div key={`${r}-${c}`} className="w-7 h-7 bg-white" />;
                if (cell === "&") return <div key={`${r}-${c}`} className="w-7 h-7 bg-[#cdd9ee] flex items-center justify-center border border-black text-sm font-bold text-[#4a6fa5]">&</div>;
                const num = cw.numberMap.get(`${r},${c}`);
                return (
                  <div key={`${r}-${c}`} className="relative w-7 h-7 bg-white flex items-center justify-center border border-black">
                    {num ? <span className="absolute top-0 left-0.5 text-[0.5rem] font-normal leading-none">{num}</span> : null}
                  </div>
                );
              }))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Pistas</h3>
              <ol className="text-sm list-decimal ml-5 space-y-1">
                {(() => {
                  const map = new Map();
                  cw.across.forEach((w) => map.set(w.number, { ...(map.get(w.number) || {}), h: w.help || w.subcategory }));
                  cw.down.forEach((w) => map.set(w.number, { ...(map.get(w.number) || {}), v: w.help || w.subcategory }));
                  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([num, c]) => (
                    <li key={num}>{c.h && <span>↔ {c.h}</span>}{c.h && c.v ? " · " : ""}{c.v && <span>↕ {c.v}</span>}</li>
                  ));
                })()}
              </ol>
            </div>
          </div>
          <div className="no-print flex justify-center gap-3 mt-4">
            <button onClick={() => window.print()} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold">🖨️ Imprimir</button>
            <button onClick={() => { setView("play"); if (phase === "play" && !awaitingContinue) resume(); }} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-5 py-2.5">← Volver</button>
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