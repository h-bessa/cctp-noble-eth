import {InputHTMLAttributes} from "react";

const getInputPatternRules = (inputId: string): {
    numberPattern: string | undefined;
    numberInputMode: InputHTMLAttributes<HTMLInputElement>["inputMode"];
} => {
    if (!inputId) return {
        numberPattern: undefined,
        numberInputMode: 'text'
    };

    if (inputId === 'amount') return {
        numberPattern: '[0-9]*.?[0-9]+',
        numberInputMode: 'decimal'
    };

    return {
        numberPattern: undefined,
        numberInputMode: 'text'
    };
};

export default getInputPatternRules;
