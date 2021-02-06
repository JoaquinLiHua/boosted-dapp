import styled from 'styled-components';

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
`;

export const Spacer = styled.div`
	display: block;
	height: 48px;
`;

// Typography

export const H1 = styled.h1`
	font-size: 24px;
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

// Buttons

export const PrimaryButton = styled.a`
	color: ${(props) => props.theme.colors.white};
	background: ${(props) => props.theme.colors.darkBlue};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	text-decoration: none;
	padding: 14px 24px;
	font-size: 15px;
	border-radius: 4px;
	justify-content: center;
	outline: none;
	border: 0;
	box-shadow: 0 0 8px 0 #0c9eda;
	text-align: center;
	line-height: 100%;
`;
