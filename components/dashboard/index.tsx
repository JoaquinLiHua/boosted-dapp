import React from 'react';
import styled from 'styled-components';
import { boostToken } from 'constants/bfAddresses';
import { useTokenBalance } from 'hooks/erc20/useTokenBalance';
import { useTotalSupply } from 'hooks/erc20/useTotalSupply';
import { useTreasuryBalance } from 'hooks/general/useTreasuryBalance';
import { useTotalValueLocked } from 'hooks/general/useTotalValueLocked';
import { useGetTotalRewardAmount } from 'hooks/general/useGetTotalRewardAmount';
import { useBoostPrice } from 'hooks/pools/useBoostPrice';
import { getDisplayBalance } from 'utils/formatBalance';

import { Card } from 'components/general/Card';
import { H1, TwoCols, ThreeCols, PositiveNumber, NegativeNumber, Spacer } from 'styles/common';
import useERC20Balance from 'queries/useERC20Balance';

const Dashboard: React.FC = () => {
	const balance = useERC20Balance();

	// const boostBalance: string = getDisplayBalance(useTokenBalance(boostToken));
	// const totalRewardsAvailable: string = getDisplayBalance(useGetTotalRewardAmount());
	// const boostTotalSupply: string = getDisplayBalance(useTotalSupply(boostToken));
	// const treasuryBalance: string = getDisplayBalance(useTreasuryBalance());
	// const totalValueLocked: string = useTotalValueLocked();
	// const boostPrice: string = useBoostPrice();

	return (
		<>
			<TopRow>
				<H1>Dashboard</H1>
				<ul>
					<li>
						<strong>BOOST</strong>: $15.19 <PositiveNumber>+5.70%</PositiveNumber>
					</li>
					<li>
						<strong>ORBIT</strong>: $10.67 <NegativeNumber>-4.12%</NegativeNumber>
					</li>
				</ul>
			</TopRow>

			<TwoCols>
				<Card title="Your BOOST balance" help="to see your BOOST balance" />
				<Card title="Your unclaimed rewards" help="to see your unclaimed rewards" />
			</TwoCols>

			<Card title="Your Pools & Vaults" help="to see which Pools & Vaults you participate in" />

			<Spacer />

			<ThreeCols>
				<Card
					title="Total value locked"
					value="$2,217,532 USD"
					help={[
						<DailyWeeklyMonthlyPrice>
							<p>
								24H: <PositiveNumber>+4,29%</PositiveNumber>
							</p>
							<p>
								7D: <PositiveNumber>+24,42%</PositiveNumber>
							</p>
							<p>
								30D: +<NegativeNumber>21.02%</NegativeNumber>
							</p>
						</DailyWeeklyMonthlyPrice>,
					]}
				/>
				<Card title="Total BOOST supply" value="98,589 BOOST" help="total supply of BOOST tokens" />
				<Card title="Total ORBIT supply" value="100B ORBIT" help="total supply of ORBIT tokens" />

				<Card
					title="Treasury value"
					value="$1,453,872 USD"
					help={[
						<DailyWeeklyMonthlyPrice>
							<p>
								24H: <PositiveNumber>+4,29%</PositiveNumber>
							</p>
							<p>
								7D: <PositiveNumber>+24,42%</PositiveNumber>
							</p>
							<p>
								30D: +<NegativeNumber>21.02%</NegativeNumber>
							</p>
						</DailyWeeklyMonthlyPrice>,
					]}
				/>
				<Card
					title="BOOST token price"
					value="$15.19 USD"
					help={[
						<DailyWeeklyMonthlyPrice>
							<p>
								24H: <PositiveNumber>+4,29%</PositiveNumber>
							</p>
							<p>
								7D: <PositiveNumber>+24,42%</PositiveNumber>
							</p>
							<p>
								30D: +<NegativeNumber>21.02%</NegativeNumber>
							</p>
						</DailyWeeklyMonthlyPrice>,
					]}
				/>
				<Card
					title="ORBIT token price"
					value="$10.67 USD"
					help={[
						<DailyWeeklyMonthlyPrice>
							<p>
								24H: <PositiveNumber>+4,29%</PositiveNumber>
							</p>
							<p>
								7D: <PositiveNumber>+24,42%</PositiveNumber>
							</p>
							<p>
								30D: +<NegativeNumber>21.02%</NegativeNumber>
							</p>
						</DailyWeeklyMonthlyPrice>,
					]}
				/>
			</ThreeCols>
		</>
	);
};

export default Dashboard;

const TopRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	flex-wrap: wrap;

	ul,
	li {
		list-style-type: none;
		display: inline-block;
		font-size: ${(props) => props.theme.fontSize.pSmall};
		font-family: ${(props) => props.theme.fonts.interMedium};
		letter-spacing: 0.2px;
		line-height: 24px;
	}

	li:first-of-type {
		margin-right: 24px;
	}
`;

export const DailyWeeklyMonthlyPrice = styled.div`
	display: flex;
	justify-content: space-between;

	p {
		margin-top: 0;
		margin-bottom: 0;
	}
`;
