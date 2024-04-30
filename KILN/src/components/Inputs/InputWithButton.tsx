import {ChangeEvent} from "react";
import { InputHTMLAttributes} from "react";

interface InputWithButtonProps {
    type: string;
    value: string | number;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    buttonLabel?: string;
    onButtonClick: () => void;
    pattern?: string;
    inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

const InputWithButton = ({type, value, placeholder, onChange, buttonLabel, onButtonClick, inputMode, pattern}: InputWithButtonProps) => {

    return (
        <div className="relative">
            <input
                pattern={pattern}
                inputMode={inputMode}
                type={type}
                className={`form-input block w-full p-2 rounded-md border-gray-300 shadow-sm ${value !== '' && (isNaN(+value) || +value <= 0) ? 'border-red-500' : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {buttonLabel && buttonLabel?.length > 0 && (
                <button
                    type="button"
                    className="cursor-pointer absolute inset-y-0 right-0 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white text-xs font-medium rounded-r-md focus:outline-none focus:shadow-outline"
                    onClick={onButtonClick}
                >
                    {buttonLabel}
                </button>
            )}
        </div>
    );
};

export default InputWithButton;
