interface BaseFormData {
    id: string;
    type: string;
    value: string | number
    placeholder: string;
}
interface IBurnFormData extends BaseFormData {
    maxValue?: string;
    buttonLabel: string;
    innerButtonValue: string;
}



interface IMintFormData extends BaseFormData {
    maxValue?: string;
    buttonLabel?: string;
}


export type BurnFormData = IBurnFormData[];

export type MintFormData = IMintFormData[];
