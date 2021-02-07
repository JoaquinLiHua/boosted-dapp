import React from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { FlexDivCol } from 'styles/common';
import { ROUTES } from 'constants/routes';
import { useRouter } from 'next/router';

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
			<SecondaryLinks>
				<ul>
					<li>
						<a href="#">About</a>
					</li>
					<li>
						<a href="#">FAQ</a>
					</li>
					<li>
						<a href="#">Docs</a>
					</li>
					<li>
						<a href="#">Audit</a>
					</li>
				</ul>
			</SecondaryLinks>

			<Line />

			<ExternalLinks>
				<ul>
					<li>
						<a href="#">BOOST-ETH in Uniswap</a>
					</li>
					<li>
						<a href="#">BOOST contract address</a>
					</li>
					<li>
						<a href="#">ORBIT contract address</a>
					</li>
					<li>
						<a href="#">Official BOOST token</a>
					</li>
					<li>
						<a href="#">CoinmarketCap</a>
					</li>
					<li>
						<a href="#">CoinGecko</a>
					</li>
				</ul>
			</ExternalLinks>

			{/* WIP */}
			<SocialMediaLinks>
				<ul>
					<li>
						<a href="#">M</a>
					</li>
					<li>
						<a href="#">T</a>
					</li>
					<li>
						<a href="#">D</a>
					</li>
					<li>
						<a href="#">G</a>
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
`;

const Line = styled.hr`
	margin-top: 24px;
	border: 0;
	background-color: #394760;
	height: 1px;
`;

// FIBBHELP: How can I combine multiple styled-components under one shared style?
const SecondaryLinks = styled.div`
	margin-top: 62px;

	a {
		color: ${(props) => props.theme.colors.gray};
		font-family: ${(props) => props.theme.fonts.interMedium};
		text-decoration: none;
		font-size: 13px;
		line-height: 24px;

		&:hover {
			color: white;
		}
	}
`;

const ExternalLinks = styled.div`
	margin-top: 24px;

	a {
		color: ${(props) => props.theme.colors.gray};
		font-family: ${(props) => props.theme.fonts.interMedium};
		text-decoration: none;
		font-size: 13px;
		line-height: 24px;

		&:hover {
			color: white;
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
    }
  }

  a {
    color: ${(props) => props.theme.colors.gray};
    font-family: ${(props) => props.theme.fonts.interMedium};
    text-decoration: none;
    font-size: 13px;

    &:hover {
      color: white;
    }
  }
`;

const Item = styled.div<{ active: boolean }>`
	color: ${(props) => (props.active ? props.theme.colors.white : props.theme.colors.gray)};
	font-family: ${(props) => props.theme.fonts.interMedium};
	font-size: 18px;
	margin-bottom: 8px;
	cursor: pointer;

	&:before {
		content: '';
		display: ${(props) => (props.active ? 'inline-block' : 'none')};
		width: 6px;
		height: 6px;
		background-color: #0c9eda;
		border-radius: 50%;
		position: relative;
		margin-left: -12px;
		margin-right: 6px;
		top: -3px;
	}

	&:hover {
		color: white;
	}
`;
