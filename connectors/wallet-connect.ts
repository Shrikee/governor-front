import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";
import { WalletConnect } from "@web3-react/walletconnect";
import { URLS } from "../constants";
import { initializeConnector } from "@web3-react/core";

const chainIds = () => {
  const keys = Object.keys(URLS);
  return keys.map((key) => Number(key));
};

export const [walletConnectV2, hooksV2] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        chains: chainIds(),
        projectId: "7f33267112f88e38919a778b6f05ad28",
        showQrModal: true,
        // rpcMap: URLS,
      },
    })
);
export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: URLS,
      },
    })
);
