import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';

createRoot(document.getElementById('root')!).render(
  <div className="min-h-screen text-gray-800 antialiased bg-gray-100">
    <StrictMode>
      <App />
      </StrictMode>,
      </div>
      )

