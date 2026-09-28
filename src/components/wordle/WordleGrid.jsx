import React from "react";
import { ampersandAfter } from "@/lib/wordle";

const STATUS_STYLE = {
  green: { background: "#236b3b", color: "#fff", borderColor: "#236b3b" },
  yellow: { background: "#d9a441", color: "#fff", borderColor: "#d9a441" },
  gray: { background: "#9aa0a6", color: "#fff", borderColor: "#9aa0a6" },
  empty: { background: "#fffdf8", color: "#1d1d1b", borderColor: "#b8b2a4" },
  revealed: { background: "#eef2f8", color: "#1d1d1b", borderColor: "#4a6fa5" }
};

function Cell({ ch, status, selected, onClick }) {
  const style = STATUS_STYLE[status] || STATUS_STYLE.empty;
  return (
    <button
      onClick={onClick}
      className="rounded-md border-2 font-bold uppercase transition active:scale-95 w-7 h-9 sm:w-10 sm:h-12 text-base sm:text-lg"
      style={{
        ...style,
        outline: selected ? "3px solid #4a6fa5" : undefined,
        outlineOffset: selected ? "1px" : undefined,
        cursor: onClick ? "pointer" : "default"
      }}
    >
      {ch || ""}
    </button>
  );
}

function Amp() {
  return <div className="flex items-center justify-center px-0.5 sm:px-1 text-lg sm:text-xl font-bold text-[#4a6fa5]">&</div>;
}

function Row({ letters, ampSet, cells }) {
  const items = [];
  for (let i = 0; i < letters.length; i++) {
    const c = cells[i];
    items.push(
      <Cell
        key={i}
        ch={c.ch ?? ""}
        status={c.status ?? "empty"}
        selected={c.selected}
        onClick={c.onClick}
      />
    );
    if (ampSet.has(i)) items.push(<Amp key={`amp-${i}`} />);
  }
  return <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">{items}</div>;
}

export default function WordleGrid({
  letters,
  segLens,
  rows,
  activeInput,
  revealed,
  selectedCell,
  onSelectCell,
  failed,
  solved,
  maxRows
}) {
  const ampSet = ampersandAfter(segLens || []);

  const rowEls = [];
  for (let r = 0; r < maxRows; r++) {
    if (r < rows.length) {
      const row = rows[r];
      const cells = letters.map((_, i) => ({ ch: row.input[i], status: row.status[i] }));
      rowEls.push(<Row key={r} letters={letters} ampSet={ampSet} cells={cells} />);
    } else if (r === rows.length && !failed && !solved) {
      const cells = letters.map((ch, i) => {
        if (revealed.has(i)) return { ch, status: "revealed" };
        return {
          ch: activeInput[i] || "",
          status: "empty",
          selected: selectedCell === i,
          onClick: () => onSelectCell(i)
        };
      });
      rowEls.push(<Row key={r} letters={letters} ampSet={ampSet} cells={cells} />);
    } else {
      const cells = letters.map((ch, i) =>
        revealed.has(i) ? { ch, status: "revealed" } : { ch: "", status: "empty" }
      );
      rowEls.push(
        <div key={r} className="opacity-40">
          <Row letters={letters} ampSet={ampSet} cells={cells} />
        </div>
      );
    }
  }

  if (failed) {
    const cells = letters.map((ch) => ({ ch, status: "green" }));
    rowEls.push(
      <div key="reveal" className="mt-2">
        <Row letters={letters} ampSet={ampSet} cells={cells} />
      </div>
    );
  }

  return <div className="flex flex-col gap-1 sm:gap-1.5">{rowEls}</div>;
}