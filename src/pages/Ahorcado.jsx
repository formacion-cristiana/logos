import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import GameShell from "@/components/game/GameShell";
import GameConfig from "@/components/game/GameConfig";
import Scoreboard from "@/components/game/Scoreboard";
import Keyboard from "@/components/wordle/Keyboard";
import ViaCrucisFigure, { MAX_WRONG } from "@/components/ahorcado/ViaCrucisFigure";
import SubcategoryBonus from "@/components/game/SubcategoryBonus";
import { useCountdown } from "@/hooks/useCountdown";
import { getSimpleWords, shuffle, normalizeLetter, t } from "@/lib/words";


export default function Ahorcado() {
const msubtitle = "ADIVINÁ la mayor cantidad de palabras antes de completar el Vía Crucis."
const mrules = "Adivina la palabra letra por letra. Cada error avanza tu Vía Crucis. +1 pt por letra correcta. 12 vidas por jugador."

  const [lang, setLang] = useState("es");
  const [phase, setPhase] = useState("config");
  const [config, setConfig] = useState(null);
  const [scores, setScores] = useState([]);
  const [pool, setPool] = useState([]);
  const poolIdxRef = useRef(0);
  const [word, setWord] = useState(null);
  const [guessed, setGuessed] = useState(new Set());
  const [wrongByPlayer, setWrongByPlayer] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [bonusWord, setBonusWord] = useState(null);
  const [startError, setStartError] = useState("");

  const timeoutHandlerRef = useRef(() => {});
  const turnTime = config?.turnTime ?? 60;
  const { seconds, running, start, pause, resume, reset } = useCountdown(turnTime, () => timeoutHandlerRef.current());

  const buildPool = useCallback((categories) =>
    shuffle(getSimpleWords(lang))
      .filter((w) => w.normalized.length >= 3 && w.normalized.length <= 12 && categories.includes(w.category))
      .slice(0, 12)
  , [lang]);

  const alivePlayers = useMemo(() => {
    if (!config) return [];
    return config.players.map((_, i) => i).filter((i) => (wrongByPlayer[i] ?? 0) < MAX_WRONG);
  }, [config, wrongByPlayer]);
  const eliminated = useMemo(() => {
    if (!config) return [];
    return config.players.map((_, i) => i).filter((i) => (wrongByPlayer[i] ?? 0) >= MAX_WRONG);
  }, [config, wrongByPlayer]);

  const nextAlive = useCallback((from) => {
    if (!config) return -1;
    const n = config.players.length;
    for (let k = 1; k <= n; k++) {
      const cand = (from + k) % n;
      if ((wrongByPlayer[cand] ?? 0) < MAX_WRONG) return cand;
    }
    return -1;
  }, [config, wrongByPlayer]);

  const startWord = useCallback((wObj, player) => {
    setWord(wObj);
    setGuessed(new Set());
    setCurrentPlayer(player);
    setFeedback(null);
    setAwaitingContinue(false);
    setOutcome(null);
    setHintRevealed(false);
    setBonusWord(null);
    reset(turnTime);
    start(turnTime);
  }, [reset, start, turnTime]);

  const handleStart = useCallback((cfg) => {
    const p = buildPool(cfg.categories);
    if (!p.length) { setStartError("Esas categorías no tienen palabras válidas (3-12 letras)."); return; }
    setStartError("");
    setConfig(cfg);
    setScores(Array(cfg.players.length).fill(0));
    setWrongByPlayer(Array(cfg.players.length).fill(0));
    setPool(p);
    poolIdxRef.current = 0;
    setPhase("play");
    startWord(p[0], 0);
  }, [buildPool, startWord]);

  const addScore = useCallback((idx, delta) => {
    setScores((prev) => { const n = [...prev]; n[idx] = Math.max(0, n[idx] + delta); return n; });
  }, []);

  const guessLetter = useCallback((letter) => {
    if (phase !== "play" || !word || awaitingContinue || bonusWord) return;
    const L = normalizeLetter(letter.toUpperCase());
    if (!/^[A-Z]$/.test(L)) return;
    if (guessed.has(L)) return;
    const next = new Set(guessed); next.add(L);
    setGuessed(next);
    if (word.normalized.includes(L)) {
      addScore(currentPlayer, 1);
      const solvedNow = word.normalized.split("").every((ch) => next.has(ch));
      if (solvedNow) {
        setOutcome("win");
        setFeedback({ type: "good", text: `¡${word.word}! +1 pt para ${config.players[currentPlayer].name}.` });
        setBonusWord(word);
        pause();
      } else {
        setFeedback({ type: "good", text: `¡Letra correcta! +1 pt. ${config.players[currentPlayer].name} continúa.` });
        reset(turnTime); start(turnTime);
      }
    } else {
      const newWrong = (wrongByPlayer[currentPlayer] ?? 0) + 1;
      const wb = [...wrongByPlayer]; wb[currentPlayer] = newWrong;
      setWrongByPlayer(wb);
      if (newWrong >= MAX_WRONG) {
        // este jugador queda eliminado
        const nxt = nextAlive(currentPlayer);
        if (nxt === -1) {
          setOutcome("lose");
          setFeedback({ type: "bad", text: `Todos los jugadores quedaron eliminados. La palabra era: ${word.word}.` });
          setAwaitingContinue(true);
          pause();
        } else {
          setCurrentPlayer(nxt);
          setFeedback({ type: "bad", text: `${config.players[currentPlayer].name} quedó eliminado. Turno de ${config.players[nxt].name}.` });
          reset(turnTime); start(turnTime);
        }
      } else {
        const nxt = nextAlive(currentPlayer);
        if (nxt === -1 || nxt === currentPlayer) {
          setFeedback({ type: "bad", text: `Letra incorrecta (${newWrong}/${MAX_WRONG}). ${config.players[currentPlayer].name} continúa.` });
          reset(turnTime); start(turnTime);
        } else {
          setCurrentPlayer(nxt);
          setFeedback({ type: "bad", text: `Letra incorrecta (${newWrong}/${MAX_WRONG}). Turno de ${config.players[nxt].name}.` });
          reset(turnTime); start(turnTime);
        }
      }
    }
  }, [phase, word, awaitingContinue, guessed, wrongByPlayer, currentPlayer, config, addScore, pause, reset, start, turnTime, nextAlive]);

  timeoutHandlerRef.current = () => {
    if (phase !== "play" || awaitingContinue || bonusWord) return;
    const nxt = nextAlive(currentPlayer);
    if (nxt === -1 || nxt === currentPlayer) {
      setFeedback({ type: "bad", text: `Se acabó el tiempo. ${config.players[currentPlayer].name} continúa.` });
    } else {
      setCurrentPlayer(nxt);
      setFeedback({ type: "bad", text: `Se acabó el tiempo. Turno de ${config.players[nxt].name}.` });
    }
    reset(turnTime); start(turnTime);
  };

  const handleBonusDone = useCallback((bonus) => {
    if (bonus) addScore(currentPlayer, 1);
    setBonusWord(null);
    setAwaitingContinue(true);
  }, [addScore, currentPlayer]);

  const handleContinue = useCallback(() => {
    const ni = poolIdxRef.current + 1;
    const nxt = nextAlive(currentPlayer);
    if (nxt === -1) { setPhase("end"); pause(); return; }
    if (ni >= pool.length) { setPhase("end"); pause(); return; }
    poolIdxRef.current = ni;
    startWord(pool[ni], nxt);
  }, [pool, config, startWord, pause, nextAlive, currentPlayer]);

  const handleRevealHint = useCallback(() => {
    if (phase !== "play" || !word || hintRevealed || awaitingContinue) return;
    setHintRevealed(true);
    addScore(currentPlayer, -1);
    setFeedback({ type: "partial", text: "Pista revelada (−1 pt)." });
  }, [phase, word, hintRevealed, awaitingContinue, addScore, currentPlayer]);

  const handleEndGame = useCallback(() => { setPhase("end"); pause(); reset(0); }, [pause, reset]);

  useEffect(() => {
    const handler = (e) => {
      if (phase !== "play" || awaitingContinue || bonusWord) return;
      if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]$/.test(e.key)) { e.preventDefault(); guessLetter(e.key); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, awaitingContinue, guessLetter]);

  const keyboardStatus = useMemo(() => {
    const st = {};
    guessed.forEach((ch) => { st[ch] = word?.normalized.includes(ch) ? "green" : "gray"; });
    return st;
  }, [guessed, word]);

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const winner = useMemo(() => {
    if (phase !== "end" || !config) return null;
    const max = Math.max(...scores);
    const winners = scores.map((s, i) => (s === max ? i : -1)).filter((i) => i >= 0);
    if (winners.length > 1) return { tie: true, names: winners.map((i) => config.players[i].name) };
    return { tie: false, name: config.players[winners[0]].name, score: max };
  }, [phase, config, scores]);

  const curWrong = wrongByPlayer[currentPlayer] ?? 0;

  return (
    <GameShell title="CRUCIFICADO" subtitle={msubtitle}>
      {phase === "config" && (
        <>
          <GameConfig lang={lang} setLang={setLang} onStart={handleStart} startLabel="Comenzar Crucificado" minCategories={1} rules={t(lang, mrules)} />
          {startError && <p className="text-[#9b2c2c] font-medium mt-3 text-center">{startError}</p>}
        </>
      )}
      {phase === "play" && config && word && (
        <>
          <Scoreboard players={config.players} scores={scores} currentPlayer={currentPlayer} eliminated={eliminated} />
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <div>
              <div className="text-sm text-[#68645b]">Palabra {poolIdxRef.current + 1}/{pool.length}</div>
              <div className="font-semibold">Turno de <span style={{ color: config.players[currentPlayer].color }}>{config.players[currentPlayer].name}</span></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-3xl font-bold tabular-nums ${seconds <= 10 ? "text-[#9b2c2c]" : ""}`}>{fmtTime(seconds)}</div>
              <button onClick={() => (running ? pause() : resume())} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">{running ? "Pausa" : "Continuar"}</button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[auto_1fr]">
            <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4 flex flex-col items-center">
              <ViaCrucisFigure wrong={curWrong} />
              <div className="text-sm text-[#68645b] mt-1">Estaciones: {curWrong}/{MAX_WRONG}</div>
            </div>
            <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-5 text-center">
              <h2 className="text-lg font-bold text-[#1d1d1b] mb-1">{word.category}</h2>
              {hintRevealed && <div className="text-sm text-[#946b16] mb-2">Pista: {word.help || word.subcategory}</div>}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {word.normalized.split("").map((ch, i) => (
                  <div key={i} className="w-8 h-10 sm:w-10 sm:h-12 border-b-4 border-[#4a6fa5] flex items-center justify-center text-xl sm:text-2xl font-bold uppercase">
                    {guessed.has(ch) || outcome === "lose" ? ch : ""}
                  </div>
                ))}
              </div>
              {feedback && <div className={`text-base font-medium mb-3 ${feedback.type === "good" ? "text-[#236b3b]" : feedback.type === "bad" ? "text-[#9b2c2c]" : "text-[#946b16]"}`}>{feedback.text}</div>}
              {bonusWord ? (
                <SubcategoryBonus word={bonusWord} lang={lang} onDone={handleBonusDone} />
              ) : awaitingContinue ? (
                <button onClick={handleContinue} className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold">Continuar</button>
              ) : (
                <>
                  <Keyboard status={keyboardStatus} onKey={(k) => { if (k !== "ENTER" && k !== "BACK") guessLetter(k); }} />
                  <div className="flex justify-center gap-2 mt-4 flex-wrap">
                    <button onClick={handleRevealHint} className="bg-white text-[#4a6fa5] border border-[#c49de7] rounded-lg px-3 py-2 text-sm font-semibold">REVELAR PISTA (-1 pts)</button>
                    <button onClick={handleEndGame} className="bg-white text-[#9b2c2c] border border-[#9b2c2c] rounded-lg px-3 py-2 text-sm">Terminar</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {phase === "end" && config && (
        <div className="bg-[#fffdf8] border border-[#d9d2c5] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold m-0 mb-4">Fin de la partida</h2>
          <div className="grid gap-2.5 max-w-md mx-auto mb-6">
            {config.players.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-3.5 border border-[#d9d2c5] rounded-xl bg-white">
                <span className="flex items-center gap-2"><span className="w-4 h-4 rounded-full" style={{ background: p.color }} />{p.name}{eliminated.includes(i) && <span className="text-[0.7rem] text-[#9b2c2c] font-semibold">eliminado</span>}</span>
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