import React from "react";

const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  "ZXCVBNM".split("")
];

// status: { [letter]: 'green' | 'yellow' | 'gray' }
// onKey receives a single uppercase letter, or "ENTER" / "BACK".
export default function Keyboard({ status = {}, onKey, disabled }) {
  const click = (k) => { if (disabled) return; onKey(k); };

  const colorFor = (st) =>
    st === "green"
      ? { background: "#236b3b", color: "#fff", borderColor: "#236b3b" }
      : st === "yellow"
      ? { background: "#d9a441", color: "#fff", borderColor: "#d9a441" }
      : st === "gray"
      ? { background: "#9aa0a6", color: "#fff", borderColor: "#9aa0a6" }
      : { background: "#fffdf8", color: "#1d1d1b", borderColor: "#b8b2a4" };

  const letterBtn = (k) => (
    <button
      key={k}
      onClick={() => click(k)}
      disabled={disabled}
      className="rounded-md border-2 font-bold uppercase transition active:scale-90 disabled:opacity-40 min-w-[26px] sm:min-w-[34px] h-9 sm:h-12 text-sm sm:text-base px-1"
      style={colorFor(status[k])}
    >
      {k}
    </button>
  );

  const wideBtn = (k, label) => (
    <button
      key={k}
      onClick={() => click(k)}
      disabled={disabled}
      className="rounded-md border-2 font-bold uppercase transition active:scale-90 disabled:opacity-40 min-w-[52px] sm:min-w-[68px] h-9 sm:h-12 text-xs sm:text-sm px-2"
      style={colorFor(status[k])}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 mt-4 select-none">
      <div className="flex gap-1 sm:gap-1.5 justify-center">{ROWS[0].map(letterBtn)}</div>
      <div className="flex gap-1 sm:gap-1.5 justify-center">{ROWS[1].map(letterBtn)}</div>
      <div className="flex gap-1 sm:gap-1.5 justify-center">
        {wideBtn("BACK", "⌫")}
        {ROWS[2].map(letterBtn)}
        {wideBtn("ENTER", "↵")}
      </div>
    </div>
  );
}