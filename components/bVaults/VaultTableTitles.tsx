import React from 'react';
import styled, { css } from 'styled-components';
import { PSmallStyles, PStyles, PLargeStyles } from 'styles/common';

export const VaultTableTitles = (props) => {
	const {
		vaultTitle,
		apyTitle,
		tvlTitle,
		yourBalanceTitle,
		yourDepositTitle,
		yourPoolPercentageTitle,
		yourEearningsTitle,
	} = props;
	return (
		<HeadRowWrapper>
			<Vault>{vaultTitle}</Vault>
			<APY>{apyTitle}</APY>
			<TVL>{tvlTitle}</TVL>
			<YourBalance>{yourBalanceTitle}</YourBalance>
			<YourDeposit>{yourDepositTitle}</YourDeposit>
			<YourPoolPercentage>{yourPoolPercentageTitle}</YourPoolPercentage>
			<YourEearnings>{yourEearningsTitle}</YourEearnings>
		</HeadRowWrapper>
	);
};

const HeadRowWrapper = styled.div`
	padding: 0 36px 16px 36px;
	display: grid;
  grid-template-columns: 36px auto 10% 10% 10% 10% 10% 10%;
  gap: 0 16px;
  grid-template-areas: "logo vault apy tvl yourbalance yourdeposit yourpoolpercentage yourearnings";

	span, div {
		${PSmallStyles}
		color: ${(props) => props.theme.colors.purple};
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
