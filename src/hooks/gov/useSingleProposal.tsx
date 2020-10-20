import { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getSingleProposal } from "src/utils/governance";

export const useSingleProposal = (id: any) => {
  const [proposal, setProposal] = useState<any>(null);
  const { ethereum }: { ethereum: provider } = useWallet();

  const fetchSingleProposal = useCallback(async () => {
    const singleProposal = await getSingleProposal(ethereum, id);
    setProposal(singleProposal);
  }, [ethereum, id]);

  useEffect(() => {
    if (ethereum) {
      fetchSingleProposal();
    }
  }, [fetchSingleProposal, ethereum]);

  return proposal;
};
