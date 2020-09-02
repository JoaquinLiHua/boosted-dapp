import { useCallback, useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTreasuryBalance } from "src/utils/erc20";

export const useTreasuryBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const {
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchTreasuryBalance = useCallback(async () => {
    const balance = await getTreasuryBalance(ethereum);
    setBalance(new BigNumber(balance));
  }, [ethereum]);

  useEffect(() => {
    if (ethereum) {
      fetchTreasuryBalance();
      const refreshInterval = setInterval(fetchTreasuryBalance, 10000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, setBalance, fetchTreasuryBalance]);

  return balance;
};
