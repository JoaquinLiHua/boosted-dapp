import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTreasuryBalance } from "src/utils/erc20";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { yCRVToken } from "src/constants/tokenAddresses";
import { getDisplayBalance } from "src/utils/formatBalance";

export const useTreasuryBalance = () => {
  const [balance, setBalance] = useState(0);
  const {
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();

  const fetchTreasuryBalance = useCallback(async () => {
    const { data } = await coinGecko.simple.fetchTokenPrice({
      contract_addresses: yCRVToken,
      vs_currencies: "usd",
    });
    const priceInUSD = data[yCRVToken].usd;
    const balance = await getTreasuryBalance(ethereum);
    const usdBalance =
      priceInUSD * parseInt(getDisplayBalance(new BN(balance)));
    setBalance(usdBalance);
  }, [ethereum, coinGecko]);

  useEffect(() => {
    if (ethereum) {
      fetchTreasuryBalance();
    } else {
      return;
    }
  }, [ethereum, setBalance, fetchTreasuryBalance]);

  return balance;
};
