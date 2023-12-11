import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

export default function useBlockNumber() {
  const { provider } = useWeb3React<Web3Provider>();
  const shouldFetch = !!provider;

  return useSWR(
    shouldFetch ? ["BlockNumber"] : null,
    () => provider.getBlockNumber(),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
