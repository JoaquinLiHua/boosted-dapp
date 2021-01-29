import React from "react";
import styled from "styled-components";
import { boostToken } from "src/constants/bfAddresses";
import { useTokenBalance } from "src/hooks/erc20/useTokenBalance";
import { useTotalSupply } from "src/hooks/erc20/useTotalSupply";
import { useTreasuryBalance } from "src/hooks/general/useTreasuryBalance";
import { useTotalValueLocked } from "src/hooks/general/useTotalValueLocked";
import { useGetTotalRewardAmount } from "src/hooks/general/useGetTotalRewardAmount";
import { useBoostPrice } from "src/hooks/pools/useBoostPrice";
import { getDisplayBalance } from "src/utils/formatBalance";

import { Card } from "src/components/general/Card"

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
    <>
      <H1>Dashboard</H1>
      <CardLocal 
      title="YOUR BOOST BALANCE"
      help="to see your BOOST balance"
      />
    </>
  );
};

const H1 = styled.h1`
  font-size: 24px;
`;

const CardLocal = styled(Card)`
  width: 800px;
  justify-content: center;
`;
