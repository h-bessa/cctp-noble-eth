import MintForm from "src/components/Forms/MintForm.tsx";
import BurnForm from "src/components/Forms/BurnForm.tsx";
import { useState} from "react";

const Main = () => {
    const [txHash, setTxHash] = useState<string>('');

    return (
        <div className="flex justify-around">
            <BurnForm setTxHash={setTxHash}/>
            <MintForm txHash={txHash}/>
        </div>

    )
}

export default Main