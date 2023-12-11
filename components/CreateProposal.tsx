import type { Web3Provider } from "@ethersproject/providers";
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { VOTE_TOKEN_ADDRESS, GOVERNOR_ADDRESS, ENCODED_FUNCTION_CALL, VALUE } from '../constants';
import useTokenContract from '../hooks/useTokenContract';
import useGovernorContract from '../hooks/useGovernorContract';

const CreateProposal = () => {
  const governorContract = useGovernorContract(GOVERNOR_ADDRESS);

  const [proposal, createProposal] = useState({
    title: '',
    description: '',
  });


  function handleTitleChanges(e) {
    createProposal({
      ...proposal,
      title: e.target.value,
    });
  }

  function handleDescriptionChanges(e) {
    createProposal({
      ...proposal,
      description: e.target.value,
    });
  }

  async function handleProposalCreation() {
    try {
      const proposalDescription = proposal.title + proposal.description;
      await governorContract.propose([VOTE_TOKEN_ADDRESS], [VALUE], [ENCODED_FUNCTION_CALL], proposalDescription)
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  return (
    <>
      <label>
        Title:
        <input
          value={proposal.title}
          onChange={handleTitleChanges}
        />
      </label>
      <label>
        Description:
        <input
          value={proposal.description}
          onChange={handleDescriptionChanges}
        />
      </label>

      <button onClick={() => handleProposalCreation()}>Create Proposal</button>
    </>
  );
}

export default CreateProposal
