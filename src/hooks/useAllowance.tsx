import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getAllowance } from "../utils/erc20";

export const useAllowance = (
  tokenContract: string,
  contractToCheck: string
) => {
  const [allowance, setAllowance] = useState(new BN("0"));
  const {
    account,
    ethereum,
  }: { account: any; ethereum: provider } = useWallet();
  const fetchAllowance = useCallback(async () => {
    const allowance = new BN(
      await getAllowance(ethereum, tokenContract, contractToCheck, account)
    );
    setAllowance(allowance);
  }, [account, contractToCheck, tokenContract, ethereum]);

  useEffect(() => {
    if (account) {
      fetchAllowance();
    }
    const refreshInterval = setInterval(fetchAllowance, 5000);
    return () => clearInterval(refreshInterval);
  }, [account, fetchAllowance]);

  return allowance;
};
