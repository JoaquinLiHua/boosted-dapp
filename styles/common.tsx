import styled, { css } from 'styled-components';

// Responsive breakpoints to get started with so we can use the device variables later in the code

const size = {
	mobile: '420px',
	tablet: '768px',
	laptop: '1440px',
	desktop: '2560px',
};

export const device = {
	mobile: `(min-width: ${size.mobile})`,
	tablet: `(min-width: ${size.tablet})`,
	laptop: `(min-width: ${size.laptop})`,
	desktop: `(min-width: ${size.desktop})`,
};

// Flex

export const FlexDiv = styled.div`
	display: flex;
`;

export const FlexDivCentered = styled(FlexDiv)`
	align-items: center;
`;

export const FlexDivCol = styled(FlexDiv)`
	flex-direction: column;
`;

export const FlexDivColCentered = styled(FlexDivCol)`
	align-items: center;
`;

export const FlexDivRow = styled(FlexDiv)`
	justify-content: space-between;
`;

export const FlexDivRowCentered = styled(FlexDivRow)`
	align-items: center;
`;

// Columns, wrappers and spaces

export const MainColumn = styled.main`
	max-width: 1100px;
	width: calc(100% - 48px);
	margin: 0 auto;
	color: white;
`;

export const TwoCols = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	> div {
		width: 100%;

		@media ${device.tablet} {
			width: calc(50% - 12px);
		}
	}

	:after {
		content: "";
		height: 0;
  	width: calc(50% - 12px);
	}
`;

export const ThreeCols = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	> div {
		width: 100%;

		@media ${device.tablet} {
			width: calc(33.33% - 12px);
		}
	}

	:after {
		content: "";
		height: 0;
  	width: calc(33.33% - 12px);
	}
`;

export const Spacer = styled.div`
	display: block;
	height: 48px;
`;

export const XSmallSpacer = styled.div`
	display: block;
	height: 8px;
`;

export const SmallSpacer = styled.div`
	display: block;
	height: 16px;
`;

export const MediumSpacer = styled.div`
	display: block;
	height: 32px;
`;

// Typography

export const H1 = styled.h1`
	font-size: 24px;
`;

export const H2 = styled.h2`
	font-size: 18px;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

export const H3 = styled.h3`
	font-size: 15px;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

export const PositiveNumber = styled.span`
	color: #46ff3c;
`;

export const NegativeNumber = styled.span`
	color: #ff3c3c;
`;

export const DailyWeeklyMonthlyPrice = styled.div`
	display: flex;
	justify-content: space-between;

	p {
		margin-top: 0;
		margin-bottom: 0;
	}
`;

export const GlowText = styled.span`
	color: #56c7f6;
	text-shadow: 0 0 8px rgba(86, 199, 246, 0.5);
`;

export const GlowTextLink = styled.a`
	color: #56c7f6;
	text-shadow: 0 0 8px rgba(86, 199, 246, 0.5);
	text-decoration: none;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	font-size: 15px;

	&:hover {
		color: white;
	}
`;

// Buttons

export const Button = css`
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	color: ${(props) => props.theme.colors.white};
	text-decoration: none;
	padding: 13px 24px;
	font-size: 14px;
	border-radius: 4px;
	justify-content: center;
	outline: none;
	border: 0;
	text-align: center;
	line-height: 100%;
	cursor: pointer;
	transition: all 0.1s ease-in-out;

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	&:hover {
		background: #25B7F3;
		box-shadow: 0 0 8px 0 #0c9eda;
	}
`;

export const PrimaryButton = styled.a`
	${Button}
	background: ${(props) => props.theme.colors.darkBlue};
`;

export const SecondaryButton = styled.a`
	${Button}
	color: #56C7F6;
	text-shadow: 0 0 16px rgba(86,199,246,0.50);
	background: #131720;
	border: 2px solid #0C9EDA;
	border-radius: 4px;

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	&:hover {
		color: #B6E7FB;
		background: #131720;
		box-shadow: 0 0 8px 0 #0c9eda;
	}
`;
