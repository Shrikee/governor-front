import useGovernorContract from "./useGovernorContract"
import useSWR from "swr";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

export default function (address, suspense = false) {
    const governorContract = useGovernorContract(address)
    const filter = governorContract.filters.ProposalCreated()

    const res = useSWR(
        ["Events", address],
        () => governorContract.queryFilter(filter),
        {
            suspense,
        }
    );

    useKeepSWRDataLiveAsBlocksArrive(res.mutate);

    return res;
}