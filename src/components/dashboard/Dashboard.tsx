import React from "react";
import { StatBox } from "./StatBox";
import { boostToken } from "src/constants/bfAddresses";
import { useTokenBalance } from "src/hooks/erc20/useTokenBalance";
import { useTotalSupply } from "src/hooks/erc20/useTotalSupply";
import { useTreasuryBalance } from "src/hooks/general/useTreasuryBalance";
import { useTotalValueLocked } from "src/hooks/general/useTotalValueLocked";
import { useGetTotalRewardAmount } from "src/hooks/general/useGetTotalRewardAmount";
import { useBoostPrice } from "src/hooks/pools/useBoostPrice";
import { Heading, Stack } from "@chakra-ui/core";
import { getDisplayBalance } from "src/utils/formatBalance";

export const Dashboard: React.FC = () => {
  const boostBalance: string = getDisplayBalance(useTokenBalance(boostToken));
  const totalRewardsAvailable: string = getDisplayBalance(
    useGetTotalRewardAmount()
  );
  const boostTotalSupply: string = getDisplayBalance(
    useTotalSupply(boostToken)
  );
  const treasuryBalance: string = getDisplayBalance(useTreasuryBalance());
  const totalValueLocked: string = useTotalValueLocked();
  const boostPrice: string = useBoostPrice();

  return (
    <Stack spacing={4} mt={4} width="100%">
      <Heading>Dashboard</Heading>
      <Stack spacing={2}>
        <Stack spacing={2} direction={["column", "column", "row"]}>
          <StatBox
            title="BOOST BALANCE"
            value={boostBalance}
            tokenTicker={"BOOST"}
            helperText="Your BOOST token balance"
          />
          <StatBox
            title="B00ST PRICE"
            tokenTicker={"USD"}
            isCurrency
            value={boostPrice}
            helperText="The price of one BOOST token"
          />

          <StatBox
            title="UNCLAIMED REWARDS"
            value={totalRewardsAvailable}
            tokenTicker={"BOOST"}
            helperText="Total rewards ready to be claimed"
          />
        </Stack>
        <Stack spacing={2} direction={["column", "column", "row"]}>
          <StatBox
            title="TOTAL VALUE STAKED"
            tokenTicker={"USD"}
            value={totalValueLocked}
            isCurrency
            helperText="Total value staked in contracts"
          />
          <StatBox
            title="TOTAL SUPPLY"
            value={boostTotalSupply}
            tokenTicker={"BOOST"}
            helperText="Total supply of BOOST tokens"
          />
          <StatBox
            title="TREASURY VALUE"
            tokenTicker={"USD"}
            isCurrency
            value={treasuryBalance}
            helperText="The USD value of the bDAO."
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
