# Formación Cristiana

Aplicación web de juegos y actividades de Formación Cristiana.

Está desarrollada con **React + Vite** y funciona como una aplicación web estática, sin cuentas de usuario, base de datos ni backend.

## Juegos

La aplicación incluye actualmente:

* YHWH (adivinar las palabras agregando vocales)
* LETRAS (Wordle)
* KAOS (Sopa de letras)
* CRUZADAS (Crucigrama)
* COSMOS (Categorizar)
* Crucificado (Ahorcado)

## Requisitos

* Node.js
* npm

## Instalación

Clonar el repositorio y entrar en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd logos
```

Instalar las dependencias:

```bash
npm install
```

## Desarrollo local

Para ejecutar la aplicación en la computadora:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173/
```

Abrir esa dirección en el navegador.

Para detener el servidor:

```text
Ctrl + C
```

## Compilar para producción

Para generar la versión que se publicará:

```bash
npm run build
```

Los archivos generados quedan en:

```text
dist/
```

## Vista previa de la compilación

Después de ejecutar `npm run build`, se puede probar la versión de producción localmente con:

```bash
npm run preview
```

Vite mostrará una dirección similar a:

```text
http://localhost:4173/
```

## Estructura

```text
logos/
├── public/          # Recursos públicos
├── src/             # Código fuente de la aplicación
│   ├── components/  # Componentes reutilizables
│   ├── pages/       # Páginas y juegos
│   └── ...
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Publicación

La aplicación está preparada para ser publicada como sitio estático mediante GitHub Pages.

El repositorio de GitHub es la fuente principal del código. Los cambios realizados en el repositorio pueden ser compilados y publicados mediante GitHub Actions.

## Licencia

Proyecto de Formación Cristiana.
