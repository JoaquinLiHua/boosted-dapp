import { useCallback } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { approve } from "src/utils/erc20";

export const useApprove = (tokenContract: string, contractAddress: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(
        ethereum,
        tokenContract,
        contractAddress,
        account
      );
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, tokenContract, contractAddress, ethereum]);

  return {
    onApprove: handleApprove,
  };
};
