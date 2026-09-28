
## Restante de la última vez
* Wordle: 
- importé SolvedPanel (faltó cerrar el <div> del panel — quedó a medio aplicar).
Pendiente:
- Terminar SolvedPanel en Wordle (cerrar el div extra) y sumarlo a los demás juegos.


## General
- Que el número de rondas indicado por NRondas de la casilla de configuración, se revele una pista.
- Mostrar el boton de info (reglas), config e idiomas incluso durante la partida

- el header en GameShell no está alineado con la parte de abajo, esta descentrado, la izquierda mas chica que la derecha
### Cambios que hice en Home
    <GameShell title="PURAS PALABRAS" subtitle="Juegos de 1 o más jugadores para construir un glosario Cristiano">
    <div className="text-center text-l font-bold text-[#1d1d1b]">
                     🎲   ·   ADIVINÁ · ENCONTRÁ    ·  🧩🕹️    ·  ORDENÁ · AGRUPÁ  ·   🎳🥇   ·   COMPETÍ ·   DESAFIÁ  · 🎯 
    </div>

### Cambios en App.jsx
<Router basename={import.meta.env.BASE_URL}>

### GameShell.jsx
import { SITE_TITLE,GIT_URL } from "../config/siteConfig.js";

const LOGO_URL = "/images/logo-FC.png";
const TITULO_URL = "/images/logo-titulo.png";

export default function GameShell({ title, subtitle, children, rightControls }) {
  return (
    <div className="min-h-screen bg-[#95ACCF]">
      <header className="px-4 pt-4 pb-1 max-w-4xl mx-auto">
        <div className="relative text-center">

          <div className="flex-1 text-center">
          <a
            href={GIT_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
          <img src={import.meta.env.BASE_URL +TITULO_URL} alt="Formación Cristiana" className=" rounded-md object-cover mb-9"  />
          </a>

          
### Glosarios
- diseño inicial como presentado en los primeros archivos adjuntos (index.html, app.js.md): con letra inicial, botón "volver arriba" y separador (manteniendo 3 columnas).
- Las categorías que solo se diferencian por un par de corchetes se consideran la misma categoría

### Glosario de TAGS

#### Glosario de PALABRAS
sacar los nombres

### IDIOMAS

- hacer andar el italiano

### CONFIG
- Tags van fuera del config, se muestran arriba de las categorías siempre.

### REGLAS
- agregar las reglas de juego

#### Rondas

##### Ronda primaria
- La ronda primaria sigue el contador de palabras reveladas, i.e. sigue el jugador principal.
- Cuando se completa una ronda primaria se revela una palabra

##### Ronda secundaria
- Si el jugador principal se le acaba el tiempo, comienza la Ronda secundaria hasta que alguien adivine la palabra
- Cuando se completa una ronda secundaria se revela una pista


## PISTAS
Crucigrama: una letra cualquiera



## WORDLE
- Usar colores verde, amarillo, rojo. 
- Falta el rojo cuando una letra no va, ahora esta en gris.
- Cambiarla forma en que se da puntaje. sumar 3 puntos por cada letra verde (posición correcta. No incluye las letras reveladas, y solo se suma una vez cada letra correcta acertada: i.e. solo hay un máximo de 6x3 = 18 puntos.). sumar un punto por cada letra amarilla. 

### cambios Wordle.jsx
  const mtitle = "LETRAS 🟢🟡🔴"
  const msubtitle = "ADIVINÁ palabras iterativamente, letra por letra. Cada acierto, cada error es un paso a descubrir el misterio"
  const mrule = "Adiviná las palabras en menos de 6 intentos. <p>Elige un casillero y escribe.</p>🟢Verde: acertaste letra y posición. 🟡Amarillo: acertaste letra, otra posición. 🔴Rojo: la letra no se usa."

## CRUCIGRAMA
Falta: botón "Revelar pista" + imprimir pistas agrupadas por categoría.

Solo dos jugadores. Uno juega con las palabras horizontales. Otro con las verticales.

