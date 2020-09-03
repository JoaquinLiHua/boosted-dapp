import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { submitProposal } from "src/utils/governance";

const useSubmitProposal = () => {
  const { ethereum }: { ethereum: provider } = useWallet();

  const handleSubmitProposal = useCallback(
    async (values) => {
      try {
        const tx = await submitProposal(ethereum, values);
        return tx;
      } catch (e) {
        return false;
      }
    },
    [ethereum]
  );

  return { onSubmitProposal: (values) => handleSubmitProposal(values) };
};

export default useSubmitProposal;
