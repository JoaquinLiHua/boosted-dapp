import React from "react";
import { StatBox } from "./StatBox";
import { boostToken } from "../../constants/tokenAddresses";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { useTotalSupply } from "src/hooks/useTotalSupply";
import { useTreasuryBalance } from "src/hooks/useTreasuryBalance";
import { useTotalValueLocked } from "src/hooks/useTotalValueLocked";
import { useGetTotalRewardAmount } from "src/hooks/useGetTotalRewardAmount";
import { useBoostPrice } from "src/hooks/useBoostPrice";
import { Stack } from "@chakra-ui/core";
import { getDisplayBalance } from "src/utils/formatBalance";

export const Stats: React.FC = () => {
  const boostBalance: string = getDisplayBalance(useTokenBalance(boostToken));
  const totalRewardsAvailable: string = getDisplayBalance(
    useGetTotalRewardAmount()
  );
  const boostTotalSupply: string = getDisplayBalance(useTotalSupply());
  const treasuryBalance: string = getDisplayBalance(useTreasuryBalance());
  const totalValueLocked: string = useTotalValueLocked();
  const boostPrice: string = useBoostPrice();

  return (
    <Stack
      direction={["row", "row", "column"]}
      spacing={4}
      mr={4}
      mt={4}
      flexDirection={["row", "row", "column"]}
      overflow={["scroll"]}
    >
      <StatBox title="BALANCE" value={boostBalance} tokenTicker={"BOOST"} />
      <StatBox
        title="READY FOR CLAIM"
        value={totalRewardsAvailable}
        tokenTicker={"BOOST"}
      />
      <StatBox
        title="TOTAL VALUE LOCKED"
        tokenTicker={"USD"}
        value={totalValueLocked}
      />
      <StatBox title="B00ST PRICE" tokenTicker={"USD"} value={boostPrice} />
      <StatBox
        title="TOTAL SUPPLY"
        value={boostTotalSupply}
        tokenTicker={"BOOST"}
      />
      <StatBox
        title="TREASURY VALUE"
        tokenTicker={"USD"}
        value={treasuryBalance}
      />
    </Stack>
  );
};
