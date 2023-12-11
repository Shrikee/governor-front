# Frontend for Proposal Governor contract
## Boilerplate forked from https://github.com/mirshko/next-web3-boilerplate
Implemented: create proposal, vote on proposal, list all proposals. Proposal list will be refreshed if a new proposal is created.
Uses metamask or other wallets which are supporting WalletConnect

## Installation
```bash
yarn
```
## _Before launching the app:_
Make sure that your wallet is connected to local rpc and contracts are deployed.
Import first private key from the list of local rpc to the wallet
Change constant ```GOVERNOR_ADDRESS``` located in ```./constants``` to deployed proposal governor address

## Launch:
```bash
npm run start
or
npm run dev
```

Connect wallet using the buttons in top right corner of the page