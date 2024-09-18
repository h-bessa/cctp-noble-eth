import Router from "./pages/Router.tsx";
import {EthContextProvider} from "src/contexts/EthContext.tsx";
import {NobleContextProvider} from "src/contexts/NobleContext.tsx";
import {MetaMaskProvider} from "@metamask/sdk-react";

function App() {
    return (
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
            <NobleContextProvider>
                <EthContextProvider>
                    <Router/>
                </EthContextProvider>
            </NobleContextProvider>
        </MetaMaskProvider>

    )
}

export default App
