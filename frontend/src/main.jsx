import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)