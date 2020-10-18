import BN from "bignumber.js";
import { useCallback } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { deposit, withdraw } from "../utils/vault";

export const useVaultDeposit = (vaultAddress: string) => {
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const handleDeposit = useCallback(
    async (amount: BN) => {
      if (account) {
        const txHash = await deposit(ethereum, vaultAddress, amount, account);
        return txHash;
      }
    },
    [account, vaultAddress, ethereum]
  );

  const handleWithdraw = useCallback(
    async (amount: BN) => {
      if (account) {
        const txHash = await withdraw(ethereum, vaultAddress, amount, account);
        return txHash;
      }
    },
    [account, vaultAddress, ethereum]
  );

  return { onVaultDeposit: handleDeposit, onVaultWithdraw: handleWithdraw };
};
