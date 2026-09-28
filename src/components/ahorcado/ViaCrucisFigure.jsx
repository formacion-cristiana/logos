import React from "react";

const STATIONS = [
  "Jesús condenado a muerte",
  "Jesús carga la cruz",
  "Jesús cae por primera vez",
  "Jesús encuentra a su Madre",
  "Simón ayuda a Jesús",
  "La Verónica limpia el rostro",
  "Jesús cae por segunda vez",
  "Jesús consuela a las mujeres",
  "Jesús cae por tercera vez",
  "Jesús es despojado de sus vestiduras",
  "Jesús es clavado en la cruz",
  "Jesús muere en la cruz",
  "Jesús es bajado de la cruz",
  "Jesús es sepultado"
];

// 12 vidas: el jugador queda eliminado al tachar la 12ª estación
// ("Jesús muere en la cruz"). Las estaciones 13-14 no se alcanzan en vida.
export const MAX_WRONG = 12;

export default function ViaCrucisFigure({ wrong }) {
  return (
    <ol className="text-xs space-y-1 max-h-72 overflow-auto pr-1">
      {STATIONS.map((s, i) => {
        const done = i < wrong;
        return (
          <li key={i} className="flex items-center gap-2">
            <span
              className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-bold"
              style={{
                background: done ? "#9b2c2c" : "#e8e0d6",
                color: done ? "#fff" : "#68645b"
              }}
            >
              {i + 1}
            </span>
            <span className={done ? "text-[#9b2c2c] font-semibold line-through" : "text-[#68645b]"}>
              {s}
            </span>
          </li>
        );
      })}
    </ol>
  );
}