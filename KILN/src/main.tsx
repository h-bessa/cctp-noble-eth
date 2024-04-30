import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MetaMaskProvider } from "@metamask/sdk-react";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MetaMaskProvider
            debug={false}
            sdkOptions={{
                dappMetadata: {
                    name: "CCTP Noble Ethereum",
                    url: window.location.href,
                },
                infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY
            }}
        >
            <App/>
        </MetaMaskProvider>
    </React.StrictMode>,
)
