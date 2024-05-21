import { ethers } from "ethers";

export const getGenericContract = async (contractAddress: string, abi:Array<object>) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    return new ethers.Contract(contractAddress, abi, signer);

};
