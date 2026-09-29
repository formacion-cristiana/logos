import React, { useState, useCallback, useMemo, useRef } from "react";
import GameShell from "@/components/game/GameShell";
import GameConfig from "@/components/game/GameConfig";
import Scoreboard from "@/components/game/Scoreboard";
import SubcategoryBonus from "@/components/game/SubcategoryBonus";
import { useCountdown } from "@/hooks/useCountdown";
import { getCompoundWords, shuffle, t } from "@/lib/words";

function buildCards(lang, categories) {
  const words = shuffle(getCompoundWords(lang)).filter((w) => w.tokens.length && categories.includes(w.category));
  return words.map((w, i) => ({ id: `${w.category}-${i}-${w.word}`, word: w.compound, category: w.category, subcategory: w.subcategory, help: w.help }));
}

export default function Categorizar() {
  const mtitle ="KOSMOS ⚛️"
const msubtitle = "🧮 AGRUPÁ las palabras en categorías"
const mrules = "Clica una palabra y luego la columna de su categoría. +3 pts si aciertas (continúas), -1 pt si fallas (pasa el turno)."

  const [lang, setLang] = useState("es");
  const [phase, setPhase] = useState("config");
  const [config, setConfig] = useState(null);
  const [scores, setScores] = useState([]);
  const [cards, setCards] = useState([]);
  const [cats, setCats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [bonusWord, setBonusWord] = useState(null);
  const [startError, setStartError] = useState("");

  const timeoutHandlerRef = useRef(() => {});
  const turnTime = config?.turnTime ?? 60;
  const { seconds, running, start, pause, resume, reset } = useCountdown(turnTime, () => timeoutHandlerRef.current());

  const handleStart = useCallback((cfg) => {
    const c = buildCards(cfg.lang || "es", cfg.categories);
    if (c.length < 4 || cfg.categories.length < 2) { setStartError("Elige al menos 2 categorías con palabras."); return; }
    setStartError("");
    setConfig(cfg);
    setScores(Array(cfg.players.length).fill(0));
    setCards(c);
    setCats([...cfg.categories]);
    setSelected(null);
    setCurrentPlayer(0);
    setFeedback(null);
    setBonusWord(null);
    setPhase("play");
    reset(cfg.turnTime);
    start(cfg.turnTime);
  }, [reset, start]);

  const addScore = useCallback((idx, delta) => {
    setScores((prev) => { const n = [...prev]; n[idx] = Math.max(0, n[idx] + delta); return n; });
  }, []);

  const nextPlayer = useCallback(() => {
    setCurrentPlayer((p) => (p + 1) % config.players.length);
  }, [config]);

  const handleCardClick = useCallback((cardId) => {
    if (bonusWord) return;
    setSelected(cardId);
  }, [bonusWord]);

  const handleColumnClick = useCallback((cat) => {
    if (bonusWord || !selected) return;
    const card = cards.find((c) => c.id === selected);
    if (!card) return;
    if (card.category === cat) {
      // correcto: +3 pts, quita la palabra, bonus
      addScore(currentPlayer, 3);
      setCards((prev) => prev.filter((c) => c.id !== selected));
      setSelected(null);
      setFeedback({ type: "good", text: `¡Correcto! +3 pts. ${config.players[currentPlayer].name} continúa.` });
      setBonusWord(card);
      pause();
    } else {
      // incorrecto: -1 pt, devuelve la palabra, siguiente jugador
      addScore(currentPlayer, -1);
      setSelected(null);
      const nxt = (currentPlayer + 1) % config.players.length;
      setCurrentPlayer(nxt);
      setFeedback({ type: "bad", text: `Incorrecto (-1 pt). Era: ${card.category}. Turno de ${config.players[nxt].name}.` });
      reset(turnTime); start(turnTime);
    }
  }, [bonusWord, selected, cards, addScore, currentPlayer, config, pause, reset, start, turnTime]);

  const handleBonusDone = useCallback((bonus) => {
    if (bonus) addScore(currentPlayer, 1);
    setBonusWord(null);
    setCards((prev) => {
      if (prev.length === 0) {
        setPhase("end");
        pause();
        return prev;
      }
      reset(turnTime); start(turnTime);
      return prev;
    });
  }, [addScore, currentPlayer, reset, start, turnTime, pause]);

  timeoutHandlerRef.current = () => {
    if (phase !== "play" || bonusWord) return;
    setSelected(null);
    const nxt = (currentPlayer + 1) % config.players.length;
    setCurrentPlayer(nxt);
    setFeedback({ type: "bad", text: `Se acabó el tiempo. Turno de ${config.players[nxt].name}.` });
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

  return (
    <GameShell title={mtitle} subtitle={msubtitle}>
      {phase === "config" && (
        <>
          <GameConfig lang={lang} setLang={setLang} onStart={handleStart} startLabel="Comenzar Categorizar" minCategories={2} rules={t(lang, mrules)} />
          {startError && <p className="text-[#9b2c2c] font-medium mt-3 text-center">{startError}</p>}
        </>
      )}
      {phase === "play" && config && (
        <>
          <Scoreboard players={config.players} scores={scores} currentPlayer={currentPlayer} />
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <div>
              <div className="text-sm text-[#68645b]">Palabras restantes: {cards.length}</div>
              <div className="font-semibold">Turno de <span style={{ color: config.players[currentPlayer].color }}>{config.players[currentPlayer].name}</span></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-3xl font-bold tabular-nums ${seconds <= 10 ? "text-[#9b2c2c]" : ""}`}>{fmtTime(seconds)}</div>
              <button onClick={() => (running ? pause() : resume())} className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-2 text-sm">{running ? "Pausa" : "Continuar"}</button>
            </div>
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cats.length}, minmax(0, 1fr))` }}>
            {cats.map((cat) => (
              <div
                key={cat}
                onClick={() => handleColumnClick(cat)}
                className="rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-3 min-h-[120px] cursor-pointer hover:border-[#4a6fa5]"
              >
                <h3 className="font-semibold text-center mb-2">{cat}</h3>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-[#d9d2c5] bg-[#fffdf8] p-4">
            <h3 className="font-semibold mb-2">Palabras por clasificar ({cards.length})</h3>
            <div className="flex flex-wrap gap-2">
              {cards.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCardClick(c.id)}
                  className="rounded-lg px-3 py-2 text-sm border"
                  style={{
                    background: selected === c.id ? "#eef2f8" : "#fff",
                    borderColor: selected === c.id ? "#4a6fa5" : "#d9d2c5",
                    outline: selected === c.id ? "2px solid #4a6fa5" : undefined
                  }}
                >
                  {c.word}
                </button>
              ))}
            </div>
            {bonusWord ? (
              <div className="mt-4">
                <SubcategoryBonus word={bonusWord} lang={lang} onDone={handleBonusDone} />
              </div>
            ) : (
              <>
                {feedback && <div className={`mt-3 text-sm font-medium ${feedback.type === "good" ? "text-[#236b3b]" : feedback.type === "bad" ? "text-[#9b2c2c]" : "text-[#946b16]"}`}>{feedback.text}</div>}
                <div className="flex gap-2 mt-3 flex-wrap">
                  <button onClick={handleEndGame} className="bg-white text-[#9b2c2c] border border-[#9b2c2c] rounded-lg px-3 py-2 text-sm">Terminar</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {phase === "end" && config && (
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