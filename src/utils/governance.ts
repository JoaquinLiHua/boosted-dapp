import Web3 from "web3";
import { provider } from "web3-core";
import { AbiItem } from "web3-utils";
import Governance from "../constants/abi/Governance.json";
import { governanceContract } from "src/constants/tokenAddresses";
import BN from "bignumber.js";

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    (Governance as unknown) as AbiItem,
    address
  );
  return contract;
};

export const proposals = async (provider: provider) => {
  const contract = getContract(provider, governanceContract);
  try {
    const proposalCount = await getProposalCount(provider);
    const proposals: any[] = [];
    for (let i = 0; i < proposalCount - 1; i++) {
      const proposal = await contract.methods.proposals(i).call();
      console.log(proposal);
      proposals.push(proposal);
    }
    return proposals;
  } catch (e) {
    return null;
  }
};

export const getProposalCount = async (provider: provider) => {
  const contract = getContract(provider, governanceContract);
  try {
    const count = await contract.methods.proposalCount().call();
    return count;
  } catch (e) {
    return null;
  }
};

export const submitProposal = async (provider: provider, values: any) => {
  const contract = getContract(provider, governanceContract);
  try {
    const count = await contract.methods.proposalCount().send({
      _url: values.url.toString(),
      _withdrawAmount: new BN(values.withdrawAmount),
      _withdrawAdresS: values.withdrawAddress.toString(),
    });
    return count;
  } catch (e) {
    return null;
  }
};

export const stakeForProposal = async (
  provider: provider,
  account: string,
  amount: string
) => {
  if (account) {
    const contract = getContract(provider, governanceContract);
    const web3 = new Web3(provider);
    const tokens = web3.utils.toWei(amount.toString(), "ether");
    const bntokens = web3.utils.toBN(tokens);
    return contract.methods
      .stake(bntokens)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } else {
    alert("wallet not connected");
  }
};

export const getStakedForProposalAmount = async (
  provider: provider,
  account: string,
  amount: string
) => {
  if (account) {
    const contract = getContract(provider, governanceContract);
    const web3 = new Web3(provider);
    const tokens = web3.utils.toWei(amount.toString(), "ether");
    const bntokens = web3.utils.toBN(tokens);
    return contract.methods
      .stake(bntokens)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log(tx);
        return tx.transactionHash;
      });
  } else {
    alert("wallet not connected");
  }
};
