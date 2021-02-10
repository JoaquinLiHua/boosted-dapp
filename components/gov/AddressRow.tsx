import React from 'react';
import styled from 'styled-components';

import { H3 } from 'styles/common';

export const AddressRow = (props) => {
	const {
		rank,
		address,
		avatarURL,
		votesAvailable,
		voteWeight,
		proposalsVoted,
		href,
	} = props;
	return (
		<RowWrapper href={href}>
			<UserInfo><span>{rank}</span> <img src={avatarURL} /> <span>{address}</span></UserInfo>
			<Votes>{votesAvailable}</Votes>
			<VoteWeight>{voteWeight}</VoteWeight>
			<ProposalsVoted>{proposalsVoted}</ProposalsVoted>
		</RowWrapper>
	);
};

export const AddressRowHead = (props) => {
	const {
		userInfoTitle,
		votesAvailableTitle,
		voteWeightTitle,
		proposalsVotedTitle,
	} = props;
	return (
		<HeadRowWrapper>
			<UserInfo>{userInfoTitle}</UserInfo>
			<Votes>{votesAvailableTitle}</Votes>
			<VoteWeight>{voteWeightTitle}</VoteWeight>
			<ProposalsVoted>{proposalsVotedTitle}</ProposalsVoted>
		</HeadRowWrapper>
	);
};


const HeadRowWrapper = styled.div`
	padding: 0 36px 16px 36px;
	border: none;
	display: grid;
  grid-template-columns: auto 10% 10% 11%;
  gap: 0 16px;
  grid-template-areas: "userInfo votes weight proposalsVoted";

	span, div {
		color: #adb2d6;
		font-size: 13px;
		letter-spacing: 0.2px;
		line-height: 24px;
		font-family: ${(props) => props.theme.fonts.interMedium};
	}
`;

const RowWrapper = styled.a`
	background: #131720;
	border: 1px solid #394760;
	border-radius: 8px;
	padding: 16px 36px 16px 36px;
	margin: 0;
	text-decoration: none;

	display: grid;
  grid-template-columns: auto 10% 10% 11%;
  gap: 0 16px;
  grid-template-areas: "userInfo votes weight proposalsVoted";

	span, div {
		color: #B3B3B3;
		font-size: 13px;
		letter-spacing: 0.2px;
		line-height: 24px;
		font-family: ${(props) => props.theme.fonts.interMedium};
	}

	&:hover {
	}
`;

const P = styled.p`
	margin-top: 0px;
	margin-bottom: 0px;
	font-size: 13px;
	letter-spacing: 0.2px;
	line-height: 24px;
	font-family: ${(props) => props.theme.fonts.interMedium};
`;

const UserInfo = styled.div`
	grid-area: userInfo;
	align-self: center;
	justify-self: start;
	color: white;

		img {
			width: 32px;
			background: white;
			border-radius: 50%;
			margin: 0 12px;
		}

		span:last-of-type {
			color: white;
			font-family: ${(props) => props.theme.fonts.interSemiBold};
		}
`;

const Votes = styled.span`
	grid-area: votes;
	align-self: center;
	justify-self: end;
	text-align: right;
`;

const VoteWeight = styled.span`
	grid-area: weight;
	align-self: center;
	justify-self: end;
	text-align: right;
`;

const ProposalsVoted = styled.span`
	grid-area: proposalsVoted;
	align-self: center;
	justify-self: end;
	text-align: right;
`;