import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { rewardAmount } from "../utils/boost";
import BN from "bignumber.js";

const useGetRewardAmount = (poolAddress: string) => {
  const [amount, setAmount] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalance = useCallback(async () => {
    if (account) {
      const amount = await rewardAmount(ethereum, poolAddress, account);
      setAmount(new BN(amount));
    }
  }, [account, ethereum, poolAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance();
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchBalance]);

  return amount;
};

export default useGetRewardAmount;
