import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {
  const { account, chainId, provider} = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, provider.getSigner(account));
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI, chainId, provider, account]) as T;
}
