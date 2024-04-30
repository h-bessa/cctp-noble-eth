import { fetch } from "bun";

type EthereumAddress = `0x${string}`;

type Resolver = (value: bigint | PromiseLike<bigint>) => void;

interface dataResponse {
    jsonrpc:string,
    id:number,
    result: string
}


let batch: EthereumAddress[] = [];
let resolvers: Resolver[] = [];
let timeoutId: NodeJS.Timeout | null = null;

function sendBatchRequest() {
    const currentBatch: EthereumAddress[] = [...batch];
    const currentResolvers: Resolver[] = [...resolvers];

    const requests = currentBatch.map((address, index) => ({
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: index
    }));

    console.log(`Sending one HTTP request for ${currentBatch.length} addresses`);

    fetch(`https://mainnet.infura.io/v3/f1b70935143f4b22b3c165d6bdfd3021`, {
        method: "POST",
        body: JSON.stringify(requests),
        headers: {"Content-Type": "application/json"}
    })
        .then(response => response.json())
        .then((data: dataResponse[]) => {
            if (Array.isArray(data)) {
                data.forEach((item: dataResponse) => {
                    const resolver = currentResolvers[item.id];
                    if (item.result) {
                        resolver(BigInt(item.result));
                    } else {
                        resolver(Promise.reject(new Error("No result found or error in response")));
                    }
                });
            }
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
            currentResolvers.forEach(resolve => resolve(Promise.reject(error)));
        });

    batch = [];
    resolvers = [];
    clearTimeout(timeoutId);
    timeoutId = null;
}

export function fetchBalance(address: EthereumAddress): Promise<bigint> {
    return new Promise<bigint>((resolve, reject) => {
        batch.push(address);
        resolvers.push(resolve);

        if (!timeoutId) {
            timeoutId = setTimeout(sendBatchRequest, 100);
        }
    });
}
