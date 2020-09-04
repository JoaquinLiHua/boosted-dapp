import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTotalSupply } from "../utils/erc20";

export const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState(new BN(0));
  const {
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();

  const fetchTotalSupply = useCallback(async () => {
    const totalSupply = await getTotalSupply(ethereum);
    setTotalSupply(new BN(totalSupply));
  }, [ethereum]);

  useEffect(() => {
    if (ethereum) {
      fetchTotalSupply();
    } else {
      return;
    }
  }, [ethereum, setTotalSupply, fetchTotalSupply]);

  return totalSupply;
};
