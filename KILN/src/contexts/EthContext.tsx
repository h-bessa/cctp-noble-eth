import {createContext, ReactNode, useEffect, useState} from "react";
import useGetEthBalance from "src/hooks/useGetEthBalance.tsx";
import {useSDK} from "@metamask/sdk-react";

const EthContext = createContext({
    ethState: {isConnected: false, address: '', balance: 0},
    connectEthWallet: () => {}
});

const initialEthState = {isConnected: false, address: '', balance: 0};

const EthContextProvider = ({children}: {
    children: ReactNode
}) => {
    const [ethState, setEthState] = useState(initialEthState);
    const {sdk, account} = useSDK();

    const connect = async (): Promise<void> => {
        try {
            const accounts = await sdk?.connect() as string[]
            setEthState({isConnected: true, address: accounts?.[0], balance: 0});
        } catch (err:any) {
            console.warn("failed to connect..", err);
        }
    };

    const {balance} = useGetEthBalance(account as string);

    const connectEthWallet = async (): Promise<void> => {
        return await connect();
    };

    useEffect(() => {
        if (account) {
            setEthState({isConnected: true, address: account, balance: balance});
        }
    }, [account, balance]);

    return (
        <EthContext.Provider value={{ethState, connectEthWallet}}>
            {children}
        </EthContext.Provider>
    );
};

export {EthContext, EthContextProvider};
