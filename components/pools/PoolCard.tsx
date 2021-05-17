import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BaseModal } from '../general/Modal';

import {
	PrimaryButton,
	SecondaryButton,
	GlowText,
	PStyles,
	PLargeStyles,
	PSmallStyles,
	H6Styles,
	H2Styles,
} from 'styles/common';
import WithdrawModal from './WithdrawModal';
import DepositModal from './DepositModal';
import ClaimModal from './ClaimModal';
import BoostModal from './BoostModal';

type PoolCard = {
	tokenPair: string;
	earnedToken: string;
	apy: string;
	totalStaked: string;
	yourStake: string;
	yourRewards: string;
	firstLogoURL: any;
	secondLogoURL?: any;
};

export const PoolCard: React.FC<PoolCard> = ({
	tokenPair,
	earnedToken,
	apy,
	totalStaked,
	yourStake,
	yourRewards,
	firstLogoURL,
	secondLogoURL,
}) => {
	const [showWithdrawDialog, setShowWithdrawDialog] = useState<boolean>(false);
	const [showDepositDialog, setShowDepositDialog] = useState<boolean>(false);
	const [showBoostDialog, setShowBoostDialog] = useState<boolean>(false);
	const [showClaimDialog, setShowClaimDialog] = useState<boolean>(false);

	return (
		<CardWrapper>
			<UpperPoolInfo>
				<LogoWrapper>
					<Logo>
						<img src={firstLogoURL} />
					</Logo>
					{secondLogoURL && (
						<Logo>
							<img src={secondLogoURL} />
						</Logo>
					)}
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
					<PoolButton onClick={() => setShowDepositDialog(true)}>Deposit</PoolButton>
					<PoolButton onClick={() => setShowBoostDialog(true)}>
						<span>🚀</span> Purchase Booster
					</PoolButton>
					<PoolButtonSecondary onClick={() => setShowWithdrawDialog(true)}>
						Withdraw
					</PoolButtonSecondary>
					<PoolButtonSecondary onClick={() => setShowClaimDialog(true)}>Claim</PoolButtonSecondary>
				</PoolButtons>
			</LowerPoolInfo>

			<WithdrawModal
				{...{
					firstLogoURL,
					secondLogoURL,
					open: showWithdrawDialog,
					setOpen: (value: boolean) => setShowWithdrawDialog(value),
					tokenPair,
				}}
			/>

			<DepositModal
				{...{
					firstLogoURL,
					secondLogoURL,
					open: showDepositDialog,
					setOpen: (value: boolean) => setShowDepositDialog(value),
					tokenPair,
				}}
			/>

			<ClaimModal
				{...{
					firstLogoURL,
					secondLogoURL,
					open: showClaimDialog,
					setOpen: (value: boolean) => setShowClaimDialog(value),
					tokenPair,
				}}
			/>
			<BoostModal
				{...{
					firstLogoURL,
					secondLogoURL,
					open: showBoostDialog,
					setOpen: (value: boolean) => setShowBoostDialog(value),
					tokenPair,
				}}
			/>
		</CardWrapper>
	);
};

const CardWrapper = styled.div`
	background: #131720;
	box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.darkBlue};
	border: 2px solid ${(props) => props.theme.colors.darkBlue};
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
	${PLargeStyles}
`;

const TextLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 2px;
	margin-bottom: 2px;
	width: 100%;
`;

const Left = styled.p`
	${PSmallStyles}
	float: left;
	margin-bottom: 0;
	margin-top: 0;
`;

const Right = styled.p`
	${PStyles}
	float: right;
	text-align: right;
	margin-bottom: 0;
	margin-top: 0;
`;

const RightModal = styled(Right)`
	margin-right: 24px;
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

	span {
		margin-right: 8px;
	}
`;

const PoolButtonSecondary = styled(SecondaryButton)`
	width: calc(50% - 6px);
	margin-bottom: 10px;
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
	border: 1px solid ${(props) => props.theme.colors.darkBlue};
	box-shadow: 0 0 8px 0 rgba(86, 199, 246, 0.5);

	:nth-of-type(2) {
		margin-left: -8px;
		z-index: 1;
	}

	img {
		height: 44px;
		width: 44px;
		justify-content: center;
		align-self: center;
	}
`;
