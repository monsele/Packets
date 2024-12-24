import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WagmiProvider from "./Providers/WagmiProvider";
import ReactQueryProvider from "./Providers/ReactQueryProvider";
import App from './App.tsx';
import './index.css';

import { Toaster } from "sonner";
  
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <WagmiProvider>
        <Toaster richColors expand={true} />
        <App />
      </WagmiProvider>
    </ReactQueryProvider>
  </StrictMode>
);
