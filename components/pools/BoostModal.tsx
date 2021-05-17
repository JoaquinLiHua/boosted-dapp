import BaseModal from 'components/general/Modal';
import React from 'react';
import styled from 'styled-components';
import {
	H6Styles,
	MediumSpacer,
	PrimaryButton,
	PSmallStyles,
	PStyles,
	H2Styles,
	Spacer,
} from 'styles/common';

type BoostModalProps = {
	open: boolean;
	setOpen: (value: boolean) => void;
	firstLogoURL: any;
	secondLogoURL?: any;
	tokenPair: string;
};

const BoostModal: React.FC<BoostModalProps> = ({
	open,
	setOpen,
	firstLogoURL,
	secondLogoURL,
	tokenPair,
}) => {
	return (
		<StyledBaseModal title="Boost your yield" isOpen={open} onDismiss={() => setOpen(false)}>
			<TextLine>
				<InputTitle>Amount</InputTitle>
				<RightModal>Balance: 0</RightModal>
			</TextLine>

			<InputWrapper>
				<TextLine>
					<Left>Pool token</Left>
					<Right>≈ $0.00</Right>
				</TextLine>
				<TextLine>
					<LogoWrapperInput>
						<LogoInput>
							<img src={firstLogoURL} />
						</LogoInput>
						{secondLogoURL && (
							<LogoInput>
								<img src={secondLogoURL} />
							</LogoInput>
						)}
						<TokenPool>{tokenPair}</TokenPool>
					</LogoWrapperInput>
					<input type="number" placeholder="0" />
				</TextLine>
			</InputWrapper>

			<MediumSpacer />

			<TextLine>
				<InputTitle>Your stake</InputTitle>
				<RightModalBig>1,000</RightModalBig>
			</TextLine>
			<ThreeColWrapper>
				<p>Daily earnings</p>
				<p>200 INCH</p>
				<p>$5321.00</p>
			</ThreeColWrapper>
			<ThreeColWrapper>
				<p>Monthly earnings</p>
				<p>2901 INCH</p>
				<p>$25,321.27</p>
			</ThreeColWrapper>
			<ThreeColWrapper>
				<p>Yearly earnings</p>
				<p>2901 INCH</p>
				<p>$25,321.27</p>
			</ThreeColWrapper>

			<Spacer />

			<ModalButtons>
				<ModalButton>Withdraw</ModalButton>
				<ModalButton>Exit</ModalButton>
			</ModalButtons>
		</StyledBaseModal>
	);
};
export default BoostModal;

const StyledBaseModal = styled(BaseModal)``;

const TextLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-top: 2px;
	margin-bottom: 2px;
	width: 100%;
`;

const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 16px 0 32px;
`;

const Logo = styled.div`
	background: white;
	border-radius: 50%;
	display: flex;
	align-items: flex-start;
	padding: 4px;
	position: relative;
	z-index: 2;
	border: 1px solid ${(props) => props.theme.colors.darkBlue};
	box-shadow: 0 0 8px 0 rgba(86, 199, 246, 0.5);

	:nth-of-type(2) {
		margin-left: -8px;
		z-index: 1;
	}

	img {
		height: 44px;
		width: 44px;
		justify-content: center;
		align-self: center;
	}
`;

const LogoWrapperInput = styled(LogoWrapper)`
	margin: 6px 0 0;
	align-items: center;
`;

const LogoInput = styled(Logo)`
	:last-of-type {
		margin-right: 12px;
	}

	img {
		max-height: 24px;
		max-width: 24px;
	}
`;

const InputTitle = styled.p`
	${H6Styles}
	margin-top: 0;
`;

const TokenPool = styled.p`
	font-size: 15px;
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	margin-top: 0;
	margin-bottom: 0;
`;

const InputWrapper = styled.div`
	background: #131720;
	padding: 12px 24px 8px;
	border-radius: 4px;

	input {
		font-size: 20px;
		appearance: none;
		background: none;
		font-family: ${(props) => props.theme.fonts.interSemiBold};
		border: 0;
		outline: 0;
		height: 40px;
		color: ${(props) => props.theme.colors.white};
		padding: 0;
		text-align: right;
		flex: 1 0 auto;
		top: -5px;
		position: relative;
		margin-left: 12px;
	}
`;

const ModalButton = styled(PrimaryButton)`
	padding: 16px 24px;
	font-size: 16px;
`;

const ThreeColWrapper = styled.div`
	margin-left: 24px;
	margin-right: 24px;
	display: flex;
	justify-content: space-between;

	p {
		font-size: 14px;
		margin: 4px 0;
		color: ${(props) => props.theme.colors.white};
		font-family: ${(props) => props.theme.fonts.interSemiBold};
		width: 33.33%;

		:first-of-type {
			color: ${(props) => props.theme.colors.gray};
			font-size: 13px;
			text-align: left;
		}

		:nth-of-type(2),
		:nth-of-type(3) {
			text-align: right;
		}
	}
`;

const PoolButtons = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 36px;
`;

const ModalButtons = styled(PoolButtons)`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 36px;

	a {
		width: calc(50% - 12px);
	}
`;

const Right = styled.p`
	${PStyles}
	float: right;
	text-align: right;
	margin-bottom: 0;
	margin-top: 0;
`;

const RightModal = styled(Right)`
	margin-right: 24px;
`;

const RightModalBig = styled(RightModal)`
	${H2Styles}
`;

const Left = styled.p`
	${PSmallStyles}
	float: left;
	margin-bottom: 0;
	margin-top: 0;
`;
