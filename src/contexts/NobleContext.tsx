import {createContext, ReactNode, useState} from "react";
import getTestnetChainInfo from "src/helpers/getTestnetChainInfo";
import {SigningStargateClient} from "@cosmjs/stargate";
import {Coin, Keplr} from "@keplr-wallet/types";

const NobleContext = createContext({
    nobleState: {isConnected: false, address: '', balance: 0},
    connectNobleWallet: () => {}
});

const initialNobleState = {isConnected: false, address: '', balance: 0};

const NobleContextProvider = ({children}: {
    children: ReactNode;
}) => {
    const [nobleState, setNobleState] = useState(initialNobleState);

    const connectNobleWallet = async (): Promise<void> => {
        const keplr: Keplr | undefined = window.keplr;

        if (!keplr) {
            alert("You need to install or unlock Keplr");
            return;
        }

        await keplr.enable(getTestnetChainInfo().chainId);
        const offlineSigner = keplr.getOfflineSigner(getTestnetChainInfo().chainId);
        const accounts = await offlineSigner.getAccounts();
        const account = accounts[0];
        const signingClient = await SigningStargateClient.connectWithSigner(
            getTestnetChainInfo().rpc,
            offlineSigner,
        )

        const getBalance = async (): Promise<Coin> => {
            return await signingClient.getBalance(account.address, 'uusdc');
        }
        const balance: Coin = await getBalance();
        const formatBalance: number = parseFloat(balance.amount) / 1e6;

        setNobleState({isConnected: true, address: account.address, balance: formatBalance});
    };

    return (
        <NobleContext.Provider value={{nobleState, connectNobleWallet}}>
            {children}
        </NobleContext.Provider>
    );
};

export {NobleContext, NobleContextProvider};
