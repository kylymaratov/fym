import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import RootContext from './context/RootContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootContext>
  </StrictMode>,
);
