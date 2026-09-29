import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

console.log("=== VERSION DIAGNOSTICO TABLET 2026-09-29 ===");

document.body.insertAdjacentHTML(
  "afterbegin",
  `<div id="diagnostico-tablet" style="
    position:fixed;
    z-index:999999;
    top:0;
    left:0;
    right:0;
    padding:20px;
    background:white;
    color:red;
    font-family:monospace;
    font-size:18px;
  ">
    JAVASCRIPT CARGADO — DIAGNÓSTICO 2026-09-29
  </div>`
);

window.addEventListener('error', (event) => {
  document.body.innerHTML = `
    <div style="
      padding: 20px;
      font-family: monospace;
      white-space: pre-wrap;
      color: #900;
      background: #fff;
    ">
      <h2>ERROR JAVASCRIPT</h2>
      <p>${event.message}</p>
      <p>${event.filename || ''}:${event.lineno || ''}:${event.colno || ''}</p>
      <pre>${event.error?.stack || ''}</pre>
    </div>
  `
})

window.addEventListener('unhandledrejection', (event) => {
  document.body.innerHTML = `
    <div style="
      padding: 20px;
      font-family: monospace;
      white-space: pre-wrap;
      color: #900;
      background: #fff;
    ">
      <h2>ERROR JAVASCRIPT — PROMISE</h2>
      <pre>${event.reason?.stack || event.reason || ''}</pre>
    </div>
  `
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)