import React from "react";
import { StatBox } from "./StatBox";
import { boostToken } from "../../constants/tokenAddresses";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { useTotalSupply } from "src/hooks/useTotalSupply";
import { useTreasuryBalance } from "src/hooks/useTreasuryBalance";
import { useTotalValueLocked } from "src/hooks/useTotalValueLocked";
import useGetTotalRewardAmount from "src/hooks/useGetTotalRewardAmount";
import useBoostPrice from "src/hooks/useBoostPrice";
import { Stack } from "@chakra-ui/core";
import formatCurrency from "format-currency";

interface StatsProps {}

export const Stats: React.FC<StatsProps> = ({}) => {
  const boostBalance = useTokenBalance(boostToken);
  const boostTotalSupply = useTotalSupply();
  const treasuryBalance = useTreasuryBalance();
  const totalValueLocked = useTotalValueLocked();
  const totalRewardsAvailable = useGetTotalRewardAmount();
  const boostPrice = useBoostPrice();
  return (
    <Stack spacing="1.5rem" mr="4" mt="4">
      <StatBox
        title="BALANCE"
        value={boostBalance}
        bigNumber
        tokenTicker={"BOOST"}
      />
      <StatBox
        title="READY FOR CLAIM"
        bigNumber
        value={totalRewardsAvailable}
        tokenTicker={"BOOST"}
      />
      <StatBox
        title="TOTAL VALUE LOCKED"
        tokenTicker={"USD"}
        value={formatCurrency(totalValueLocked)}
      />
      <StatBox title="B00ST PRICE" tokenTicker={"USD"} value={boostPrice} />
      <StatBox
        title="TOTAL SUPPLY"
        bigNumber
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
