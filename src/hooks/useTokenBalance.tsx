import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getBalance } from "../utils/erc20";

export const useTokenBalance = (tokenAddress: string | null) => {
  const [balance, setBalance] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalance = useCallback(async () => {
    if (account && tokenAddress) {
      const balance = await getBalance(ethereum, tokenAddress, account);
      setBalance(new BN(balance));
    }
  }, [account, ethereum, tokenAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance();
      const refreshInterval = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [account, ethereum, setBalance, tokenAddress, fetchBalance]);

  return balance;
};
