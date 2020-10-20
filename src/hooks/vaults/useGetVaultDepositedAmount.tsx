import { useCallback, useState, useEffect } from "react";

import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import BN from "bignumber.js";
import { getDepositedAmount } from "src/utils/vault";

export const useGetVaultDepositedAmount = (vaultAddress: string) => {
  const [amount, setAmount] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchDepositedAmount = useCallback(async () => {
    if (account) {
      const amount = new BN(
        await getDepositedAmount(ethereum, vaultAddress, account)
      );
      setAmount(amount);
    }
  }, [account, ethereum, vaultAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchDepositedAmount();
      const refreshInterval = setInterval(fetchDepositedAmount, 5000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchDepositedAmount]);

  return amount;
};
