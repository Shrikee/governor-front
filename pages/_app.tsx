import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import connectors from "../connectors";

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
