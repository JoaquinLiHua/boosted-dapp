import React from 'react';
import styled from 'styled-components';

import { H3 } from 'styles/common';

export const ProposalRow = (props) => {
	const {
		proposalTitle,
		proposalID,
		proposalDate,
		proposalStatus,
		href,
	} = props;
	return (
		<RowWrapper href={href} >
			<Info>
				<ProposalTitle>{proposalTitle}</ProposalTitle>
				<P>{proposalID} • {proposalStatus} on {proposalDate}</P>
			</Info>
			<Status>{proposalStatus}</Status>
		</RowWrapper>
	);
};

const RowWrapper = styled.a`
	background: #131720;
	border: 1px solid #394760;
	border-radius: 8px;
	padding: 4px 36px 22px 36px;
	margin: 0;
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	text-decoration: none;
	flex-wrap: wrap;

	h3 {
		color: white;
	}

	p {
		color: #adb2d6;
	}

	&:hover {
	}
`;

const Status = styled.p`
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	font-size: 13px;
`;

const ProposalTitle = styled(H3)`
	margin: 0;
`;

const P = styled.p`
	margin-top: 0px;
	margin-bottom: 0px;
	font-size: 13px;
	letter-spacing: 0.2px;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interMedium};
`;

const Info = styled.div`
`;
