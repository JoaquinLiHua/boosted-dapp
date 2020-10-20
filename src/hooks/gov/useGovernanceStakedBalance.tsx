import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getStaked } from "src/utils/governance";

export const useGovernanceStakedBalance = () => {
  const [balance, setBalance] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalance = useCallback(async () => {
    if (account) {
      const balance = await getStaked(ethereum, account);
      setBalance(new BN(balance));
    }
  }, [account, ethereum]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance();
      const refreshInterval = setInterval(fetchBalance, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setBalance, fetchBalance]);

  return balance;
};
