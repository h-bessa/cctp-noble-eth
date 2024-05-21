import Web3, {Bytes} from "web3";

const getHashFromBytes = (bytes: Bytes): string => {
    return Web3.utils.keccak256(bytes);
}

export default getHashFromBytes;