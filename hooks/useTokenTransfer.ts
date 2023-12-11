import useSWR from "swr";
import useTokenContract from "./useTokenContract";

export default function useTokenTransfer(
  tokenAddress: string,
  amount: string,
  to: string,
) {
  const contract = useTokenContract(tokenAddress);

  return useSWR(["BlockNumber", to, amount], ([, to, amount]) => contract.transfer(to, amount));
}
