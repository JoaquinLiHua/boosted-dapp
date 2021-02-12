import React from 'react';
import styled, { css } from 'styled-components';
import { PSmallStyles, PStyles, PLargeStyles } from 'styles/common';

export const VaultCard = (props) => {
	const {
		logoURL,
		vault,
		apy,
		tvl,
		balance,
		deposit,
		poolPercentage,
		earnings,
		href,
		...rest
	} = props;
	return (
		<CardWrapper href={href} {...rest}>
			<CardHeader>
				<Logo>{logoURL}</Logo>
				<Vault>{vault}<span>USDC</span></Vault>
				<APY>{apy}<span>daily</span></APY>
				<TVL>{tvl}<span>USD</span></TVL>
				<YourBalance>{balance}<span>USDC</span></YourBalance>
				<YourDeposit>{deposit}<span>USDC</span></YourDeposit>
				<YourPoolPercentage>{poolPercentage}</YourPoolPercentage>
				<YourEearnings>{earnings}<span>USDC</span></YourEearnings>
			</CardHeader>
			
			<CardContent>
				<div>
				How to participate in bVaults?
				Step 1: Deposit your USDC to receive interest bearing bfUSDC

				Step 2: Stake your bfUSDC in the bfUSDC pool to participate in the rewards pool to gain additional rewards. This step is optional.
				</div>>
			</CardContent>
		</CardWrapper>
	);
};

const CardWrapper = styled.div`
	background: ${(props) => props.theme.colors.background};
	border: ${(props) => props.theme.global.cardGlowBorder};
	box-shadow: ${(props) => props.theme.global.cardGlowShadow};
	border-radius: 8px;
	padding: 16px 36px 16px 36px;
	margin: 0 0 16px 0;

	// &:hover {
	// 	background: ${(props) => props.theme.colors.backgroundHover};
	// 	cursor: pointer;
	// }
`;

const CardHeader = styled.div`
	display: grid;
  grid-template-columns: 36px auto 10% 10% 10% 10% 10% 10%;
  gap: 0 16px;
  grid-template-areas: "logo vault apy tvl yourbalance yourdeposit yourpoolpercentage yourearnings";

	span {
		${PSmallStyles}
		color: ${(props) => props.theme.colors.gray};
		display: block;
	}
`;

const CardContent = styled.div`
`;

const Logo = styled.div`
	grid-area: logo;
	align-self: center;
	justify-self: start;
	text-align: left;
`;

const ColumnStyles = css`
	${PStyles}
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	justify-self: end;
	text-align: right;
`;

const Vault = styled.div`
	${PLargeStyles}
	grid-area: vault;
	justify-self: start;
	text-align: left;

	color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: ${(props) => props.theme.global.textShadowGlow};
`;

const APY = styled.div`
	${ColumnStyles}
	grid-area: apy;
`;

const TVL = styled.div`
	${ColumnStyles}
	grid-area: tvl;
`;

const YourBalance = styled.div`
	${ColumnStyles}
	grid-area: yourbalance;
`;

const YourDeposit = styled.div`
	${ColumnStyles}
	grid-area: yourdeposit;
	`;

const YourPoolPercentage = styled.div`
	${ColumnStyles}
	grid-area: yourpoolpercentage;
`;

const YourEearnings = styled.div`
	${PLargeStyles}
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	grid-area: yourearnings;
	justify-self: end;
	text-align: right;
	color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: ${(props) => props.theme.global.textShadowGlow};
`;

const Votes = styled.div`
`;

const VoteWeight = styled.div`
`;

const ProposalsVoted = styled.div`
`;