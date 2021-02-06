import React from 'react';
import styled from 'styled-components';

export const Card = (props) => {
	const { title, value, valueInUSD, help } = props;
	return (
		<CardWrapper>
			<Title>{title}</Title>
			<Value>{value || <ConnectWallet>Connect Wallet</ConnectWallet>}</Value>
			<HelpText>{valueInUSD || help}</HelpText>
		</CardWrapper>
	);
};

const CardWrapper = styled.div`
	background: #131720;
	border: 2px solid #0c9eda;
	box-shadow: 0 0 8px 0 #0c9eda;
	border-radius: 8px;
	padding: 18px 36px 32px 36px;
	margin-bottom: 24px;
`;

const Title = styled.p`
	font-size: 12px;
	color: #adb2d6;
	letter-spacing: 1px;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	margin-bottom: 72px;
`;

const Value = styled.p`
	font-size: 24px;
	color: #ffffff;
	letter-spacing: 0;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	margin-bottom: 0;
`;

const ConnectWallet = styled.a`
	color: #56c7f6;
	text-shadow: 0 0 8px rgba(86, 199, 246, 0.5);
	cursor: pointer;

	&:hover {
		color: white;
	}
`;

const HelpText = styled.p`
	margin-top: 4px;
	margin-bottom: 4px;
	font-size: 13px;
	color: #adb2d6;
	letter-spacing: 0.2px;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interMedium};
`;

const valueInUSD = styled.p`
	font-size: 13px;
	color: #adb2d6;
	letter-spacing: 0.2px;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interMedium};
`;
