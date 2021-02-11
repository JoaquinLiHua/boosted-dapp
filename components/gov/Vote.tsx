import React from 'react';
import styled from 'styled-components';
import { ProposalRow } from './ProposalRow';
import { AddressRow } from './AddressRow';
import { AddressRowHead } from './AddressRow';

import { H1, H2, ThreeCols, SmallSpacer, XSmallSpacer, MediumSpacer, GlowTextLink, H6Styles, H1Styles } from 'styles/common';

export const Vote: React.FC = () => {
	return (
		<>
			<TopRow>
				<H1>Governance</H1>
				<XSmallSpacer />
			</TopRow>

			<ThreeCols>
				<GovernanceCard>
					<CardTitle>Open proposals</CardTitle>
					<CardValue>2</CardValue>
				</GovernanceCard>

				<GovernanceCard>
					<CardTitle>Quorum Amount</CardTitle>
					<CardValue>3582.9880</CardValue>
				</GovernanceCard>

				<GovernanceCard>
					<CardTitle>Your Voting Power</CardTitle>
					<CardValue>4.53%</CardValue>
				</GovernanceCard>
			</ThreeCols>

			<SmallSpacer />
			<H2>Core proposals</H2>
			<XSmallSpacer />
			
			<Proposals>
				<ProposalRow
					href="/gov/pid"
					proposalTitle="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
					proposalID="034"
					proposalDate="December 26th, 2020"
					proposalStatus="Executed"
				/>
				<ProposalRow
					href="/gov/pid"
					proposalTitle="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
					proposalID="034"
					proposalDate="December 26th, 2020"
					proposalStatus="Active"
				/>
				<ProposalRow
					href="/gov/pid"
					proposalTitle="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
					proposalID="034"
					proposalDate="December 26th, 2020"
					proposalStatus="Failed"
				/>
				<ProposalRow
					href="/gov/pid"
					proposalTitle="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
					proposalID="034"
					proposalDate="December 26th, 2020"
					proposalStatus="Canceled"
				/>
				<ProposalRow
					href="/gov/pid"
					proposalTitle="Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
					proposalID="034"
					proposalDate="December 26th, 2020"
					proposalStatus="Executed"
				/>
			</Proposals>

			<MediumSpacer />
			<GlowTextLink href="/gov/pid">› View all Core proposals</GlowTextLink>

			<MediumSpacer />
			<H2>Top addresses by voting weight</H2>

			<Addresses>

				<AddressRowHead
					userInfoTitle="Rank"
					votesAvailableTitle="Votes"
					voteWeightTitle="Vote weight"
					proposalsVotedTitle="Proposals voted"
				/>

				<AddressRow
					href="/gov/pid"
					rank="1"
					avatarURL="https://gravatar.com/avatar/c0f14c0036f6610c135f77666021f5cb?s=400&d=robohash&r=x"
					address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
					votesAvailable="344,984.0583"
					voteWeight="14.82%"
					proposalsVoted="92"
				/>
				<AddressRow
					href="/gov/pid"
					rank="2"
					avatarURL="https://gravatar.com/avatar/c0f14c0036f6610c135f77666021f5cb?s=400&d=robohash&r=x"
					address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
					votesAvailable="344,984.0583"
					voteWeight="14.82%"
					proposalsVoted="92"
				/>
				<AddressRow
					href="/gov/pid"
					rank="3"
					avatarURL="https://gravatar.com/avatar/c0f14c0036f6610c135f77666021f5cb?s=400&d=robohash&r=x"
					address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
					votesAvailable="344,984.0583"
					voteWeight="14.82%"
					proposalsVoted="92"
				/>
				<AddressRow
					href="/gov/pid"
					rank="4"
					avatarURL="https://gravatar.com/avatar/c0f14c0036f6610c135f77666021f5cb?s=400&d=robohash&r=x"
					address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
					votesAvailable="344,984.0583"
					voteWeight="14.82%"
					proposalsVoted="92"
				/>
				<AddressRow
					href="/gov/pid"
					rank="5"
					avatarURL="https://gravatar.com/avatar/c0f14c0036f6610c135f77666021f5cb?s=400&d=robohash&r=x"
					address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
					votesAvailable="344,984.0583"
					voteWeight="14.82%"
					proposalsVoted="92"
				/>
			</Addresses>

			<MediumSpacer />
			<GlowTextLink href="/gov/pid">› View all addresses</GlowTextLink>

		</>
	);
};

const TopRow = styled.div``;

const GovernanceCard = styled.div`
	background: ${(props) => props.theme.colors.background};
	border: 1px solid ${(props) => props.theme.colors.lightNavy};
	border-radius: 8px;
	padding: 18px 36px 32px 36px;
	margin-bottom: 24px;
`;

const CardTitle = styled.p`
	${H6Styles}
	margin-bottom: 8px;
`;

const CardValue = styled.p`
	${H1Styles}
	margin-bottom: 0;
	margin-top: 0;
`;

const Proposals = styled.div`
	> a {
		border-radius: 0;
		margin-top: -1px;
	
		&:first-of-type {
			border-radius: 8px 8px 0 0;
		}

		&:last-of-type {
			border-radius: 0 0 8px 8px;
		}
	}
`;

const Addresses = styled.div`
> a {
	border-radius: 0;
	margin-top: -1px;

	&:first-of-type {
		border-radius: 8px 8px 0 0;
	}

	&:last-of-type {
		border-radius: 0 0 8px 8px;
	}
}
`;

