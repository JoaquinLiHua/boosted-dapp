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
import { H1, TwoCols, ThreeCols, PositiveNumber, NegativeNumber, DailyWeeklyMonthlyPrice, Spacer } from "src/styles/common";

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
      <TopRow>
        <H1>Dashboard</H1>
        <ul>
          <li><strong>BOOST</strong>: $15.19 <PositiveNumber>+5.70%</PositiveNumber></li>
          <li><strong>ORBIT</strong>: $10.67 <NegativeNumber>-4.12%</NegativeNumber></li>
        </ul> 
      </TopRow>

      <TwoCols>
        <Card
          title="YOUR BOOST BALANCE"
          help="to see your BOOST balance"
        />
        <Card
          title="YOUR UNCLAIMED REWARDS"
          help="to see your unclaimed rewards"
        />
      </TwoCols>

      <Card
        title="YOUR POOLS & VAULTS"
        help="to see which Pools & Vaults you participate in"
      />

      <Spacer />

      <ThreeCols>
        <Card
          title="TOTAL VALUE LOCKED"
          value="$2,217,532 USD"
          help={[<DailyWeeklyMonthlyPrice><p>24H: <PositiveNumber>+4,29%</PositiveNumber></p><p>7D: <PositiveNumber>+24,42%</PositiveNumber></p><p>30D: +<NegativeNumber>21.02%</NegativeNumber></p></DailyWeeklyMonthlyPrice>]}
        />
        <Card
          title="TOTAL BOOST SUPPLY"
          value="98,589 BOOST"
          help="total supply of BOOST tokens"
        />
        <Card
          title="TOTAL ORBIT SUPPLY"
          value="100B ORBIT"
          help="total supply of ORBIT tokens"
        />

        <Card
          title="TREASURY VALUE"
          value="$1,453,872 USD"
          help={[<DailyWeeklyMonthlyPrice><p>24H: <PositiveNumber>+4,29%</PositiveNumber></p><p>7D: <PositiveNumber>+24,42%</PositiveNumber></p><p>30D: +<NegativeNumber>21.02%</NegativeNumber></p></DailyWeeklyMonthlyPrice>]}
        />
        <Card
          title="BOOST TOKEN PRICE"
          value="$15.19 USD"
          help={[<DailyWeeklyMonthlyPrice><p>24H: <PositiveNumber>+4,29%</PositiveNumber></p><p>7D: <PositiveNumber>+24,42%</PositiveNumber></p><p>30D: +<NegativeNumber>21.02%</NegativeNumber></p></DailyWeeklyMonthlyPrice>]}
        />
        <Card
          title="ORBIT TOKEN PRICE"
          value="$10.67 USD"
          help={[<DailyWeeklyMonthlyPrice><p>24H: <PositiveNumber>+4,29%</PositiveNumber></p><p>7D: <PositiveNumber>+24,42%</PositiveNumber></p><p>30D: +<NegativeNumber>21.02%</NegativeNumber></p></DailyWeeklyMonthlyPrice>]}
        />
      </ThreeCols>

    </>
  );
};

const TopRow = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;

  ul, li {
    list-style-type: none;
    display: inline-block;
    font-size: 13px;
    letter-spacing: 0.2px;
    line-height: 24px;
    font-family: ${(props) => props.theme.fonts.interMedium};
  }

  li:first-of-type {
    margin-right: 24px;
  }
`;




