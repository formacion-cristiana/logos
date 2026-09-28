import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import GameShell from "@/components/game/GameShell";
import GameConfig from "@/components/game/GameConfig";
import Scoreboard from "@/components/game/Scoreboard";
import WordleGrid from "@/components/wordle/WordleGrid";
import Keyboard from "@/components/wordle/Keyboard";
import PrintSheet from "@/components/wordle/PrintSheet";
import SubcategoryBonus from "@/components/game/SubcategoryBonus";
import SolvedPanel from "@/components/game/SolvedPanel";
import { useCountdown } from "@/hooks/useCountdown";
import { getCompoundWords, shuffle, normalizeLetter, t } from "@/lib/words";
import {
  MAX_ROWS,
  PTS_PER_WORD,
  evaluate,
  pickRevealed,
  buildWord,
  firstEmpty,
  nextEmpty,
  prevEmpty
} from "@/lib/wordle";

export default function Wordle() {
  const mtitle = "LETRAS 🟢🟡🔴"
  const msubtitle = "ADIVINÁ palabras iterativamente, letra por letra. Cada paso, acertado o errado, sirve."
  const mrule = "Adiviná las palabras en menos de 6 intentos. <p>Elige un casillero y escribe.</p>🟢Verde: acertaste letra y posición. 🟡Amarillo: acertaste letra, otra posición. 🔴Rojo: la letra no se usa."
  const [lang, setLang] = useState("es");
  const [phase, setPhase] = useState("config"); // config | play | end
  const [view, setView] = useState("play"); // play | print
  const [config, setConfig] = useState(null);
  const [scores, setScores] = useState([]);
  const [pool, setPool] = useState([]);

  const [word, setWord] = useState(null);
  const [revealed, setRevealed] = useState(new Set());
  const [rows, setRows] = useState([]);
  const [activeInput, setActiveInput] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [wordNumber, setWordNumber] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [bonusWord, setBonusWord] = useState(null);
  const [startError, setStartError] = useState("");
  const [solvedWords, setSolvedWords] = useState([]);

  const poolIdxRef = useRef(0);
  const timeoutHandlerRef = useRef(() => {});

  const turnTime = config?.turnTime ?? 60;
  const { seconds, running, start, pause, resume, reset } = useCountdown(
    turnTime,
    () => timeoutHandlerRef.current()
  );

  const buildPool = useCallback(
    (categories) =>
      shuffle(getCompoundWords(lang))
        .map(buildWord)
        .filter((w) => w.letters.length >= 2 && categories.includes(w.category))
        .slice(0, 12),
    [lang]
  );

  const resetInput = useCallback((wObj, rev) => {
    const init = wObj.letters.map((ch, i) => (rev.has(i) ? ch : ""));
    setActiveInput(init);
    setSelectedCell(firstEmpty(init, rev));
  }, []);

  const startWord = useCallback(
    (wObj) => {
      const total = wObj.letters.length;
      const toReveal = total > 6 ? total - 6 : 0;
      const rev = pickRevealed(total, toReveal);
      setWord(wObj);
      setRevealed(rev);
      setRows([]);
      setSolved(false);
      setFailed(false);
      setFeedback(null);
      setAwaitingContinue(false);
      setHintRevealed(false);
      setBonusWord(null);
      resetInput(wObj, rev);
      reset(turnTime);
      start(turnTime);
    },
    [resetInput, reset, start, turnTime]
  );

  // start first word when entering play
  useEffect(() => {
    if (phase === "play" && pool.length && !word) {
      poolIdxRef.current = 0;
      setWordNumber(1);
      setCurrentPlayer(0);
      startWord(pool[0]);
    }
  }, [phase, pool, word, startWord]);

  const handleStart = useCallback(
    (cfg) => {
      const p = buildPool(cfg.categories);
      if (!p.length) {
        setStartError("Esas categorías no tienen palabras (mínimo 2 letras). Elige otras.");
        return;
      }
      setStartError("");
      setConfig(cfg);
      setScores(Array(cfg.players.length).fill(0));
      setPool(p);
      setWord(null);
      setView("play");
      setPhase("play");
    },
    [buildPool]
  );

  const addScore = useCallback((idx, delta) => {
    setScores((prev) => {
      const n = [...prev];
      n[idx] = Math.max(0, n[idx] + delta);
      return n;
    });
  }, []);

  const submitRow = useCallback(() => {
    if (awaitingContinue || bonusWord || phase !== "play" || failed || !word) return;
    for (let i = 0; i < word.letters.length; i++) {
      if (revealed.has(i)) continue;
      if (!activeInput[i]) {
        setFeedback({ type: "bad", text: "Completa todas las casillas antes de comprobar." });
        return;
      }
    }
    pause();
    const guess = activeInput.slice();
    const st = evaluate(guess, word.letters);
    const rowObj = { input: guess, status: st, player: currentPlayer };
    const newRows = [...rows, rowObj];
    setRows(newRows);
    const allGreen = st.every((x) => x === "green");
    if (allGreen) {
      setSolved(true);
      addScore(currentPlayer, PTS_PER_WORD);
      setSolvedWords((prev) => [...prev, { word: word.compound, category: word.category }]);
      setFeedback({
        type: "good",
        text: `¡Palabra resuelta! +${PTS_PER_WORD} pts para ${config.players[currentPlayer].name}.`
      });
      setBonusWord(word);
    } else if (newRows.length >= MAX_ROWS) {
      setFailed(true);
      setFeedback({ type: "bad", text: `No la resolvieron. La palabra era: ${word.compound}.` });
      setAwaitingContinue(true);
    } else {
      const nextIdx = (currentPlayer + 1) % config.players.length;
      setCurrentPlayer(nextIdx);
      setFeedback({ type: "bad", text: `No es correcto. Turno de ${config.players[nextIdx].name}.` });
      resetInput(word, revealed);
      reset(turnTime);
      start(turnTime);
    }
  }, [
    awaitingContinue,
    phase,
    failed,
    word,
    revealed,
    activeInput,
    rows,
    currentPlayer,
    config,
    pause,
    addScore,
    resetInput,
    reset,
    start,
    turnTime
  ]);

  const placeLetter = useCallback(
    (letter) => {
      if (awaitingContinue || bonusWord || phase !== "play" || failed || selectedCell == null) return;
      const L = normalizeLetter(letter.toUpperCase());
      if (!/^[A-Z]$/.test(L)) return;
      if (revealed.has(selectedCell)) return;
      const next = [...activeInput];
      next[selectedCell] = L;
      setActiveInput(next);
      setSelectedCell(nextEmpty(next, revealed, selectedCell));
    },
    [awaitingContinue, phase, failed, selectedCell, revealed, activeInput]
  );

  const backspace = useCallback(() => {
    if (awaitingContinue || bonusWord || phase !== "play" || failed || selectedCell == null) return;
    if (revealed.has(selectedCell)) return;
    if (activeInput[selectedCell]) {
      setActiveInput((prev) => {
        const a = [...prev];
        a[selectedCell] = "";
        return a;
      });
      return;
    }
    const p = prevEmpty(activeInput, revealed, selectedCell);
    if (p != null) {
      setActiveInput((prev) => {
        const a = [...prev];
        a[p] = "";
        return a;
      });
      setSelectedCell(p);
    }
  }, [awaitingContinue, phase, failed, selectedCell, revealed, activeInput]);

  const clearAll = useCallback(() => {
    if (awaitingContinue || bonusWord || phase !== "play" || failed || !word) return;
    resetInput(word, revealed);
    setFeedback(null);
  }, [awaitingContinue, phase, failed, word, revealed, resetInput]);

  const handleSelectCell = useCallback(
    (i) => {
      if (awaitingContinue || bonusWord || phase !== "play" || failed) return;
      if (revealed.has(i)) return;
      setSelectedCell(i);
    },
    [awaitingContinue, phase, failed, revealed]
  );

  const handleKey = useCallback(
    (k) => {
      if (k === "ENTER") submitRow();
      else if (k === "BACK") backspace();
      else placeLetter(k);
    },
    [submitRow, backspace, placeLetter]
  );

  // timeout: pass the turn and RESET the timer (no row consumed)
  timeoutHandlerRef.current = () => {
    if (awaitingContinue || bonusWord || phase !== "play" || !word) return;
    const nextIdx = (currentPlayer + 1) % config.players.length;
    setCurrentPlayer(nextIdx);
    resetInput(word, revealed);
    setFeedback({
      type: "bad",
      text: `Se acabó el tiempo. Turno de ${config.players[nextIdx].name}.`
    });
    reset(turnTime);
    start(turnTime);
  };

  const handleBonusDone = useCallback((bonus) => {
    if (bonus) addScore(currentPlayer, 1);
    setBonusWord(null);
    setAwaitingContinue(true);
  }, [addScore, currentPlayer]);

  const handleContinue = useCallback(() => {
    const nextIdx = poolIdxRef.current + 1;
    if (nextIdx >= pool.length) {
      setPhase("end");
      pause();
      return;
    }
    poolIdxRef.current = nextIdx;
    setWordNumber((w) => w + 1);
    if (failed) setCurrentPlayer((p) => (p + 1) % config.players.length);
    startWord(pool[nextIdx]);
  }, [pool, failed, config, startWord, pause]);

  const handleRevealHint = useCallback(() => {
    if (awaitingContinue || phase !== "play" || !word || hintRevealed) return;
    setHintRevealed(true);
    addScore(currentPlayer, -1);
    setFeedback({ type: "partial", text: `Pista: ${word.help || "—"}` });
  }, [awaitingContinue, phase, word, hintRevealed, addScore, currentPlayer]);

  // auto-reveal text hint after 3 rows
  useEffect(() => {
    if (phase === "play" && !hintRevealed && rows.length >= 3 && word?.help) {
      setHintRevealed(true);
      setFeedback({ type: "partial", text: `Pista: ${word.help}` });
    }
  }, [phase, rows, hintRevealed, word]);

  const handleEndGame = useCallback(() => {
    setPhase("end");
    pause();
    reset(0);
  }, [pause, reset]);

  // physical keyboard
  useEffect(() => {
    const handler = (e) => {
      if (phase !== "play" || awaitingContinue || bonusWord || view !== "play") return;
      if (e.key === "Enter") {
        e.preventDefault();
        submitRow();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
      } else if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]$/.test(e.key)) {
        placeLetter(e.key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, awaitingContinue, view, submitRow, backspace, placeLetter]);

  const keyboardStatus = useMemo(() => {
    const rank = { green: 3, yellow: 2, gray: 1 };
    const best = {};
    rows.forEach((row) => {
      row.input.forEach((ch, i) => {
        if (!ch) return;
        const st = row.status[i];
        if (!best[ch] || rank[st] > rank[best[ch]]) best[ch] = st;
      });
    });
    return best;
  }, [rows]);

  const winner = useMemo(() => {
    if (phase !== "end" || !config) return null;
    const max = Math.max(...scores);
    const winners = scores.map((s, i) => (s === max ? i : -1)).filter((i) => i >= 0);
    if (winners.length > 1)
      return { tie: true, names: winners.map((i) => config.players[i].name) };
    return { tie: false, name: config.players[winners[0]].name, score: max };
  }, [phase, config, scores]);

  const fmtTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <GameShell
      title={mtitle}
      subtitle={msubtitle}
    >
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {phase === "config" && (
        <>
          <GameConfig
            lang={lang}
            setLang={setLang}
            onStart={handleStart}
            startLabel="Comenzar"
            minCategories={1}
            rules={t(lang, mrule)}
          />
          {startError && (
            <p className="text-[#9b2c2c] font-medium mt-3 text-center">{startError}</p>
          )}
        </>
      )}

      {phase === "play" && config && view === "play" && (
        <div className="no-print">
          <Scoreboard players={config.players} scores={scores} currentPlayer={currentPlayer} />

          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <div>
              <div className="text-sm text-[#68645b]">
                Palabra {wordNumber}/{pool.length} · Ronda{" "}
                {Math.min(rows.length + 1, MAX_ROWS)}/{MAX_ROWS}
              </div>
              <div className="font-semibold">
                Turno de{" "}
                <span style={{ color: config.players[currentPlayer].color }}>
                  {config.players[currentPlayer].name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`text-3xl font-bold tabular-nums ${
                  seconds <= 10 ? "text-[#9b2c2c]" : ""
                }`}
              >
                {fmtTime(seconds)}
              </div>
              <button
                onClick={() => (running ? pause() : resume())}
                className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm"
              >
                {running ? "Pausa" : "Continuar"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-5 text-center">
            <h2 className="text-lg font-bold text-[#1d1d1b] mb-1">{word?.category}</h2>
            {hintRevealed && word?.help && (
              <div className="text-sm text-[#946b16] mb-1">Pista: {word.help}</div>
            )}
            <WordleGrid
              letters={word?.letters || []}
              segLens={word?.segLens || []}
              rows={rows}
              activeInput={activeInput}
              revealed={revealed}
              selectedCell={selectedCell}
              onSelectCell={handleSelectCell}
              failed={failed}
              solved={solved}
              maxRows={MAX_ROWS}
            />
            {feedback && (
              <div
                className={`mt-1 text-base font-medium ${
                  feedback.type === "good"
                    ? "text-[#236b3b]"
                    : feedback.type === "bad"
                    ? "text-[#9b2c2c]"
                    : "text-[#946b16]"
                }`}
              >
                {feedback.text}
              </div>
            )}

            {bonusWord ? (
              <div className="mt-4">
                <SubcategoryBonus word={bonusWord} lang={lang} onDone={handleBonusDone} />
              </div>
            ) : awaitingContinue ? (
              <button
                onClick={handleContinue}
                className="mt-4 bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold"
              >
                Continuar
              </button>
            ) : (
              <>
                <Keyboard status={keyboardStatus} onKey={handleKey} disabled={failed} />
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  <button
                    onClick={submitRow}
                    className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-4 py-2 text-sm font-semibold"
                  >
                    Comprobar (↵)
                  </button>
                  <button
                    onClick={clearAll}
                    className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm font-semibold"
                  >
                    Borrar
                  </button>
                  <button
                    onClick={handleRevealHint}
                    className="bg-white text-[#4a6fa5] border border-[#c49de7] rounded-lg px-3 py-2 text-sm font-semibold"
                  >
                    REVELAR PISTA (-1 pts)
                  </button>
                  <button
                    onClick={() => {
                      pause();
                      setView("print");
                    }}
                    className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm"
                  >
                    🖨️ Imprimir
                  </button>
                  <button
                    onClick={handleEndGame}
                    className="bg-white text-[#9b2c2c] border border-[#9b2c2c] rounded-lg px-3 py-2 text-sm"
                  >
                    Terminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {view === "print" && pool.length > 0 && (
        <div>
          <PrintSheet pool={pool} />
          <div className="no-print flex justify-center gap-3 mt-4">
            <button
              onClick={() => window.print()}
              className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold"
            >
              🖨️ Imprimir
            </button>
            <button
              onClick={() => {
                setView("play");
                if (phase === "play" && !awaitingContinue) resume();
              }}
              className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-5 py-2.5"
            >
              ← Volver
            </button>
          </div>
        </div>
      )}

      {phase === "end" && config && view === "play" && (
        <div className="bg-[#fffdf8] border border-[#d9d2c5] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold m-0 mb-4">Fin de la partida</h2>
          <div className="grid gap-2.5 max-w-md mx-auto mb-6">
            {config.players.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3.5 border border-[#d9d2c5] rounded-xl bg-white"
              >
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </span>
                <strong>{scores[i]} puntos</strong>
              </div>
            ))}
          </div>
          {winner && (
            <p className="text-lg font-semibold mb-4">
              {winner.tie
                ? `Empate: ${winner.names.join(", ")}`
                : `Ganador: ${winner.name} (${winner.score} pts)`}
            </p>
          )}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setPhase("config")}
              className="bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-5 py-2.5 font-semibold"
            >
              Nueva partida
            </button>
            <button
              onClick={() => setView("print")}
              className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-5 py-2.5"
            >
              🖨️ Imprimir palabras
            </button>
          </div>
        </div>
      )}
    </GameShell>
  );
}