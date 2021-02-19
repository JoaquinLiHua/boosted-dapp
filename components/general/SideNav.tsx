import React from 'react';
import NextLink from 'next/link';
import styled, { css } from 'styled-components';
import { Spacer, device } from 'styles/common';
import { ROUTES, ROUTESSECONDARY } from 'constants/routes';
import { useRouter } from 'next/router';
import { ExternalLink } from 'components/general/ExternalLink';
import { Svg } from 'react-optimized-image';

import LogoMedium from 'assets/svg/logoMedium.svg';
import LogoTwitter from 'assets/svg/logoTwitter.svg';
import LogoDiscord from 'assets/svg/logoDiscord.svg';
import LogoGithub from 'assets/svg/logoGithub.svg';

type SideNavProps = {};

const SideNav: React.FC<SideNavProps> = ({}) => {
	const { route } = useRouter();

	return (
		<Container>
			{ROUTES.map((element, key) => (
				<NextLink key={key} href={element.link}>
					<Item active={route === element.link}>{element.copy}</Item>
				</NextLink>
			))}

			<Spacer />

			{ROUTESSECONDARY.map((element, key) => (
				<NextLink key={key} href={element.link}>
					<SecondaryItem active={route === element.link}>{element.copy}</SecondaryItem>
				</NextLink>
			))}

			<Line />

			<ExternalLinks>
				<ul>
					<li>
						<ExternalLink href="https://info.uniswap.org/pair/0x6b4a0bd2eee3ca06652f758844937daf91ea8422">BOOST-ETH in Uniswap</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://etherscan.io/token/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78">BOOST contract address</ExternalLink>
					</li>
					<li>
						<ExternalLink href="#">ORBIT contract address</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://etherscan.io/address/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78">Official BOOST token</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://coinmarketcap.com/currencies/boosted-finance/">CoinmarketCap</ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://www.coingecko.com/en/coins/boosted-finance">CoinGecko</ExternalLink>
					</li>
				</ul>
			</ExternalLinks>

			{/* WIP */}
			<SocialMediaLinks>
				<ul>
					<li>
						<ExternalLink href="https://boostedfinance.medium.com/"><Svg src={LogoMedium} /></ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://twitter.com/BoostedFinance"><Svg src={LogoTwitter} /></ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://discord.com/invite/gp9bsaQ"><Svg src={LogoDiscord} /></ExternalLink>
					</li>
					<li>
						<ExternalLink href="https://github.com/Boosted-Finance"><Svg src={LogoGithub} /></ExternalLink>
					</li>
				</ul>
			</SocialMediaLinks>
		</Container>
	);
};

export default SideNav;

const Container = styled.aside`
	padding: 0 48px 48px 0;
	margin-top: 21px;
	max-width: 260px;
	width: 100%;
	display: none;

	@media ${device.tablet} {
		display: block;
	}
`;

const Line = styled.hr`
	margin-top: 24px;
	border: 0;
	background-color: ${(props) => props.theme.colors.lightNavy};
	height: 1px;
`;

const ExternalLinks = styled.div`
	margin-top: 24px;

	a {
		color: ${(props) => props.theme.colors.gray};
		font-family: ${(props) => props.theme.fonts.interMedium};
		text-decoration: none;
		font-size: ${(props) => props.theme.fontSize.pSmall};
		line-height: 24px;

		&:hover {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

const SocialMediaLinks = styled.div`
  margin-top: 24px;

  ul, li {
    list-style-type; none;
    display: inline-block;

    & li {
			margin-right: 8px;

			:first-of-type {
				padding-left: 0;
			}
    }
  }

	a {
		padding: 6px;
		
		path {
			fill: ${(props) => props.theme.colors.gray};
		}

		&:hover {
			path {
				fill: ${(props) => props.theme.colors.white};
			}
		}
	}


`;

const Item = styled.div<{ active: boolean }>`
	color: ${(props) => (props.active ? props.theme.colors.white : props.theme.colors.gray)};
	font-family: ${(props) => props.theme.fonts.interMedium};
	font-size: ${(props) => props.theme.fontSize.h2};
	margin-bottom: 8px;
	cursor: pointer;

	&:before {
		content: '';
		display: ${(props) => (props.active ? 'inline-block' : 'none')};
		width: 6px;
		height: 6px;
		background-color: ${(props) => props.theme.colors.darkBlue};
		border-radius: 50%;
		position: relative;
		margin-left: -12px;
		margin-right: 6px;
		top: -3px;
	}

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

const SecondaryItem = styled.div<{ active: boolean }>`
	color: ${(props) => (props.active ? props.theme.colors.white : props.theme.colors.gray)};
	font-family: ${(props) => props.theme.fonts.interMedium};
	text-decoration: none;
	font-size: ${(props) => props.theme.fontSize.pSmall};
	line-height: 24px;

	cursor: pointer;

	&:before {
		content: '';
		display: ${(props) => (props.active ? 'inline-block' : 'none')};
		width: 6px;
		height: 6px;
		background-color: ${(props) => props.theme.colors.darkBlue};
		border-radius: 50%;
		position: relative;
		margin-left: -12px;
		margin-right: 6px;
		top: -2px;
	}

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;