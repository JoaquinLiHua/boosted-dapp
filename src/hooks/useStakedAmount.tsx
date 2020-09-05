import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { stakedAmount } from "../utils/boost";
import BN from "bignumber.js";

export const useStakedAmount = (poolAddress: string) => {
  const [amount, setAmount] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchStakedAmount = useCallback(async () => {
    if (account) {
      const amount = new BN(await stakedAmount(ethereum, poolAddress, account));
      setAmount(amount);
    }
  }, [account, ethereum, poolAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchStakedAmount();
      const refreshInterval = setInterval(fetchStakedAmount, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchStakedAmount]);

  return amount;
};
