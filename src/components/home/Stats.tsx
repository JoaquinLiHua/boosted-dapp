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
import formatCurrency from "format-currency";
import { getDisplayBalance } from "src/utils/formatBalance";

interface StatsProps {}

export const Stats: React.FC<StatsProps> = ({}) => {
  const boostBalance: string = getDisplayBalance(useTokenBalance(boostToken));
  const totalRewardsAvailable: string = getDisplayBalance(
    useGetTotalRewardAmount()
  );
  const boostTotalSupply: string = getDisplayBalance(useTotalSupply());
  const treasuryBalance: string = getDisplayBalance(useTreasuryBalance());
  const totalValueLocked: string = useTotalValueLocked();
  const boostPrice: string = useBoostPrice();

  return (
    <Stack spacing="1.5rem" mr="4" mt="4">
      <StatBox title="BALANCE" value={boostBalance} tokenTicker={"BOOST"} />
      <StatBox
        title="READY FOR CLAIM"
        value={totalRewardsAvailable}
        tokenTicker={"BOOST"}
      />
      <StatBox
        title="TOTAL VALUE LOCKED"
        tokenTicker={"USD"}
        value={formatCurrency(totalValueLocked)}
      />
      <StatBox
        title="B00ST PRICE"
        tokenTicker={"USD"}
        value={formatCurrency(boostPrice)}
      />
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
