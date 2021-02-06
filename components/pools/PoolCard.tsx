import React from "react";
import styled from "styled-components";

import { Button } from "src/components/general/Button"
import { PrimaryButton, GlowText } from "src/styles/common";

export const PoolCard = ( props ) => {
  const { tokenPair, earnedToken, apy, depositHref, boostHref, withdrawHref, claimHref, totalStaked, yourStake, yourRewards } = props;
  return (
    <CardWrapper>
      <UpperPoolInfo>
        img img
        <PoolInfo>Deposit <GlowText>{tokenPair}</GlowText> and earn <GlowText>{earnedToken}</GlowText><br></br>
        APY: <GlowText>{apy}%</GlowText></PoolInfo>
      </UpperPoolInfo>

      <LowerPoolInfo>
        <TextLine><Left>Total staked</Left><Right>${totalStaked}</Right></TextLine>
        <TextLine><Left>Your stake</Left><Right>${yourStake || "0.00"}</Right></TextLine>
        <TextLine><Left>Your rewards</Left><Right>${yourRewards || "0.00"}</Right></TextLine>

        <PoolButtons>
          <PoolButton href={depositHref}>Deposit</PoolButton>
          <PoolButton href={boostHref}>🚀 Boost</PoolButton>
          <PoolButton href={withdrawHref}>Withdraw</PoolButton>
          <PoolButton href={claimHref}>Claim</PoolButton>
        </PoolButtons>
      </LowerPoolInfo>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: #131720;
  border: 2px solid #0C9EDA;
  box-shadow: 0 0 8px 0 #0C9EDA;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const UpperPoolInfo = styled.div`
  background: #122432;
  border-radius: 8px 8px 0 0;
  padding: 18px 36px 16px 36px;
`;

const LowerPoolInfo = styled.div`
  padding: 18px 36px 32px 36px;
`;


const PoolInfo = styled.p`
  font-size: 15px;
  font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

const TextLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.span `
  float: left;
  font-family: ${(props) => props.theme.fonts.interMedium};
  font-size: 13px;
  color: #B3B3B3;
  line-height: 24px;
`;

const Right = styled.span `
  float: right;
  font-family: ${(props) => props.theme.fonts.interMedium};
  font-size: 14px;
  color: #FFFFFF;
  text-align: right;
  line-height: 24px;
`;

const PoolButtons = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 36px;
`;

const PoolButton = styled(PrimaryButton) `
  padding: 10px 24px;
  width: calc(50% - 6px);
  margin-bottom: 10px;
  font-size: 14px;
;`