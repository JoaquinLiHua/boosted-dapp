import React from "react";
import styled from "styled-components";
import { PoolCard } from "./PoolCard"

import { H1, ThreeCols, Spacer } from "src/styles/common";

export const Pools: React.FC = () => {
  return (
    <>
    <TopRow>
      <H1>Pools</H1>
      <PoolSearchWrapper>
        <PoolSearch type="search" placeholder="Search pools.."></PoolSearch>
        <PoolDropdown name="pools" id="pools">
          <option value="all" selected>All pools</option>
          <option value="closed">Closed pools</option>
        </PoolDropdown>
      </PoolSearchWrapper>
    </TopRow>

    <Spacer />

    <ThreeCols>
        <PoolCard
          tokenPair="1INCH-DAI"
          earnedToken="1INCH"
          apy="272"

          totalStaked="12,693,766.17"
          yourStake="0.00"
          yourRewards="0.00"
          
          depositHref="#"
          boostHref="#"
          withdrawHref="#"
          claimHref="#"
        />
        
        <PoolCard
          tokenPair="1INCH-DAI"
          earnedToken="1INCH"
          apy="272"

          totalStaked="12,693,766.17"
          yourStake="0.00"
          yourRewards="0.00"
          
          depositHref="#"
          boostHref="#"
          withdrawHref="#"
          claimHref="#"
        />

        <PoolCard
          tokenPair="1INCH-DAI"
          earnedToken="1INCH"
          apy="272"

          totalStaked="12,693,766.17"
          yourStake="0.00"
          yourRewards="0.00"
          
          depositHref="#"
          boostHref="#"
          withdrawHref="#"
          claimHref="#"
        />

        <PoolCard
          tokenPair="1INCH-DAI"
          earnedToken="1INCH"
          apy="272"

          totalStaked="12,693,766.17"
          yourStake="0.00"
          yourRewards="0.00"
          
          depositHref="#"
          boostHref="#"
          withdrawHref="#"
          claimHref="#"
        />

      </ThreeCols>
    </>
  );
};

const TopRow = styled.div `
`;

const PoolSearchWrapper = styled.div `
  display: flex;
  justify-content: space-between;
`;

const PoolSearch = styled.input`
  width: calc(100% - 203px); 
  background: #262F40;
  border-radius: 24px 0 0 24px;
  color: white;
  height: 48px;
  padding: 24px;
  border: none;
  font-family: ${(props) => props.theme.fonts.interMedium};
  font-size: 14px;
  color: #FFFFFF;

  &:active,
  &:focus {
    outline: none;
  }
`;

const PoolDropdown = styled.select `
  width: 200px;
  background: #262F40;
  border-radius: 0 24px 24px 0;
  color: white;
  height: 48px;
  padding: 24px;
  border: none;
  outline: none;

  &:hover {

  }
`;
