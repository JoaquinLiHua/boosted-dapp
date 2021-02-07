import { FC, ReactNode } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';
import { Svg } from 'react-optimized-image';
import CrossIcon from 'assets/svg/cross.svg';
import { FlexDivCentered, FlexDivCol } from 'styles/common';

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
			<StyledCard className="card">
				<StyledCardHeader className="card-header">
					{title}
					{showCross && (
						<DismissButton onClick={onDismiss}>
							<Svg src={CrossIcon} />
						</DismissButton>
					)}
				</StyledCardHeader>
				<StyledCardBody className="card-body">{children}</StyledCardBody>
			</StyledCard>
		</StyledDialogContent>
	</StyledDialogOverlay>
);

const StyledDialogOverlay = styled(DialogOverlay)`
	z-index: 50;
	padding: 0px 200px;
	background: hsla(0, 0%, 0%, 0.8);
`;

const StyledDialogContent = styled(DialogContent)`
	padding: 0;
	border: 0;
	background: ${(props) => props.theme.colors.navy};
`;

const StyledCard = styled.div`
	height: 100%;
	background: ${(props) => props.theme.colors.navy};
	display: flex;
	flex-direction: column;
	border-radius: 4px;
`;

const StyledCardHeader = styled(FlexDivCentered)`
	justify-content: center;
	height: 48px;
	position: relative;
	color: ${(props) => props.theme.colors.white};
	border-bottom: 1px solid ${(props) => props.theme.colors.grayBlue};
	height: 32px;
	padding: 0 18px;
	justify-content: flex-start;
	text-transform: capitalize;
	font-family: ${(props) => props.theme.fonts.interBold};
	font-size: 12px;
	flex-shrink: 0;
`;

const StyledCardBody = styled(FlexDivCol)`
	position: relative;
	padding: 12px 18px;
`;

const DismissButton = styled.div`
	border: none;
	background: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	position: absolute;
	right: 20px;
	color: ${(props) => props.theme.colors.white};
	background: 'transparent';
	&:hover {
		color: ${(props) => props.theme.colors.blue};
	}
`;

export default BaseModal;
