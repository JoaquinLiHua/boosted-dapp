import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { boostCount } from "../utils/pools";
import BigNumber from "bignumber.js";

const useGetBoosterBalance = (poolAddress: string) => {
  const [amount, setAmount] = useState(new BigNumber(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalance = useCallback(async () => {
    if (account) {
      const amount = await boostCount(ethereum, poolAddress, account);
      setAmount(new BigNumber(amount));
    }
  }, [account, ethereum, poolAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance();
      const refreshInterval = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchBalance]);

  return amount;
};

export default useGetBoosterBalance;
