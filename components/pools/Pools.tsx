import React, { useMemo } from 'react';
import styled from 'styled-components';

import { H1, ThreeCols, Spacer } from 'styles/common';

import { PoolCard } from './PoolCard';

import useTokenListQuery from 'queries/tokenList/useTokenListQuery';

import { CryptoCurrencies } from 'constants/cryptocurrencies';

import ETHIcon from 'assets/svg/eth.svg';
import BOOSTIcon from 'assets/svg/boost.svg';
import ORBTIcon from 'assets/svg/orbt.svg';

export const Pools: React.FC = () => {
	const tokenLists = useTokenListQuery();

	const pools = useMemo(
		() =>
			tokenLists.data
				? [
						{
							firstLogoURL: ETHIcon,
							secondLogoURL: BOOSTIcon,
							tokenPair: 'BOOST-ETH',
							earnedToken: CryptoCurrencies.ORBT,
							apy: '272',
							totalStaked: '12,693,766.17',
							yourStake: '0.00',
							yourRewards: '0.00',
							depositHref: '#',
							boostHref: '#',
							withdrawHref: '#',
							claimHref: '#',
						},
						{
							firstLogoURL: ETHIcon,
							secondLogoURL: ORBTIcon,
							tokenPair: 'ORBT-ETH',
							earnedToken: CryptoCurrencies.ORBT,
							apy: '272',
							totalStaked: '12,693,766.17',
							yourStake: '0.00',
							yourRewards: '0.00',
							depositHref: '#',
							boostHref: '#',
							withdrawHref: '#',
							claimHref: '#',
						},
						{
							firstLogoURL: tokenLists.data[CryptoCurrencies.USDC].logoURI,
							tokenPair: CryptoCurrencies.USDC,
							earnedToken: CryptoCurrencies.ORBT,
							apy: '272',
							totalStaked: '12,693,766.17',
							yourStake: '0.00',
							yourRewards: '0.00',
							depositHref: '#',
							boostHref: '#',
							withdrawHref: '#',
							claimHref: '#',
						},
						{
							firstLogoURL: tokenLists.data[CryptoCurrencies.ALPHA].logoURI,
							tokenPair: CryptoCurrencies.ALPHA,
							earnedToken: CryptoCurrencies.ORBT,
							apy: '272',
							totalStaked: '12,693,766.17',
							yourStake: '0.00',
							yourRewards: '0.00',
							depositHref: '#',
							boostHref: '#',
							withdrawHref: '#',
							claimHref: '#',
						},
						{
							firstLogoURL: tokenLists.data[CryptoCurrencies.SUSHI].logoURI,
							tokenPair: CryptoCurrencies.SUSHI,
							earnedToken: CryptoCurrencies.ORBT,
							apy: '272',
							totalStaked: '12,693,766.17',
							yourStake: '0.00',
							yourRewards: '0.00',
							depositHref: '#',
							boostHref: '#',
							withdrawHref: '#',
							claimHref: '#',
						},
						{
							firstLogoURL: tokenLists.data[CryptoCurrencies.LINK].logoURI,
							tokenPair: CryptoCurrencies.LINK,
							earnedToken: CryptoCurrencies.ORBT,
							apy: '272',
							totalStaked: '12,693,766.17',
							yourStake: '0.00',
							yourRewards: '0.00',
							depositHref: '#',
							boostHref: '#',
							withdrawHref: '#',
							claimHref: '#',
						},
				  ]
				: [],
		[tokenLists]
	);

	return (
		<>
			<TopRow>
				<H1>Liquidity Mining</H1>
			</TopRow>
			<Spacer />
			<ThreeCols>
				{pools.map((pool, i) => (
					<PoolCard
						key={i}
						firstLogoURL={pool.firstLogoURL}
						secondLogoURL={pool.secondLogoURL}
						tokenPair={pool.tokenPair}
						earnedToken={pool.earnedToken}
						apy={pool.apy}
						totalStaked={pool.totalStaked}
						yourStake={pool.yourStake}
						yourRewards={pool.yourRewards}
						depositHref={pool.depositHref}
						boostHref={pool.boostHref}
						withdrawHref={pool.withdrawHref}
						claimHref={pool.claimHref}
					/>
				))}
			</ThreeCols>
		</>
	);
};

const TopRow = styled.div``;
