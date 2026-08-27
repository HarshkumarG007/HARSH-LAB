import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Dynamically import the Adversarial Critic only in dev mode
const AdversarialHUD = import.meta.env.DEV 
  ? React.lazy(() => import('./dev/AdversarialHUD')) 
  : () => null

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {import.meta.env.DEV && (
      <React.Suspense fallback={null}>
        <AdversarialHUD />
      </React.Suspense>
    )}
    <App />
  </React.StrictMode>,
)
