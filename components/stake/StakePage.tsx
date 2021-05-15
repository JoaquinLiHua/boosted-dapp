import React from 'react';
import styled from 'styled-components';
import {
	H1,
	PLarge,
	TwoCols,
	PLargeStyles,
	PSmallStyles,
	PStyles,
	PrimaryButton,
	SecondaryButton,
	Spacer,
	GlowText,
} from 'styles/common';

type StakePageProps = {};

const StakePage: React.FC<StakePageProps> = ({}) => {
	return (
		<>
			<TopRow>
				<H1>xORBT</H1>
				<CardInfo>
					Stake your ORBT tokens into the OrbitStation to receive fees generated from purchasing
					Boosters and inflation rewards.
					<br />
					<br />
					xORBT is minted within the OrbitStation with each deposit of ORBT, users will only be able
					to claim their initial stake and rewards 6-months from each deposit. Some pools from the
					liquidity mining initiative automatically deposit for the user on claim.
				</CardInfo>
			</TopRow>
			<Spacer />
			<TwoCols>
				<CardWrapper>
					<UpperCardInfo>
						<PLarge>
							Stake <GlowText>ORBT</GlowText> into OrbitStation (6-month vesting period)
						</PLarge>
					</UpperCardInfo>
					<LowerCardInfo>
						<TextLine>
							<Left>Your xORBT shares</Left>
							<Right>11,000</Right>
						</TextLine>
						<TextLine>
							<Left>Your ORBT balance</Left>
							<Right>10,000</Right>
						</TextLine>
						<PoolButtons>
							<PoolButton onClick={() => {}}>Deposit & Lock</PoolButton>
							<PoolButtonSecondary onClick={() => {}}>Vest</PoolButtonSecondary>
						</PoolButtons>
					</LowerCardInfo>
				</CardWrapper>
				<CardWrapper>
					<UpperCardInfo>
						<PLarge>
							<GlowText>OrbitStation</GlowText> Statistics
						</PLarge>
					</UpperCardInfo>
					<LowerCardInfo>
						<TextLine>
							<Left>Rewards & Fees APY</Left>
							<Right>120%</Right>
						</TextLine>
						<TextLine>
							<Left>ORBT:xORBT</Left>
							<Right>1:1.12</Right>
						</TextLine>
						<TextLine>
							<Left>Total ORBT Staked</Left>
							<Right>100,000</Right>
						</TextLine>
						<TextLine>
							<Left>Total xORBT Supply</Left>
							<Right>500,000</Right>
						</TextLine>
					</LowerCardInfo>
				</CardWrapper>
			</TwoCols>
			<CardWrapper>
				<UpperCardInfo>
					<PLarge>
						Your <GlowText>Vesting</GlowText> Schedule
					</PLarge>
				</UpperCardInfo>
				<LowerCardInfo>
					<TextLine>
						<Left>01/02/21 - 11,000 xORBT</Left>
						<Right>
							<GlowText>Claimable</GlowText>
						</Right>
					</TextLine>
					<TextLine>
						<Left>01/02/21 - 1980 xORBT</Left>
						<Right>Locked until 01/08/21</Right>
					</TextLine>
				</LowerCardInfo>
			</CardWrapper>
		</>
	);
};
export default StakePage;

const TopRow = styled.div``;

const CardWrapper = styled.div`
	background: #131720;
	box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.darkBlue};
	border: 2px solid ${(props) => props.theme.colors.darkBlue};
	border-radius: 8px;
	margin-bottom: 24px;
	transition: all 0.1s ease-in-out;
`;

const UpperCardInfo = styled.div`
	background: #122432;
	border-radius: 8px 8px 0 0;
	padding: 18px 36px 16px 36px;
`;

const LowerCardInfo = styled.div`
	padding: 18px 36px 32px 36px;
`;

const CardInfo = styled.p`
	${PLargeStyles}
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

const TextLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 2px;
	margin-bottom: 2px;
	width: 100%;
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
