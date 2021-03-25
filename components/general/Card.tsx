import Initialiser from 'context/Initialiser';
import React from 'react';
import styled from 'styled-components';

import { H1Styles, H6Styles, PSmallStyles } from 'styles/common';

type CardProps = {
	title: string;
	value: string;
	helpCopy?: string;
	priceChangeComponent?: React.ReactNode;
	alwaysShow?: boolean;
};

export const Card: React.FC<CardProps> = ({
	title,
	value,
	helpCopy,
	priceChangeComponent,
	alwaysShow = false,
}) => {
	const { connectWallet, walletAddress } = Initialiser.useContainer();
	return (
		<CardWrapper>
			<Title>{title}</Title>
			{walletAddress || alwaysShow ? (
				<>
					<Value>{value}</Value>
					{helpCopy ? <HelpText>{helpCopy}</HelpText> : priceChangeComponent}
				</>
			) : (
				<>
					<Value>
						<ConnectWallet onClick={connectWallet}>Connect Wallet</ConnectWallet>
					</Value>
				</>
			)}
		</CardWrapper>
	);
};

const CardWrapper = styled.div`
	background: ${(props) => props.theme.colors.background};
	border: ${(props) => props.theme.global.cardGlowBorder};
	box-shadow: ${(props) => props.theme.global.cardGlowShadow};
	border-radius: 8px;
	padding: 32px 36px 32px 36px;
	margin-bottom: 24px;
`;

const Title = styled.h6`
	${H6Styles}
	margin-top: 0;
	margin-bottom: 72px;
`;

const Value = styled.p`
	${H1Styles}
	margin-top: 0;
	margin-bottom: 8px;
`;

const ConnectWallet = styled.a`
	color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: ${(props) => props.theme.global.textGlowShadow};
	cursor: pointer;

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

const HelpText = styled.p`
	${PSmallStyles}
	margin-top: 0px;
	margin-bottom: 4px;
`;
