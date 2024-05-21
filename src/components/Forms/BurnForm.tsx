import {SyntheticEvent, useContext, useEffect, useState} from "react";
import FormHeader from "./FormHeader";
import InputWithButton from "src/components/Inputs/InputWithButton.tsx";
import {EthContext} from "src/contexts/EthContext.tsx";
import {NobleContext} from "src/contexts/NobleContext.tsx";
import SubmitButtonForm from "src/components/Forms/SubmitButtonForm.tsx";
import formatBalance from "src/helpers/formatBalance.ts";
import {BurnFormData} from "src/types/Forms.ts";
import useDepositForBurn from "src/hooks/useDepositForBurn.tsx";
import getInputPatternRules from "src/helpers/getInputPatternRules.ts";

const BurnForm = ({
                      setTxHash,
                  }: {
        setTxHash: (txHash: string) => void
    }) => {
        const {ethState: {address: ethAddress}} = useContext(EthContext);
        const {nobleState: {address: nobleAddress, balance: nobleBalance}} = useContext(NobleContext);

        const [burnButtonClicked, setBurnButtonClicked] = useState(false);
        const [formData, setFormData] = useState<BurnFormData>([
            {
                id: 'amount',
                type: 'text',
                value: '',
                placeholder: "Mint amount",
                buttonLabel: "ADD MAX",
                innerButtonValue: '',
            },
            {
                id: 'ethAddress',
                type: 'text',
                value: '',
                placeholder: "ETH recipient address",
                buttonLabel: "COPY FROM WALLET",
                innerButtonValue: '',
            }
        ]);
        const {execute, data, loading, error} = useDepositForBurn({amount: formData[0].value, address: formData[1].value});
        const [errorDuringDeposit, setErrorDuringDeposit] = useState(Boolean(error));


        const isFormValid = formData.every((input) => input.value !== '');

        const handleUpdateForm = (key: string, value: string, isInnerButtonClick = false) => {
            let updatedValue: string | number = value;

            if (key === "ethAddress" && isInnerButtonClick) {
                updatedValue = ethAddress || '';
            } else if (key === "amount" && isInnerButtonClick) {
                updatedValue = formatBalance(nobleBalance?.toString()) || 0;
            }
            setFormData((prevFormData) => (
                prevFormData.map((input) =>
                    input.id === key ? {...input, value: updatedValue} : input
                )
            ));
        };

        const handleSubmit = async (event: SyntheticEvent) => {
            event.preventDefault();
            setBurnButtonClicked(true);
            await execute();
            if (error) {
                console.error('Error during deposit:', error);
            } else {
                console.log('Burn successful');
            }
        };

        useEffect(() => {
            if (data && data?.txHash?.hash) {
                setTxHash(data?.txHash?.hash)
            } else if (error){
                setErrorDuringDeposit(true);
            }
        }, [data, error]);

        return (
            <div>
                <FormHeader address={nobleAddress} balance={nobleBalance?.toString()} currency={'USDC'}/>
                <div className="text-center p-6 border-2 border-gray-300 shadow-md rounded-lg min-w-[400px]">
                <span className="font-regular text-white">
                    1. Burn USDC on Noble
                </span>

                    <form className="flex flex-col h-full min-h-96 justify-between pt-8 pb-8"
                          onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-8">
                            {formData.map(input => (
                                <InputWithButton
                                    pattern={getInputPatternRules(input.id).numberPattern}
                                    inputMode={getInputPatternRules(input.id).numberInputMode}
                                    key={input.id}
                                    type={input.type}
                                    value={input.value}
                                    placeholder={input.placeholder}
                                    onChange={(event) => handleUpdateForm(input.id, event.target.value, false)}
                                    buttonLabel={input.buttonLabel}
                                    onButtonClick={() => handleUpdateForm(input.id, input.innerButtonValue, true)}
                                />
                            ))}
                        </div>
                        {!errorDuringDeposit && data && (
                            <>
                                <div className="flex flex-col space-y-3 justify-center cursor-pointer">
                                    <a
                                        href={data?.txHash?.url || ''}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View transaction on Noble
                                    </a>
                                </div>
                            </>
                        )}
                        <SubmitButtonForm
                            isFormValid={isFormValid}
                            label={'BURN'}
                            loading={loading}
                            success={!errorDuringDeposit && !loading}
                            buttonClicked={burnButtonClicked}
                        />
                    </form>
                </div>
            </div>
        )
    }
;

export default BurnForm;
