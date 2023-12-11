import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";
import { hooks, metaMask } from "../connectors/metaMask";
import { walletConnect } from "../connectors/wallet-connect";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { chainId, account } = useWeb3React();
  const active = hooks.useIsActive()

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (active) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, stopOnboarding]);

  const activateMetaMask = async () => {
    setConnecting(true);

    try {
      await metaMask.activate()
    } catch (error) {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      }
    };

    setConnecting(false)
  }

  const activateWalletConnect = async () => {
    setConnecting(true);

    try {
      await walletConnect.activate()
    } catch (error) {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      }
    };

    setConnecting(false)
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== "string") {
    return (
      <div>
        <p>{isWeb3Available ? (
          <button
            disabled={connecting}
            onClick={() => {
              activateMetaMask()
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}</p>
        <p>
          <button
            disabled={connecting}
            onClick={() => {
              activateWalletConnect()
            }}
          >
            {"Connect to Wallet Connect"}
          </button>
        </p>

      </div>
    );
  }

  return (
    <a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {`${shortenHex(account, 4)}`}
    </a>
  );
};

export default Account;
