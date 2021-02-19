import React from 'react';
import styled from 'styled-components';
import { PoolCard } from './PoolCard';

import { H1, ThreeCols, Spacer, SearchField, Dropdown } from 'styles/common';

export const Pools: React.FC = () => {
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
				<PoolCard
					firstLogoURL="https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"
					secondLogoURL="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png"
					tokenPair="1INCH-DAI"
					earnedToken="1INCH"
					apy="272"
					totalStaked="12,693,766.17"
					yourStake="0.00"
					yourRewards="0.00"
					depositHref="#"
					boostHref="#"
					withdrawHref="#"
					claimHref="#"
				/>

				<PoolCard
					firstLogoURL="https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"
					secondLogoURL="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png"
					tokenPair="DAI-1INCH"
					earnedToken="DAI"
					apy="272"
					totalStaked="12,693,766.17"
					yourStake="0.00"
					yourRewards="0.00"
					depositHref="#"
					boostHref="#"
					withdrawHref="#"
					claimHref="#"
				/>

				<PoolCard
					firstLogoURL="https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"
					secondLogoURL="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png"
					tokenPair="1INCH-DAI"
					earnedToken="1INCH"
					apy="272"
					totalStaked="12,693,766.17"
					yourStake="0.00"
					yourRewards="0.00"
					depositHref="#"
					boostHref="#"
					withdrawHref="#"
					claimHref="#"
				/>

				<PoolCard
					firstLogoURL="https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"
					secondLogoURL="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png"
					tokenPair="1INCH-DAI"
					earnedToken="1INCH"
					apy="272"
					totalStaked="12,693,766.17"
					yourStake="0.00"
					yourRewards="0.00"
					depositHref="#"
					boostHref="#"
					withdrawHref="#"
					claimHref="#"
				/>

				<PoolCard
					firstLogoURL="https://assets.coingecko.com/coins/images/13469/small/1inch-token.png"
					secondLogoURL="https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png"
					tokenPair="1INCH-DAI"
					earnedToken="1INCH"
					apy="272"
					totalStaked="12,693,766.17"
					yourStake="0.00"
					yourRewards="0.00"
					depositHref="#"
					boostHref="#"
					withdrawHref="#"
					claimHref="#"
				/>
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