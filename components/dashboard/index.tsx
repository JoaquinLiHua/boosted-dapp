import React from 'react';
import styled from 'styled-components';
import { useTotalValueLocked } from 'old hooks/general/useTotalValueLocked';
import { useGetTotalRewardAmount } from 'old hooks/general/useGetTotalRewardAmount';
import { getDisplayBalance } from 'utils/formatBalance';

import BoostToken from 'contracts/BoostToken';

import { Card } from 'components/general/Card';
import { H1, TwoCols, ThreeCols, PositiveNumber, NegativeNumber, Spacer } from 'styles/common';

import { formatPercent, formatNumber } from 'utils/number';

import useERC20BalanceQuery from 'queries/token/useERC20BalanceQuery';
import useTotalSupplyQuery from 'queries/token/useTotalSupplyQuery';
import useTokenPriceQuery from 'queries/price/useTokenPriceQuery';
import useTreasuryValueQuery from 'queries/treasury/useTreasuryValueQuery';

const Dashboard: React.FC = () => {
	const balance = useERC20BalanceQuery(BoostToken);
	const boostTotalSupply = useTotalSupplyQuery(BoostToken);

	// @TODO: Substitute for query
	const orbitTotalSupply = '0';

	const boostPrice = useTokenPriceQuery(BoostToken.address);

	const orbitPrice = {
		data: {
			priceInUSD: 0,
			dailyChangePercent: 0,
		},
	};

	const treasuryValue = useTreasuryValueQuery();

	// const totalValueLocked: string = useTotalValueLocked();

	const returnPriceHUD = (
		label: string,
		price: number | undefined,
		dailyChangePercent: number | undefined
	) => {
		if (price && dailyChangePercent) {
			return (
				<li>
					<strong>{label}</strong>: ${price}
					{dailyChangePercent > 0 ? (
						<PositiveNumber>{formatPercent(dailyChangePercent)}%</PositiveNumber>
					) : (
						<NegativeNumber>{formatPercent(dailyChangePercent)}%</NegativeNumber>
					)}
				</li>
			);
		} else {
			return null;
		}
	};

	const returnPriceBox = (
		label: string,
		price: number | undefined,
		dailyChangePercent: number | undefined
	) => {
		if (price && dailyChangePercent) {
			return (
				<Card
					title={`${label} token price`}
					value={`$${price} USD`}
					priceChangeComponent={[
						<DailyWeeklyMonthlyPrice>
							<p>
								24H:{' '}
								{dailyChangePercent >= 0 ? (
									<PositiveNumber>{formatPercent(dailyChangePercent)}%</PositiveNumber>
								) : (
									<NegativeNumber>{formatPercent(dailyChangePercent)}%</NegativeNumber>
								)}
							</p>
						</DailyWeeklyMonthlyPrice>,
					]}
					alwaysShow
				/>
			);
		} else {
			return null;
		}
	};

	return (
		<>
			<TopRow>
				<H1>Dashboard</H1>
				<ul>
					{returnPriceHUD(
						'BOOST',
						boostPrice.data?.priceInUSD,
						boostPrice.data?.dailyChangePercent
					)}
					{returnPriceHUD(
						'ORBIT',
						orbitPrice.data?.priceInUSD,
						orbitPrice.data?.dailyChangePercent
					)}
				</ul>
			</TopRow>

			<TwoCols>
				<Card
					title="Your BOOST balance"
					helpCopy="to see your BOOST balance"
					value={balance.data ?? '0'}
				/>
				<Card
					title="Your unclaimed rewards"
					helpCopy="to see your unclaimed rewards"
					value={balance.data ?? '0'}
				/>
			</TwoCols>

			{/* <Card title="Your Pools & Vaults" helpCopy="to see which Pools & Vaults you participate in" /> */}

			<Spacer />

			<ThreeCols>
				<Card
					title="Total value locked"
					value="$2,217,532 USD"
					helpCopy="USD value locked in all BOOST/ORBT contracts"
					alwaysShow
				/>
				<Card
					title="Total BOOST supply"
					helpCopy="total supply of BOOST tokens"
					value={boostTotalSupply.isSuccess ? formatNumber(boostTotalSupply.data) : '0'}
					alwaysShow
				/>
				<Card
					title="Total ORBIT supply"
					helpCopy="total supply of ORBIT tokens"
					value={orbitTotalSupply}
					alwaysShow
				/>

				<Card
					title="Treasury value"
					value={`$${treasuryValue.data?.toString()} USD`}
					helpCopy="USD value of the BOOST DAO"
					alwaysShow
				/>
				{returnPriceBox('BOOST', boostPrice.data?.priceInUSD, boostPrice.data?.dailyChangePercent)}
				{returnPriceBox('ORBIT', orbitPrice.data?.priceInUSD, orbitPrice.data?.dailyChangePercent)}
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
