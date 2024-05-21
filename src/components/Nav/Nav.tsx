import { Link } from 'react-router-dom'
import logo from 'src/assets/logo.svg'
import ConnectEthWallet from "src/components/ConnectWallet/ConnectEthWallet.tsx";
import ConnectNobleWallet from "src/components/ConnectWallet/ConnectNobleWallet.tsx";

function Nav() {
    return (
        <nav className="flex w-full items-center p-6 justify-between">
            <div className="flex items-center">
                <Link className="flex items-center" to="/">
                    <img className="h-12 spin" src={logo} alt="logo"/>
                    <span className="ml-4 text-2xl font-semibold text-white">
                      CCTP Noble - Ethereum
                    </span>
                </Link>
            </div>
            <div className="flex space-x-8 items-center">
                <ConnectNobleWallet/>
                <ConnectEthWallet/>
            </div>
        </nav>
    )
}

export default Nav
