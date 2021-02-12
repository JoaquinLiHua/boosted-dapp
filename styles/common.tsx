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
	max-width: 1680px;
	width: calc(100% - 48px);
	margin: 0 auto;
	color: ${(props) => props.theme.colors.white};
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

export const H1Styles= css`
	font-size: ${(props) => props.theme.fontSize.h1};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	color: ${(props) => props.theme.colors.white};
	letter-spacing: 0;
	line-height: 120%;
`;
export const H1 = styled.h1`
	${H1Styles}
`;


export const H2Styles = css`
	font-size: ${(props) => props.theme.fontSize.h2};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;
export const H2 = styled.h2`
	${H2Styles}
`;


export const H3Styles = css`
	font-size: ${(props) => props.theme.fontSize.h3};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;
export const H3 = styled.h3`
	${H3Styles}
`;


export const H4Styles = css`
	font-size: ${(props) => props.theme.fontSize.h4};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	color: ${(props) => props.theme.colors.white};
`;
export const H4 = styled.h4`
	${H4Styles}
`;


export const H5Styles = css`
`;
export const H5 = styled.h5`
	${H5Styles}
`;


export const H6Styles = css`
	letter-spacing: 1px;
	font-size: ${(props) => props.theme.fontSize.h6};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	color: ${(props) => props.theme.colors.purple};
	line-height: 120%;
	text-transform: uppercase;
`;
export const H6 = styled.h6`
	${H6Styles}
`;


export const PLargeStyles = css`
	font-size: ${(props) => props.theme.fontSize.pLarge};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	line-height: 150%;
`;
export const PLarge = styled.p`
	${PLargeStyles}
`;


export const PStyles = css`
	font-size: ${(props) => props.theme.fontSize.p};
	font-family: ${(props) => props.theme.fonts.interMedium};
	line-height: 170%;
`;
export const P = styled.p`
	${PStyles}
`;


export const PSmallStyles = css`
	letter-spacing: 0.2px;
	line-height: 150%;
	font-size: ${(props) => props.theme.fontSize.pSmall};
	font-family: ${(props) => props.theme.fonts.interMedium};
	color: ${(props) => props.theme.colors.purple};
`;
export const PSmall = styled.p`
	${PSmallStyles}
`;


// Typography styling

export const PositiveNumber = styled.span`
	color: ${(props) => props.theme.colors.green};
`;

export const NegativeNumber = styled.span`
	color: ${(props) => props.theme.colors.red};
`;

export const GlowText = styled.span`
	color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: ${(props) => props.theme.global.textShadowGlow};
`;

// Buttons & Links

export const GlowTextLink = styled.a`
	color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: ${(props) => props.theme.global.textShadowGlow};
	text-decoration: none;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	font-size: 15px;

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;


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
		box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.darkBlue};
	}
`;

export const PrimaryButton = styled.a`
	${Button}
	background: ${(props) => props.theme.colors.darkBlue};
`;

export const SecondaryButton = styled.a`
	${Button}
	color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: 0 0 16px rgba(86,199,246,0.50);
	background: ${(props) => props.theme.colors.background};
	border: 2px solid ${(props) => props.theme.colors.darkBlue};
	border-radius: 4px;

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	&:hover {
		color: ${(props) => props.theme.colors.white};
		background: ${(props) => props.theme.colors.background};
		box-shadow: 0 0 8px 0 ${(props) => props.theme.colors.darkBlue};
	}
`;


// Search & dropdowns

export const SearchField = styled.input`
	width: 100%;
	background: ${(props) => props.theme.colors.navy};
	border-radius: 24px;
	color: ${(props) => props.theme.colors.white};
	height: 48px;
	padding: 24px;
	border: none;
	font-family: ${(props) => props.theme.fonts.interMedium};
	font-size: 14px;
	color: ${(props) => props.theme.colors.white};
	background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(1 1)' stroke='%23FFF' stroke-width='2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='5.25' cy='5.25' r='5.25'/%3E%3Cpath d='M12.75 12.75L8.986 8.986'/%3E%3C/g%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: 20px center;
	padding-left: 48px;

	&:active,
	&:focus {
		outline: none;
	}
`;

export const Dropdown = styled.select`
	max-width: 200px;
	width: 100%;
	background: ${(props) => props.theme.colors.navy};
	border-radius: 24px;
	color: ${(props) => props.theme.colors.white};
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