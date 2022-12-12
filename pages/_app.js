import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers"
import { InjectedConnector } from '@web3-react/injected-connector'
import Home from '.';

const getLibrary = (provider) =>{
  return new Web3Provider(provider);
}

const MetaMask = new InjectedConnector({ supportedNetworks: [5] });
const connectors = { MetaMask };

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary} connectors={connectors}>
      <Component {...pageProps} />
    </Web3ReactProvider>
    )
}

export default MyApp
