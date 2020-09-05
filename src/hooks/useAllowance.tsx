import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getAllowance } from "../utils/boost";

export const useAllowance = (tokenContract: string, poolAddress: string) => {
  const [allowance, setAllowance] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: any; ethereum: provider } = useWallet();
  const fetchAllowance = useCallback(async () => {
    let allowance = new BN(
      await getAllowance(ethereum, tokenContract, poolAddress, account)
    );
    setAllowance(allowance);
  }, [account, poolAddress, tokenContract, ethereum]);

  useEffect(() => {
    if (account) {
      fetchAllowance();
    }
    const refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, fetchAllowance]);

  return allowance;
};
