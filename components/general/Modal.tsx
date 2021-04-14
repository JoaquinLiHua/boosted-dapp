import { FC, ReactNode } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';

import CrossIcon from 'assets/svg/cross.svg';
import { FlexDivCentered, FlexDivCol, H1Styles } from 'styles/common';

type BaseModalProps = {
	title: ReactNode;
	isOpen?: boolean;
	onDismiss: () => void;
	children: ReactNode;
	showCross?: boolean;
};

export const BaseModal: FC<BaseModalProps> = ({
	onDismiss,
	title,
	children,
	isOpen,
	showCross = true,
	...rest
}) => (
	<StyledDialogOverlay onDismiss={onDismiss} isOpen={isOpen} {...rest}>
		<StyledDialogContent aria-label="modal">
			<StyledCard>
				<StyledCardHeader>
					<ModalTitle>{title}</ModalTitle>
					{showCross && (
						<DismissButton onClick={onDismiss}>
							<img src={CrossIcon} />
						</DismissButton>
					)}
				</StyledCardHeader>
				<StyledCardBody>{children}</StyledCardBody>
			</StyledCard>
		</StyledDialogContent>
	</StyledDialogOverlay>
);

const StyledDialogOverlay = styled(DialogOverlay)`
	z-index: 50;
	background: hsla(0, 0%, 0%, 0.8);
`;

const StyledDialogContent = styled(DialogContent)`
	padding: 0;
	border: 0;
	border-radius: 8px;
	width: calc(100% - 24px);
	max-width: 720px;
	margin-left: auto;
	margin-right: auto;
`;

const StyledCard = styled.div`
	height: 100%;
	background: ${(props) => props.theme.colors.navy};
	display: flex;
	flex-direction: column;
	border-radius: 4px;
`;

const StyledCardHeader = styled(FlexDivCentered)`
	position: relative;
	color: ${(props) => props.theme.colors.white};
	padding: 24px 48px 0;
	justify-content: flex-start;
	font-family: ${(props) => props.theme.fonts.interBold};
	font-size: 12px;
	flex-shrink: 0;
`;

const StyledCardBody = styled(FlexDivCol)`
	position: relative;
	padding: 8px 48px 48px;
	color: ${(props) => props.theme.colors.white};
`;

const DismissButton = styled.div`
	border: none;
	background: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	position: absolute;
	right: 24px;
	top: 24px;
	color: ${(props) => props.theme.colors.gray};
	background: 'transparent';

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}

	svg {
		transform: scale(1.33);
	}
`;

const ModalTitle = styled.h3`
	${H1Styles}
`;

export default BaseModal;
