import React from 'react';
import styled from 'styled-components';

import { PrimaryButton, SecondaryButton, GlowText } from 'styles/common';

export const PoolCard = (props) => {
	const {
		tokenPair,
		earnedToken,
		apy,
		depositHref,
		boostHref,
		withdrawHref,
		claimHref,
		totalStaked,
		yourStake,
		yourRewards,
		firstLogoURL,
		secondLogoURL,
	} = props;
	return (
		<CardWrapper >
			<UpperPoolInfo>
				<LogoWrapper>
					<Logo><img src={firstLogoURL} /></Logo>
					<Logo><img src={secondLogoURL} /></Logo>
				</LogoWrapper>
				<PoolInfo>
					Deposit <GlowText>{tokenPair}</GlowText> and earn <GlowText>{earnedToken}</GlowText>
					<br></br>
					APY: <GlowText>{apy}%</GlowText>
				</PoolInfo>
			</UpperPoolInfo>

			<LowerPoolInfo>
				<TextLine>
					<Left>Total staked</Left>
					<Right>${totalStaked}</Right>
				</TextLine>
				<TextLine>
					<Left>Your stake</Left>
					<Right>${yourStake || '0.00'}</Right>
				</TextLine>
				<TextLine>
					<Left>Your rewards</Left>
					<Right>${yourRewards || '0.00'}</Right>
				</TextLine>

				<PoolButtons>
					<PoolButton href={depositHref}>Deposit</PoolButton>
					<PoolButton href={boostHref}>🚀  Boost</PoolButton>
					<PoolButtonSecondary href={withdrawHref} disabled>Withdraw</PoolButtonSecondary>
					<PoolButtonSecondary href={claimHref} disabled>Claim</PoolButtonSecondary>
				</PoolButtons>
			</LowerPoolInfo>
		</CardWrapper>
	);
};

const CardWrapper = styled.div`
	background: #131720;
	box-shadow: 0 0 8px 0 #0c9eda;
	border: 2px solid #0c9eda;
	border-radius: 8px;
	margin-bottom: 24px;
	transition: all 0.1s ease-in-out;
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

const Left = styled.span`
	float: left;
	font-family: ${(props) => props.theme.fonts.interMedium};
	font-size: 13px;
	color: #b3b3b3;
	line-height: 24px;
`;

const Right = styled.span`
	float: right;
	font-family: ${(props) => props.theme.fonts.interMedium};
	font-size: 14px;
	color: #ffffff;
	text-align: right;
	line-height: 24px;
`;

const PoolButtons = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 36px;
`;

const PoolButton = styled(PrimaryButton)`
	width: calc(50% - 6px);
	margin-bottom: 10px;
	font-size: 14px;
`;

const PoolButtonSecondary = styled(SecondaryButton)`
	padding: 10px 24px;
	width: calc(50% - 6px);
	margin-bottom: 10px;
	font-size: 14px;
`;

const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 16px 0 32px;
`;

const Logo = styled.div`
	background: white;
	border-radius: 50%;
	display: flex;
	align-items: flex-start;
	padding: 4px;
	position: relative;
	z-index: 2;
	border: 1px solid #0C9EDA;
	box-shadow: 0 0 8px 0 rgba(86,199,246,0.50);

	:nth-of-type(2) {
		margin-left: -8px;
		z-index: 1;
	}

	img {
		max-height: 44px;
		max-width: 44px;
		justify-content: center;
		align-self: center;
	}
`;
