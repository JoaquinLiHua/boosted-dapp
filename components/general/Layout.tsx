import React from 'react';
import styled from 'styled-components';
import NextLink from 'next/link';
import { WalletMenu } from './WalletMenu';
import { FlexDivRowCentered, MainColumn } from 'styles/common';

import SideNav from './SideNav';
import { ExternalLink } from './ExternalLink';
import { device } from 'styles/common';

import Logo from 'assets/svg/logo.svg';
import SolarSystem from 'assets/svg/solar-system.svg';
import Stars from 'assets/svg/stars.svg';

type LayoutProps = {};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<LayoutWrapper>
			<BackgroundWrapper>
				<SolarSystemContainer>
					<img src={SolarSystem} />
				</SolarSystemContainer>
				<StarContainer>
					<img src={Stars} />
				</StarContainer>
			</BackgroundWrapper>

			{/* Top navigation */}
			<HeaderContainer>
				<NextLink href="/">
					<img src={Logo} />
				</NextLink>
				<TopRight>
					<StyledDiscordLink href="https://discord.gg/gp9bsaQ">Join our Discord!</StyledDiscordLink>
					<WalletMenu />
				</TopRight>
			</HeaderContainer>

			{/* One more wrapper so we can use Flex put the divs side-by-side easily */}
			<SideMainWrapper>
				{/* Side navigation */}
				<SideNav />
				{/* Page content */}
				<MainColumn>{children}</MainColumn>
			</SideMainWrapper>
		</LayoutWrapper>
	);
};
export default Layout;

const BackgroundWrapper = styled.div`
	position: relative;
`;

const SolarSystemContainer = styled.div`
	position: absolute;
	top: -100;
	left: 25%;
	display: none;

	@media ${device.tablet} {
		display: block;
	}
`;

const StarContainer = styled.div`
	position: absolute;
	right: 0;
	top: 0;
`;

const HeaderContainer = styled.header`
	display: flex;
	position: relative;
	justify-content: space-between;
	padding: 48px 48px 27px 48px;
`;

const StyledDiscordLink = styled(ExternalLink)`
	font-family: ${(props) => props.theme.fonts.interMedium};
	color: ${(props) => props.theme.colors.gray};
	margin-right: 8px;
	text-decoration: none;
	font-size: ${(props) => props.theme.fontSize.pLarge};

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

const SideMainWrapper = styled.div`
	position: relative;
	display: flex;
	padding: 0;

	@media ${device.tablet} {
		padding: 0 48px;
	}
`;

const LayoutWrapper = styled.div`
	background: ${(props) => props.theme.colors.background};
	min-height: 100vh;
	position: relative;
	padding-bottom: 96px;
`;

const TopRight = styled(FlexDivRowCentered)``;
