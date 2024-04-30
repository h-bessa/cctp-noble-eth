import Router from "./pages/Router.tsx";
import {EthContextProvider} from "src/contexts/EthContext.tsx";
import {NobleContextProvider} from "src/contexts/NobleContext.tsx";

function App() {
    return (
        <NobleContextProvider>
            <EthContextProvider>
                <Router/>
            </EthContextProvider>
        </NobleContextProvider>
    )
}

export default App
