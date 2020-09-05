import { useCallback, useEffect, useState } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { proposals as getProposals } from "src/utils/governance";

const useProposals = () => {
  const [proposals, setProposals] = useState<any[] | null>(null);
  const { ethereum }: { account: any; ethereum: provider } = useWallet();

  const fetchproposals = useCallback(async () => {
    const proposals = await getProposals(ethereum);
    setProposals(proposals);
  }, [ethereum]);

  useEffect(() => {
    fetchproposals();
  }, [fetchproposals]);

  return proposals;
};

export default useProposals;
