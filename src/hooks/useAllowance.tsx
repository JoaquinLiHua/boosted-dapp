import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getAllowance } from "../utils/erc20";

const useAllowance = (
  tokenContract: string | null,
  poolAddress: string | null
) => {
  const [allowance, setAllowance] = useState(new BN(0));
  const {
    account,
    ethereum,
  }: { account: any; ethereum: provider } = useWallet();

  const fetchAllowance = useCallback(async () => {
    let allowance;
    if (tokenContract && poolAddress) {
      allowance = await getAllowance(
        ethereum,
        tokenContract,
        poolAddress,
        account
      );
    }

    setAllowance(new BN(allowance));
  }, [account, poolAddress, tokenContract, ethereum]);

  useEffect(() => {
    if (account && poolAddress && tokenContract) {
      fetchAllowance();
    }
    const refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, poolAddress, tokenContract, fetchAllowance]);

  return allowance;
};

export default useAllowance;
