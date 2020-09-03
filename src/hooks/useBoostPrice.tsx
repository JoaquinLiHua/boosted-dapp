import { useCallback, useEffect, useState } from "react";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { boostToken } from "src/constants/tokenAddresses";

const useBoostPrice = () => {
  const [price, setPrice] = useState(0);
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
  const fetchPrice = useCallback(async () => {
    try {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: boostToken,
        vs_currencies: "usd",
      });
      const priceInUSD = data["0x3e780920601d61cedb860fe9c4a90c9ea6a35e78"].usd;
      setPrice(priceInUSD);
    } catch (e) {
      console.log(e);
    }
  }, [coinGecko]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return price;
};

export default useBoostPrice;
