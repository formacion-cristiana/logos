import React from "react";
import { Link } from "react-router-dom";

const LOGO_URL = "/images/logo-FC.png";
const TITULO_URL = "/images/logo-titulo.png";

export default function GameShell({ title, subtitle, children, rightControls }) {
  return (
    <div className="min-h-screen bg-[#95ACCF]">
      <header className="px-4 pt-4 pb-1 max-w-4xl mx-auto">
        <div className="relative text-center">

          <div className="flex-1 text-center">
          <a
            href="http://formacion-cristiana.github.io"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
          <img src={TITULO_URL} alt="Formación Cristiana" className=" rounded-md object-cover mb-9"  />
          </a>


<Link to="/" style={{ textDecoration: "none" }}>
  <h1 className="blueBotton m-0 tracking-[0.16em] text-xl sm:text-4xl">
    {title}
  </h1>
</Link>
            {subtitle && (
              <p className="mt-1 mb-3 text-[#3a3a36] text-xs sm:text-base">{subtitle}</p>
            )}
          </div>
          <div className="shrink-0 flex items-center gap-2 min-w-[36px]">{rightControls}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">{children}</main>
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <Link
          to="/"
          className="inline-block text-sm text-[#4a6fa5] hover:underline"
        >
          ⬅️ Volver al menú
        </Link>
      </div>
    </div>
  );
}