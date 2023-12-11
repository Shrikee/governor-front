import useGovernorContract from "../hooks/useGovernorContract";
import useGovernorEvents from "../hooks/useGovernorEvents";
import { GOVERNOR_ADDRESS } from "../constants";

const Proposals = () => {
  const governorContract = useGovernorContract(GOVERNOR_ADDRESS);
  const { data, isLoading } = useGovernorEvents(GOVERNOR_ADDRESS);

  if (isLoading) return <div>loading...</div>;

  return (
    <table>
      <tr>
        <th>Event Name</th>
        <th>Proposal ID</th>
        <th>Proposal Description</th>
      </tr>
      {data.map(val => {
        return (
          <tr >
            <td>{val.event}</td>
            <td>{val.args[0].toString()}</td>
            <td>{JSON.stringify(val.args[8])}</td>
          </tr>
        )
      })}
    </table>
  );
};

export default Proposals;
