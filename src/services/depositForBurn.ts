/*
 * Copyright (c) 2024, Circle Internet Financial LTD All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {DirectSecp256k1HdWallet, GeneratedType, Registry} from "@cosmjs/proto-signing";
import {SigningStargateClient} from "@cosmjs/stargate";
import {MsgDepositForBurn} from "./generated/tx";
import getBytesFromMessageSent from "src/helpers/getBytesFromMessageSent.ts";
import getHashFromBytes from "src/helpers/getHashFromBytes.ts";


export const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn],
];

function createDefaultRegistry(): Registry {
    return new Registry(cctpTypes)
}

export function hexToUint8Array(hexString) {
    if (hexString.length % 2 !== 0) {
        throw "La chaîne hexadécimale doit avoir une longueur paire";
    }

    const arrayBuffer = new Uint8Array(hexString.length / 2);

    for (let i = 0; i < hexString.length; i += 2) {
        const byteValue = parseInt(hexString.substring(i, i + 2), 16);
        arrayBuffer[i / 2] = byteValue;
    }

    return arrayBuffer;
}


const depositeForBurn = async (amount, address) => {

    const mnemonic = import.meta.env.VITE_MNEMONIC_KEPLR ? import.meta.env.VITE_MNEMONIC_KEPLR : "";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        mnemonic,
        {
            prefix: "noble"
        }
    );

    const [account] = await wallet.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(
        "https://rpc.testnet.noble.strange.love",
        wallet,
        {
            registry: createDefaultRegistry()
        }
    );
    const rawMintRecipient = address;
    const cleanedMintRecipient = rawMintRecipient.replace(/^0x/, '');
    const zeroesNeeded = 64 - cleanedMintRecipient.length;
    const mintRecipient = '0'.repeat(zeroesNeeded) + cleanedMintRecipient;
    const mintRecipientBytes = hexToUint8Array(mintRecipient);


    const msg = {
        typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
        value: {
            from: account.address,
            amount: parseInt(amount).toString(),
            destinationDomain: 0,
            mintRecipient: mintRecipientBytes,
            burnToken: "uusdc",
        }
    };

    const fee = {
        amount: [
            {
                denom: "uusdc",
                amount: "0",
            },
        ],
        gas: "200000",
    };
    const memo = "";

    try {
        const result = await client.signAndBroadcast(
            account.address,
            [msg],
            fee,
            memo
        );

        console.log(`Burned on Noble: https://mintscan.io/noble-testnet/tx/${result.transactionHash}`);
        console.log(`Minting on Ethereum to https://sepolia.etherscan.io/address/${rawMintRecipient}`);

        const events = result.events
        const bytesFromMessageSent = getBytesFromMessageSent(events, 'circle.cctp.v1.MessageSent');
        const messageHash = getHashFromBytes(bytesFromMessageSent);
        console.log(`Message Hash: ${messageHash}`);

        return {
            txHash: {
                hash: result.transactionHash,
                url: `https://mintscan.io/noble-testnet/tx/${result.transactionHash}`
            },
            recipient: {
                address: rawMintRecipient,
                url: `https://sepolia.etherscan.io/address/${rawMintRecipient}`
            },
            messageHash: messageHash
        }

    } catch (error: any) {
        console.error("Error extracting message hash:", error);
        return error
    }

    return null

}


export default depositeForBurn

