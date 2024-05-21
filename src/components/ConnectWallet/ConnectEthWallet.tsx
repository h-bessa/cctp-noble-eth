import { useContext } from "react";
import { EthContext } from "src/contexts/EthContext.tsx";
import ConnectButton from "src/components/ConnectWallet/ConnectButton.tsx";
import {ETH_LOGO_URL} from "src/constants/constants.ts";

const ConnectEthWallet = () => {
    const { ethState:{ isConnected, address}, connectEthWallet} = useContext(EthContext);

    return (
        <ConnectButton
            label="Connect Eth Wallet"
            isConnected={isConnected}
            address={address}
            connectWallet={connectEthWallet}
            logoSrc={ETH_LOGO_URL}
        />
    )
};

export default ConnectEthWallet;
