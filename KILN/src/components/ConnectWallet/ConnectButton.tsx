import {getAddressAbbreviation} from "src/helpers/getAddressAbbreviation.ts";

interface ConnectButtonProps {
    logoSrc: string;
    label: string;
    isConnected: boolean;
    address: string;
    connectWallet: () => void;
}

const ConnectButton = ({logoSrc, label, isConnected, address, connectWallet}: ConnectButtonProps) => {
    return (
        <div className="ml-auto flex items-center">
            {isConnected ? (
                <>
          <span
              className="flex items-center text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 mr-2"
          >
            <img
                className="w-6 h-6 mr-2 align-middle"
                src={logoSrc}
                alt="Ethereum Logo"
            />
              {getAddressAbbreviation(address)}
          </span>
                </>
            ) : (
                <button
                    onClick={connectWallet}
                    className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-700 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    {label}
                </button>
            )}
        </div>
    );
}

export default ConnectButton;
