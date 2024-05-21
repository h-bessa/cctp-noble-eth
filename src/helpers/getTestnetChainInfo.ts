
interface IChainInfo {
    chainId: string;
    chainName: string;
    rpc: string;
    features: string[];

}
const getTestnetChainInfo = (): IChainInfo => ({
    chainId: "grand-1",
    chainName: "Noble Testnet",
    rpc: "https://rpc.testnet.noble.strange.love",
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
})

export default getTestnetChainInfo
