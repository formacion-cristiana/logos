import React, { useMemo, useState } from "react";
import { LANGS, LANG_LABELS, getCategories, getAllTags, pickRandomCategories, displayTags, getTextBundle } from "@/lib/words";

const PALETTE = [
  "#e57373", "#f06292", "#ba68c8", "#7986cb", "#4fc3f7",
  "#4db6ac", "#81c784", "#ffb74f", "#a1887f", "#90a4ae"
];

const DEFAULT_NAMES = ["", "", "", "", "", ""];

export default function GameConfig({ lang, setLang, onStart, startLabel = "Comenzar partida", minCategories = 1, rulesNode = null, rules = "", gameOptions = [] }) {
  const categories = useMemo(() => getCategories(lang), [lang]);
  const allTags = useMemo(() => getAllTags(lang), [lang]);
  const bundle = useMemo(() => getTextBundle(lang), [lang]);
  const T = bundle.TEXT;

  const [playerCount, setPlayerCount] = useState(2);
  const [turnTime, setTurnTime] = useState(60);
  const [rounds, setRounds] = useState(3);
  const [suggested, setSuggested] = useState(3);
  const [sortMode, setSortMode] = useState("az");
  const [selectedTags, setSelectedTags] = useState(new Set(["todos"]));
  const [tagMode, setTagMode] = useState("union");
  const [selected, setSelected] = useState(new Set());
  const [playerColors, setPlayerColors] = useState(() => PALETTE.slice(0, 6));
  const [playerNames, setPlayerNames] = useState([...DEFAULT_NAMES]);
  const [error, setError] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [gameOpts, setGameOpts] = useState(() =>
    Object.fromEntries((gameOptions || []).map((o) => [o.key, o.default]))
  );

  const visibleCategories = useMemo(() => {
    let list = categories;
    const tags = [...selectedTags];
    if (!tags.includes("todos")) {
      list = list.filter((c) =>
        tagMode === "union"
          ? c.tags.some((t) => tags.includes(t))
          : tags.every((t) => c.tags.includes(t))
      );
    }
    list = [...list];
    if (sortMode === "az") list.sort((a, b) => a.category.localeCompare(b.category));
    else if (sortMode === "difficulty") list.sort((a, b) => (a.difficulty ?? 1) - (b.difficulty ?? 1));
    else if (sortMode === "random") list.sort(() => Math.random() - 0.5);
    return list;
  }, [categories, selectedTags, tagMode, sortMode]);

  const toggleCategory = (name) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
    setError("");
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (tag === "todos") {
        next.clear();
        next.add("todos");
      } else {
        next.delete("todos");
        if (next.has(tag)) next.delete(tag);
        else next.add(tag);
        if (next.size === 0) next.add("todos");
      }
      return next;
    });
  };

  const chooseRandom = () => {
    const picked = pickRandomCategories(lang, suggested);
    setSelected(new Set(picked.map((c) => c.category)));
    setError("");
  };

  const openRules = () => setShowRulesModal(true);

  const handleStart = () => {
    if (selected.size < minCategories) {
      setError(T.selectCategories ? T.selectCategories.replace("{n}", minCategories) : `Debes seleccionar al menos ${minCategories} categoría(s).`);
      return;
    }
    const players = Array.from({ length: playerCount }, (_, i) => ({
      name: playerNames[i]?.trim() || `${T.player || "Jugador"} ${i + 1}`,
      color: playerColors[i]
    }));
    onStart({
      lang,
      players,
      turnTime,
      rounds,
      categories: [...selected],
      ...gameOpts
    });
  };

  return (
    <div className="bg-[#fffdf8] border border-[#d9d2c5] rounded-2xl p-5 shadow-sm">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleStart}
            className="primary-btn bg-[#4a6fa5] text-white border border-[#4a6fa5] rounded-lg px-4 py-2 font-semibold hover:opacity-90"
          >
            ▶ {startLabel}
          </button>
          <label className="text-sm text-[#68645b]">
            <span className="block mb-1">{T.players || "Jugadores"}</span>
            <select
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="border border-[#d9d2c5] rounded-lg px-2 py-2 bg-white"
            >
              {[2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openRules}
            className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg w-9 h-9 flex items-center justify-center font-bold"
            title={T.rulesTitle || "Reglas"}
            aria-label="Reglas"
          >
            ℹ
          </button>
          <button
            onClick={() => setShowSettings((v) => !v)}
            className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg w-9 h-9 flex items-center justify-center font-bold"
            title="Configuración"
            aria-label="Configuración"
          >
            {showSettings ? "⚙" : "⚙"}
          </button>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border border-[#d9d2c5] rounded-lg px-2 py-1.5 bg-white text-sm"
            aria-label="Idioma"
          >
            {LANGS.map((l) => (
              <option key={l} value={l}>{LANG_LABELS[l]}</option>
            ))}
          </select>
        </div>
      </div>

      {showSettings && (
        <>
          {/* Settings grid */}
          <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 210px))" }}>
            <ConfigCard label={T.time || "Tiempo por turno (seg)"}>
              <input type="number" min={10} max={3600} step={10} value={turnTime}
                onChange={(e) => setTurnTime(Number(e.target.value))} className="cfg-input" />
            </ConfigCard>
            <ConfigCard label={T.rounds || "Rondas totales"}>
              <input type="number" min={1} max={20} value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))} className="cfg-input" />
            </ConfigCard>
            <ConfigCard label={T.randomCategories || "Categorías sugeridas"}>
              <input type="number" min={1} max={20} value={suggested}
                onChange={(e) => setSuggested(Number(e.target.value))} className="cfg-input" />
            </ConfigCard>
            <ConfigCard label={T.sortCategoriesLabel || "Ordenar categorías"}>
              <select value={sortMode} onChange={(e) => setSortMode(e.target.value)} className="cfg-input">
                <option value="az">{T.sortAZ || "A-Z"}</option>
                <option value="difficulty">{T.sortDifficulty || "Dificultad"}</option>
                <option value="random">{T.sortRandom || "Azar"}</option>
              </select>
            </ConfigCard>
            <ConfigCard label={T.tagModeLabel || "Superposición de Tags"}>
              <select value={tagMode} onChange={(e) => setTagMode(e.target.value)} className="cfg-input">
                <option value="union">{T.tagModeUnion || "Unión"}</option>
                <option value="intersection">{T.tagModeIntersection || "Intersección"}</option>
              </select>
            </ConfigCard>
          </div>

          {/* Player colors + names */}
          <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 210px))" }}>
            {Array.from({ length: playerCount }).map((_, i) => (
              <div key={i} className="bg-[#faf8f5] border border-[#d9d2c5] rounded-xl p-2.5 flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[#68645b] truncate">{T.player || "Jugador"} {i + 1}</span>
                <input
                  type="text"
                  value={playerNames[i]}
                  onChange={(e) => {
                    const next = [...playerNames];
                    next[i] = e.target.value;
                    setPlayerNames(next);
                  }}
                  placeholder={`${T.player || "Nombre"} ${i + 1}`}
                  className="border border-[#d9d2c5] rounded-md px-2 py-1 text-sm"
                />
                <div className="flex gap-1 flex-wrap">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        const next = [...playerColors];
                        next[i] = c;
                        setPlayerColors(next);
                      }}
                      className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                      style={{
                        background: c,
                        borderColor: playerColors[i] === c ? "#000" : "transparent"
                      }}
                      aria-label={`Color ${c}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mb-4">
            <h3 className="text-base font-semibold m-0 mb-2">{T.tagsAll ? (T.tagsAll.charAt(0).toUpperCase() + T.tagsAll.slice(1)) + " · Tags" : "Tags"}</h3>
            <div className="flex flex-wrap gap-2 bg-[#faf8f3] border border-[#d9d2c5] p-3 rounded-xl">
              <TagChip label={T.tagsAll || "todos"} active={selectedTags.has("todos")} onClick={() => toggleTag("todos")} />
              {allTags.map((tag) => (
                <TagChip key={tag} label={tag} active={selectedTags.has(tag)} onClick={() => toggleTag(tag)} />
              ))}
            </div>
          </div>

          {/* Game-specific options */}
          {gameOptions.length > 0 && (
            <div className="mb-4">
              <h3 className="text-base font-semibold m-0 mb-2">Opciones del juego</h3>
              <div className="flex flex-wrap gap-3 bg-[#faf8f3] border border-[#d9d2c5] p-3 rounded-xl">
                {gameOptions.map((o) => (
                  <label key={o.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!gameOpts[o.key]}
                      onChange={(e) => setGameOpts((prev) => ({ ...prev, [o.key]: e.target.checked }))}
                      className="w-4 h-4 accent-[#4a6fa5]"
                    />
                    {o.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Categories (always visible — needed to play) */}
      <div className="flex items-center justify-between gap-3 mb-1 mt-3">
        <h3 className="text-base font-semibold m-0">{T.categoriesTitle || "Categorías"}</h3>
        <button onClick={chooseRandom} className="secondary-btn bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg px-3 py-1.5 text-sm hover:bg-[#eef2f8]">
          🎲 {T.randomCategories || "Elegir al azar"}
        </button>
      </div>
      <p className="text-sm text-[#68645b] mb-3">
        {T.categoryCount || "Selecciona las categorías que entrarán en juego."} ({selected.size})
      </p>
      <div className="grid gap-3 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
        {visibleCategories.map((c) => {
          const on = selected.has(c.category);
          const tags = displayTags(c.tags, lang);
          return (
            <button
              key={c.category}
              onClick={() => toggleCategory(c.category)}
              className="text-left rounded-2xl p-3.5 bg-white border border-[#d9d2c5] cursor-pointer transition hover:border-[#4a6fa5]"
              style={on ? { borderColor: "#4a6fa5", outline: "2px solid #4a6fa5", background: "#eef2f8" } : undefined}
            >
              <h4 className="m-0 mb-1 font-semibold">{c.category}</h4>
              <p className="m-0 text-[#68645b] text-sm">{c.fortext}</p>
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {tags.map((t) => (
                    <span key={t} className="text-[0.7rem] px-1.5 py-0.5 rounded-full bg-[#eee7f4] text-[#4a6fa5]">{t}</span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {error && <p className="text-[#9b2c2c] min-h-[1.2em]">{error}</p>}

      {showRulesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowRulesModal(false)}
        >
          <div
            className="bg-[#fffdf8] border border-[#d9d2c5] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-auto p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold m-0">{T.rulesTitle || "Reglas"}</h2>
              <button
                onClick={() => setShowRulesModal(false)}
                className="bg-white text-[#4a6fa5] border border-[#4a6fa5] rounded-lg w-8 h-8 flex items-center justify-center font-bold"
                aria-label={T.closeRules || "Cerrar"}
              >
                ✕
              </button>
            </div>
            <div
              className="text-[#1d1d1b] leading-relaxed [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-0 [&_h1]:mb-2 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_b]:font-semibold"
              dangerouslySetInnerHTML={{ __html: rules || T.rulesBody || "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ConfigCard({ label, children }) {
  return (
    <div className="bg-[#faf8f5] border border-[#d9d2c5] rounded-xl p-2.5 flex flex-col justify-center hover:border-[#4a6fa5] hover:bg-white transition">
      <span className="text-xs font-semibold text-[#68645b] mb-1.5 truncate">{label}</span>
      {children}
    </div>
  );
}

function TagChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded-full border text-sm transition"
      style={active ? { background: "#4a6fa5", color: "#fff", borderColor: "#4a6fa5", fontWeight: 700 } : { background: "#fff", borderColor: "#d9d2c5", color: "#1d1d1b" }}
    >
      {label}
    </button>
  );
}