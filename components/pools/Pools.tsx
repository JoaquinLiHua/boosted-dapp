import React from 'react';
import styled from 'styled-components';
import { PoolCard } from './PoolCard';

import { H1, ThreeCols, Spacer } from 'styles/common';

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

const PoolSearch = styled.input`
	width: calc(100% - 203px);
	background: #262f40;
	border-radius: 24px 0 0 24px;
	color: white;
	height: 48px;
	padding: 24px;
	border: none;
	font-family: ${(props) => props.theme.fonts.interMedium};
	font-size: 14px;
	color: #ffffff;
	background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(1 1)' stroke='%23FFF' stroke-width='2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='5.25' cy='5.25' r='5.25'/%3E%3Cpath d='M12.75 12.75L8.986 8.986'/%3E%3C/g%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: 20px center;
	padding-left: 48px;

	&:active,
	&:focus {
		outline: none;
	}
`;

const PoolDropdown = styled.select`
	max-width: 200px;
	width: 100%;
	background: #262f40;
	border-radius: 0 24px 24px 0;
	color: white;
	height: 48px;
	padding: 0 18px;
	border: none;
	outline: none;
	font-family: ${(props) => props.theme.fonts.interMedium};

	-moz-appearance: none; 
	-moz-appearance: none; 
	-webkit-appearance: none; 
	appearance: none;

	background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23FFF' stroke-width='2' d='M.9999999 1.772971l4.77297077 4.77297077L10.54594145 1.772971' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 20px center;
`;
