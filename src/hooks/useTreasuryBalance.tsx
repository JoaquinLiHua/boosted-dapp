import { useCallback, useEffect, useState } from "react";

import BN from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { getTreasuryBalance } from "src/utils/boost";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { yCRVToken } from "src/constants/tokenAddresses";

export const useTreasuryBalance = () => {
  const [balance, setBalance] = useState(new BN(0));
  const { ethereum }: { ethereum: provider } = useWallet();
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
  const fetchTreasuryBalance = useCallback(async () => {
    const { data } = await coinGecko.simple.fetchTokenPrice({
      contract_addresses: yCRVToken,
      vs_currencies: "usd",
    });
    const priceInUSD = data[yCRVToken].usd;
    const balance = new BN(await getTreasuryBalance(ethereum));
    const usdBalance = new BN(priceInUSD).multipliedBy(balance);
    setBalance(usdBalance);
  }, [ethereum, coinGecko]);

  useEffect(() => {
    if (ethereum) {
      fetchTreasuryBalance();
      const refreshInterval = setInterval(fetchTreasuryBalance, 60000);
      return () => clearInterval(refreshInterval);
    } else {
      return;
    }
  }, [ethereum, setBalance, fetchTreasuryBalance]);

  return balance;
};
