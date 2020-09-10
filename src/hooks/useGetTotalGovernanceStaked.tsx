import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTotalStaked } from "../utils/governance";

export const useGetTotalGovernanceStaked = () => {
  const [staked, setStaked] = useState(new BN(0));
  const { ethereum }: { ethereum: provider } = useWallet();

  const fetchStaked = useCallback(async () => {
    const staked = await getTotalStaked(ethereum);
    setStaked(new BN(staked));
  }, [getTotalStaked, ethereum]);

  useEffect(() => {
    if (ethereum) {
      fetchStaked();
      const refreshInterval = setInterval(fetchStaked, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, setStaked, fetchStaked]);

  return staked;
};
