import {fetchBalance} from './fetchBalance';

const addresses = [
    "0xF7B31119c2682c88d88D455dBb9d5932c65Cf1bE",
    "0x3CBdeD43EFdAf0FC77b9C55F6fC9988fCC9b757d",
    "0x53b6936513e738f44FB50d2b9476730C0Ab3Bfc1",
    "0x72a5843cc08275C8171E582972Aa4fDa8C397B2A",
    "0x1da5821544e25c636c1417Ba96Ade4Cf6D2f9B5A"
] as const;


const balancesInEth = (balances: bigint[]) => {
    return balances.map(balance => Number(balance) / 1000000000000000000);
}

const getBalances = async () => {
    // SEND 1 HTTP REQUEST
    const balances = await Promise.all(addresses.map(fetchBalance));
    console.log(balancesInEth(balances));

    // SEND 3 HTTP REQUESTS
    // const balances = await Promise.all(addresses.map(fetchBalance));
    // console.log(balancesInEth(balances));
    // const balances_2 = await Promise.all(addresses.map(fetchBalance));
    // console.log(balancesInEth(balances_2));
    // const balances_3 = await Promise.all([...addresses.map(fetchBalance), ...addresses.map(fetchBalance)]);
    // console.log(balancesInEth(balances_3));
}

getBalances();


