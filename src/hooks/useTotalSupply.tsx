import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTotalSupply } from "src/utils/boost";

export const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState(new BN(0));
  const { ethereum }: { ethereum: provider } = useWallet();

  const fetchTotalSupply = useCallback(async () => {
    const totalSupply = new BN(await getTotalSupply(ethereum));
    setTotalSupply(totalSupply);
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
