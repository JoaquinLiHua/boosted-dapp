import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { stakedAmount } from "../utils/pools";
import BN from "bignumber.js";

const useStakedAmount = (poolAddress: string) => {
  const [amount, setAmount] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchStakedAmount = useCallback(async () => {
    if (account) {
      const amount = await stakedAmount(ethereum, poolAddress, account);
      setAmount(new BN(amount));
    }
  }, [account, ethereum, poolAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchStakedAmount();
      const refreshInterval = setInterval(fetchStakedAmount, 10000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchStakedAmount]);

  return amount;
};

export default useStakedAmount;
