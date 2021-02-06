import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTotalSupply } from "src/utils/erc20";

export const useTotalSupply = (tokenAddress: string) => {
  const [totalSupply, setTotalSupply] = useState(new BN(0));
  const { ethereum }: { ethereum: provider } = useWallet();

  const fetchTotalSupply = useCallback(async () => {
    const totalSupply = new BN(await getTotalSupply(ethereum, tokenAddress));
    setTotalSupply(totalSupply);
  }, [ethereum, tokenAddress]);

  useEffect(() => {
    if (ethereum) {
      fetchTotalSupply();
      const refreshInterval = setInterval(fetchTotalSupply, 30000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, setTotalSupply, fetchTotalSupply]);

  return totalSupply;
};
