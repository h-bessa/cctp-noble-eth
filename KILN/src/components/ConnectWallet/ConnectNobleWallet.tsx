import {useContext} from "react";
import {NobleContext} from "src/contexts/NobleContext.tsx";
import ConnectButton from "src/components/ConnectWallet/ConnectButton.tsx";
import {NOBLE_LOGO_URL} from "src/constants/constants.ts";

const ConnectNobleWallet = () => {
    const { nobleState:{ isConnected, address}, connectNobleWallet } = useContext(NobleContext);

return (
    <ConnectButton
        label="Connect Noble Wallet"
        isConnected={isConnected}
        address={address}
        connectWallet={connectNobleWallet}
        logoSrc={NOBLE_LOGO_URL}
    />
);
}

export default ConnectNobleWallet;