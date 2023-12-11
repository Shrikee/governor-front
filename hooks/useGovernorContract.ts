import GOVERNOR from "../contracts/ProposalGovernor.json"
import type { ProposalGovernor } from "../contracts/types";
import useContract from "./useContract";

export default function useGovernorContract(governorAddress?: string) {
  return useContract<ProposalGovernor>(governorAddress, GOVERNOR.abi);
}
