import { useCallback, useState, useEffect } from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { rewardAmount as poolRewardAmount } from "src/utils/pool";
import { getRewardAmount as vaultRewardAmount } from "src/utils/vault";
import BN from "bignumber.js";
import { ALL_POOLS } from "src/constants/pools";
import { B_VAULTS } from "src/constants/bVaults";

export const useGetTotalRewardAmount = () => {
  const [amount, setAmount] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();
  const fetchReadyToHarvest = useCallback(async () => {
    if (account) {
      const totalPoolAmount = ALL_POOLS.map(async (pool) => {
        return new BN(await poolRewardAmount(ethereum, pool.address, account));
      });
      const totalVaultAmount = B_VAULTS.map(async (vault) => {
        if (vault.vaultRewardAddress !== "") {
          return new BN(
            await vaultRewardAmount(ethereum, vault.vaultRewardAddress, account)
          );
        }
      });
      const totalPoolResolved = await Promise.all(totalPoolAmount).then(
        (values) => {
          return values.reduce(function (a: BN, b: BN) {
            return a.plus(b);
          }, new BN("0"));
        }
      );
      const totalVaultResolved = await Promise.all(totalVaultAmount).then(
        (values) => {
          return values.reduce(function (a: BN, b: BN) {
            return a.plus(b);
          }, new BN("0"));
        }
      );
      setAmount(totalPoolResolved.plus(totalVaultResolved));
    }
  }, [account, ethereum]);

  useEffect(() => {
    if (account && ethereum) {
      fetchReadyToHarvest();
      const refreshInterval = setInterval(fetchReadyToHarvest, 10000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setAmount, fetchReadyToHarvest]);

  return amount;
};
