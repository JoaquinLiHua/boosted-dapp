import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { H6, H6Styles, PSmall, PSmallStyles, PStyles, PLargeStyles } from 'styles/common';

import { HowToParticipateInVaults } from './HowToParticipateInVaults';
import { VaultActions } from './VaultActions';

export const VaultCard = (props: any) => {
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

	const [vaultOpen, setVaultOpen] = useState<boolean>(false);

	return (
		<CardWrapper href={href} {...rest}>
			<CardHeader onClick={(toggle) => setVaultOpen(true)}>
				<Logo>
					<img src={logoURL} />
				</Logo>
				<Vault>
					{vault}
					<span>USDC</span>
				</Vault>
				<APY>
					{apy}
					<span>daily</span>
				</APY>
				<TVL>
					{tvl}
					<span>USD</span>
				</TVL>
				<YourBalance>
					{balance}
					<span>USDC</span>
				</YourBalance>
				<YourDeposit>
					{deposit}
					<span>USDC</span>
				</YourDeposit>
				<YourPoolPercentage>{poolPercentage}</YourPoolPercentage>
				<YourEearnings>
					{earnings}
					<span>USDC</span>
				</YourEearnings>
			</CardHeader>

			{vaultOpen && (
				<CardContent>
					<HowToParticipateInVaults />
					<VaultActions />
				</CardContent>
			)}
		</CardWrapper>
	);
};

const CardWrapper = styled.div`
	background: ${(props) => props.theme.colors.background};
	border: ${(props) => props.theme.global.cardGlowBorder};
	box-shadow: ${(props) => props.theme.global.cardGlowShadow};
	border-radius: 8px;
	padding: 16px 36px 0 36px;
	margin: 0 0 16px 0;

	// &:hover {
	// 	background: ${(props) => props.theme.colors.backgroundHover};
	// 	cursor: pointer;
	// }
`;

const CardHeader = styled.div`
	display: grid;
	padding-bottom: 16px;
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
	margin-left: -36px;
	margin-right: -36px;
	padding-left: 48px;
	padding-right: 48px;
	padding-bottom: 48px;
	border-top: 1px solid ${(props) => props.theme.colors.lightNavy};

	display: flex;
`;

const Logo = styled.div`
	grid-area: logo;
	align-self: center;
	justify-self: start;
	text-align: left;

	img {
		max-width: 36px;
		max-height: 36px;
	}
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

const Votes = styled.div``;

const VoteWeight = styled.div``;

const ProposalsVoted = styled.div``;
