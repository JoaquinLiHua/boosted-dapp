import React from "react";
import styled from "styled-components";

export const Card = ( props ) => {
  const { title, value, help } = props;
  return (
    <CardWrapper>
      <Title>{title}</Title>
      <ConnectWallet>Connect Wallet</ConnectWallet>
      <Value>{value}</Value>
      <Help>{help}</Help>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: #131720;
  border: 2px solid #0C9EDA;
  box-shadow: 0 0 8px 0 #0C9EDA;
  border-radius: 8px;
  padding: 18px 36px 32px 36px;
`;

const Title = styled.p`
  font-size: 12px;
  color: #ADB2D6;
  letter-spacing: 1px;
  line-height: 24px;
  font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

const ConnectWallet = styled.a`
  font-size: 24px;
  color: #56C7F6;
  letter-spacing: 0;
  line-height: 24px;
  text-shadow: 0 0 8px rgba(86,199,246,0.50);
  font-family: ${(props) => props.theme.fonts.interSemiBold};
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const Value = styled.p`
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0;
  line-height: 24px;
  font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

const Help = styled.p`
  font-size: 13px;
  color: #ADB2D6;
  letter-spacing: 0.2px;
  line-height: 24px;
  font-family: ${(props) => props.theme.fonts.interMedium};
`;
