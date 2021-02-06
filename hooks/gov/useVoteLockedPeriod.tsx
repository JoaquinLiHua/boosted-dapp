import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { voteLockedPeriod } from "src/utils/governance";

export const useVoteLockedPeriod = () => {
  const [lockedPeriod, setLockedPeriod] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchLockedPeriod = useCallback(async () => {
    if (account) {
      const period = new BN(await voteLockedPeriod(ethereum, account));
      setLockedPeriod(period);
    }
  }, [ethereum, account]);

  useEffect(() => {
    if (ethereum) {
      fetchLockedPeriod();
      const refreshInterval = setInterval(fetchLockedPeriod, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, fetchLockedPeriod]);

  return lockedPeriod;
};
