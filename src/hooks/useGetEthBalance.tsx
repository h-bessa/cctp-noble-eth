import {useEffect, useState} from "react";
import formatBalance from "src/helpers/formatBalance.ts";
import web3 from "src/helpers/web3provider.ts";

const useGetEthBalance = (address: string) => {
    const [balance, setBalance] = useState(0);

    async function getBalanceEth(address: string): Promise<number> {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        return formatBalance(balanceEth);
    }

    useEffect(() => {
        if (address) {
            const fetchBalance = async () => {
                const balanceEth = await getBalanceEth(address);
                setBalance(balanceEth);
            };
            fetchBalance();
        } else {
            setBalance(0);
        }
    }, [address]);

    return {balance};
};

export default useGetEthBalance;
