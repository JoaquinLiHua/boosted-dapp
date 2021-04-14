import React, { useMemo } from 'react';
import styled from 'styled-components';
import { PoolCard } from './PoolCard';

import { H1, ThreeCols, Spacer, SearchField, Dropdown } from 'styles/common';
import useTokenLists from 'queries/useTokenLists';

import ETHIcon from 'assets/svg/eth.svg';
import BOOSTIcon from 'assets/svg/boost.svg';
import { CryptoCurrencies } from 'constants/cryptocurrencies';

export const Pools: React.FC = () => {
	const tokenLists = useTokenLists();

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
							// @TODO: add orbit icon
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
				<H1>Pools</H1>
				<PoolSearchWrapper>
					<PoolSearch type="search" placeholder="Search pools.."></PoolSearch>
					<PoolDropdown name="pools" id="pools">
						<option value="all" selected>
							All pools
						</option>
						<option value="closed">Closed pools</option>
						<option value="closed">Another pool option</option>
					</PoolDropdown>
				</PoolSearchWrapper>
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

const PoolSearchWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const PoolSearch = styled(SearchField)`
	border-radius: 24px 0 0 24px;
	width: calc(100% - 203px);
`;

const PoolDropdown = styled(Dropdown)`
	border-radius: 0 24px 24px 0;
`;
