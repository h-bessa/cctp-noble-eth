import {useState} from 'react';
import depositForBurn from "src/services/depositForBurn.ts";

interface IDataDepositForBurn {
    txHash: {
        hash: string
        url: string
    };
    recipient: {
        address: string
        url: string
    };
    messageHash: string;
}

const useDepositForBurn = ({amount, address}: {
    amount: string | number,
    address: string | number

}) => {
    const [data, setData] = useState<IDataDepositForBurn | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const execute = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await depositForBurn(amount, address);
            setData(result as IDataDepositForBurn);
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false);
        }
    };

    return {execute, data, loading, error};
};

export default useDepositForBurn;
