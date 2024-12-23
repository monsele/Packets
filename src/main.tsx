import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WagmiProvider from "./Providers/WagmiProvider";
import ReactQueryProvider from "./Providers/ReactQueryProvider";
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <WagmiProvider>
        <App />
      </WagmiProvider>
    </ReactQueryProvider>
  </StrictMode>
);
