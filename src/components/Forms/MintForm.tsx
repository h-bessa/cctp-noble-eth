import {SyntheticEvent, useContext, useEffect, useState} from "react";
import FormHeader from "./FormHeader";
import InputWithButton from "src/components/Inputs/InputWithButton.tsx";
import {EthContext} from "src/contexts/EthContext.tsx";
import SubmitButtonForm from "src/components/Forms/SubmitButtonForm.tsx";
import {MintFormData} from "src/types/Forms.ts";
import fetchAttestation from "src/helpers/fetchAttestation.ts";
import {getGenericContract} from "src/helpers/getGenericContract.ts";
import contractABI from "src/services/contractABI.ts";



const initialFormState = [
    {
        id: 'txHash',
        type: 'text',
        value: '',
        placeholder: "burn tx hash",
        buttonLabel: "",
        maxValue: '',
    },
    {
        id: 'attestation',
        type: 'text',
        value: '',
        placeholder: "attestation hash - status",
        buttonLabel: "GET",
    }
]
const MintForm = ({
                      txHash
                  }: {
    txHash: string
}) => {
    const {ethState: {address: ethAddress, balance: ethBalance}} = useContext(EthContext);
    const [txEthHash, setTxEthHash] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [mintButtonClicked, setMintButtonClicked] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);

    const [formData, setFormData] = useState<MintFormData>(initialFormState);

    const isFormValid = formData.every((input) => input.value !== '') &&
        formData.some(input => input.id === 'attestation' && input.value?.toString().startsWith('0x'));


    const handleUpdateForm = async (key: string, value: string | number, isButtonClick = false) => {
        let updatedValue: string | number = value;

        const burnTxHash = formData[0].value as string;

        if (key === "attestation" && isButtonClick) {
            const attestationData = await fetchAttestation(txHash || burnTxHash);
            if (typeof attestationData !== 'string') {
                updatedValue = attestationData?.attestation
                setMessage(attestationData?.message)
            } else {
                updatedValue = attestationData as string;
            }
        }

        setFormData((prevFormData) => (
            prevFormData.map((input) =>
                input.id === key ? {...input, value: updatedValue} : input
            )
        ));
    };

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setMintButtonClicked(true);
        const attestation = formData.find((input) => input.id === 'attestation')?.value as string;
        try {
            setLoading(true)
            const contract = await getGenericContract(import.meta.env.VITE_CONTRACT_ADDRESS, contractABI);
            const signer = contract.signer;
            const nonce = await signer.getTransactionCount();
            const claimeAssets = await contract.receiveMessage(message, attestation, {
                gasLimit: 100000,
                nonce: nonce
            });
            setTxEthHash(claimeAssets.hash);
            if (claimeAssets) {
                setLoading(false);
            }
            return claimeAssets;
        } catch (error: any) {
            setError(true);
            console.error('Transaction Failed:', error);
            if (error.reason) {
                console.error('Failure Reason:', error.reason);
            }
            if (error.transactionHash) {
                console.error('Transaction Hash:', error.transactionHash);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (txHash) {
            handleUpdateForm('amount', txHash, true);
        }
    }, [txHash]);

    return (
        <div>
            <FormHeader address={ethAddress} balance={ethBalance.toString()} currency={'ETH'}/>
            <div className="text-center p-6 border-2 border-gray-300 shadow-md rounded-lg min-w-[400px]">
            <span className="font-regular text-white">
                 2. Mint USDC on Ethereum
            </span>

                <form className="flex flex-col h-full min-h-96 justify-between pt-8 pb-8"
                      onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-8">
                        {formData.map(input => (
                            <InputWithButton
                                key={input.id}
                                type={input.type}
                                value={input.value}
                                placeholder={input.placeholder}
                                buttonLabel={input.buttonLabel}
                                onChange={(event) => handleUpdateForm(input.id, event.target.value)}
                                onButtonClick={() => handleUpdateForm(input.id, input.value, true)}
                            />
                        ))}
                    </div>
                    {txEthHash && (
                        <>
                            <div className="flex flex-col space-y-3 justify-center cursor-pointer">
                                <a
                                    href={`https://sepolia.etherscan.io/tx/${txEthHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View transaction on Ethereum Sepolia
                                </a>
                            </div>
                        </>
                    )}
                    <SubmitButtonForm isFormValid={isFormValid} label={'MINT'} loading={loading} success={!error}
                                      buttonClicked={mintButtonClicked}/>
                </form>
            </div>
        </div>
    )
};

export default MintForm;
