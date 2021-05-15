import React from 'react';
import styled from 'styled-components';

import { H4Styles, PSmallStyles } from 'styles/common';

export const ProposalRow = (props: any) => {
	const { proposalTitle, proposalID, proposalDate, proposalStatus, href } = props;
	return (
		<RowWrapper href={href}>
			<div>
				<ProposalTitle>{proposalTitle}</ProposalTitle>
				<P>
					{proposalID} • {proposalStatus} on {proposalDate}
				</P>
			</div>
			<Status>{proposalStatus}</Status>
		</RowWrapper>
	);
};

const RowWrapper = styled.a`
	background: ${(props) => props.theme.colors.background};
	border: 1px solid ${(props) => props.theme.colors.lightNavy};
	border-radius: 8px;
	padding: 4px 36px 22px 36px;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	text-decoration: none;
	flex-wrap: wrap;
	transition: all 0.1s ease-out;

	&:hover {
		background: ${(props) => props.theme.colors.backgroundHover};
	}
`;

const Status = styled.p`
	${PSmallStyles}
	font-family: ${(props) => props.theme.fonts.interSemiBold};
`;

const ProposalTitle = styled.h4`
	${H4Styles}
	margin: 0;
`;

const P = styled.p`
	${PSmallStyles}
	margin-top: 0px;
	margin-bottom: 0px;
	color: ${(props) => props.theme.colors.gray};
`;
