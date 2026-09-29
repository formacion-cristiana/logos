import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

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