import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { rewardAmount } from "src/utils/pool";
import BN from "bignumber.js";

export const useGetVaultRewardsAmount = (vaultRewardsAddress: string) => {
  const [amount, setAmount] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalance = useCallback(async () => {
    if (account) {
      const amount = new BN(
        await rewardAmount(ethereum, vaultRewardsAddress, account)
      );
      setAmount(amount);
    }
  }, [account, ethereum, vaultRewardsAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance();
      const refreshInterval = setInterval(fetchBalance, 5000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchBalance]);

  return amount;
};
