
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SignUpProvider } from './contexts/SignUpContext.tsx'

createRoot(document.getElementById("root")!).render(
  <SignUpProvider>
    <App />
  </SignUpProvider>
);
