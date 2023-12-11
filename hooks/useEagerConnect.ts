import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { metaMask, hooks } from "../connectors/metaMask";

export default function useEagerConnect() {
  const { account, isActivating, isActive } = useWeb3React();
  const { connectEagerly } = metaMask;
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!isActivating && !isActive) {
      connectEagerly().catch(() => {
        setTried(true);
      });
    } else {
      setTried(true);
    }
  }, [isActivating, isActive, connectEagerly]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && isActive) {
      setTried(true);
    }
  }, [tried, isActive]);

  return tried;
}
