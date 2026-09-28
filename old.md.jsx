
const GAMES = [
  { key: "yhwh", title: "YHWH ✡️", desc: "ADIVINÁ palabras agregando vocales.", to: "https://formacion-cristiana.github.io/yhwh", ready: true ,    external: true},
  { key: "wordle", title: "LOGOS 🟢🟡🔴", desc: "ADIVINÁ palabras letra por letra.", to: "/wordle", ready: true },
  { key: "crucigrama", title: "CRUZADAS ⚔️", desc: "ADIVINÁ palabras entrelazadas.", to: "/crucigrama", ready: true },
  { key: "ahorcado", title: "CRUCIFICADO ✝️", desc: "ADIVINÁ la mayor cantidad de palabras antes de completar el Vía Crucis.", to: "/ahorcado", ready: true },
  { key: "sopa", title: "KAOS 🌊", desc: "ENCONTRÁ palabras escondidas en el MAR de letras.", to: "/sopa", ready: true },
  { key: "categorizar", title: "KOSMOS ⚛️", desc: "ORDENÁ palabras en categorías y subcategorías", to: "/categorizar", ready: true }
];

  const mtitle = "LOGOS "
  const msubtitle = "ADIVINÁ palabras iterativamente, letra por letra. 🟢🟡🔴"
  const mrule = "Adiviná las palabras en menos de 6 intentos. <p>Elige un casillero y escribe.</p>🟢Verde: acertaste letra y posición. 🟡Amarillo: acertaste letra, otra posición. 🔴Rojo: la letra no se usa."
  
## cambios
- saque el logo chico
  <img src={LOGO_URL} alt="FC" className="h-9 w-9 rounded-md object-cover" />


- saqué el boton play
<span className="inline-block mt-3 text-[#4a6fa5] font-semibold text-sm">Jugar ▶️</span>


## Games

Antes estaba esto:
        <div className="flex items-center justify-between gap-3">

          <div className="flex-1 text-center">
          <a
            href="http://formacion-cristiana.github.io"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
          <img src={TITULO_URL} alt="Formación Cristiana" className=" rounded-md object-cover mb-9"  />
          </a>


            <h1 className="m-0 tracking-[0.16em] text-xl sm:text-4xl font-bold text-[#1d1d1b]">
              {title}
            </h1>

Tengo esto:

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