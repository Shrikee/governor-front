import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

export default function useETHBalance(address: string, suspense = false) {
  const { provider, chainId } = useWeb3React<Web3Provider>();

  const shouldFetch = typeof address === "string" && !!provider;

  const result = useSWR(
    shouldFetch ? ["ETHBalance", address, chainId] : null,
    ([, address]) => provider.getBalance(address),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result;
}
