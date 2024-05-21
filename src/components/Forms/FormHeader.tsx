import {getAddressAbbreviation} from "src/helpers/getAddressAbbreviation.ts";
import formatBalance from "src/helpers/formatBalance.ts";

interface FormHeaderProps {
    address: string;
    balance: string;
    currency: string;

}

const FormHeader = ({
                        address,
                        balance,
                        currency
                    }: FormHeaderProps) => {

    return (
        <div className="flex justify-between items-center">
            <span className='text-white'>
                {address ? getAddressAbbreviation(address) : '0x000..0'}
            </span>
            <span className='text-white'>
                {`${formatBalance(balance)} ${currency}`}
            </span>
        </div>
    );
}

export default FormHeader;
