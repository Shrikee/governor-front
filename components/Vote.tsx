import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import useGovernorContract from '../hooks/useGovernorContract';
import { GOVERNOR_ADDRESS } from '../constants';

const Vote = () => {
  const { account } = useWeb3React()
  const governorContract = useGovernorContract(GOVERNOR_ADDRESS);

  const [vote, setVote] = useState({
    proposalId: '',
    voteType: '0',
  });


  function handleVoteProposalIdChange(e) {
    setVote({
      ...vote,
      proposalId: e.target.value
    });
  }

  function handleVoteVoteTypeChange(e) {
    setVote({
      ...vote,
      voteType: e.target.value
    });
  }

  async function handleVote() {
    try {
      await governorContract.castVote(vote.proposalId, vote.voteType)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <>
      <label>
        Proposal Id:
        <input
          value={vote.proposalId}
          onChange={handleVoteProposalIdChange}
        />
      </label>
      <label>
        Vote type [ 0 = Against, 1 = For, 2 = Abstain ]:
        <input
          value={vote.voteType}
          onChange={handleVoteVoteTypeChange}
        />
      </label>
      <button onClick={() => handleVote()}>Vote</button>
    </>
  );
}

export default Vote
