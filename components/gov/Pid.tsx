import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/general/ExternalLink'
import { ProgressIndicator } from 'components/general/ProgressIndicator'

import { H1Styles, TwoCols, XSmallSpacer, MediumSpacer, SmallSpacer, H6Styles, PStyles, PLargeStyles, PSmallStyles, PrimaryButton } from 'styles/common';

export const Pid: React.FC = () => {
	return (
		<>
			<TopRow>
				<BackLink href="/gov/">‹ Back</BackLink>
				<H1>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</H1>
				<PidInfo>034 • Executed December 26th, 2020 • <ExternalLink href="#">View in GitHub</ExternalLink> </PidInfo>
				<XSmallSpacer />
			</TopRow>

			<TwoCols>

				<Card>
					<CardTitle>For</CardTitle>
					<WrapperAligned>
						<CardValue color="green">421,218</CardValue>
						<Right>90.53%</Right>
					</WrapperAligned>
					<ProgressIndicator progress={90} barColor="#56F686"/>

					<MediumSpacer />

					<Wrapper>
						<CardTitle>38 Addresses</CardTitle>
						<CardTitle>Votes</CardTitle>
					</Wrapper>

					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>
					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="344,984.0583"	
					/>

				</Card>

				<Card>
					<CardTitle>Against</CardTitle>
					<WrapperAligned>
						<CardValue color="red">4,321</CardValue>
						<Right>10.42%</Right>
					</WrapperAligned>
					<ProgressIndicator progress={10} barColor="#F65656"/>

					<MediumSpacer />

					<Wrapper>
						<CardTitle>1 Address</CardTitle>
						<CardTitle>Votes</CardTitle>
					</Wrapper>

					<AddressVotes
						address="0xEF80a890790gd7907d7901hhj2112689421hu2c82"
						votes="10"	
					/>

				</Card>

			</TwoCols>

			<Card>
				<CardTitle>Quorum</CardTitle>
				<Wrapper>
					<Left>101.0000 votes of 3582.9880 total staked</Left>
					<Right>2.82%</Right>
				</Wrapper>
				<ProgressIndicator progress={2.82} barColor="#F6D656"/>
			</Card>

			<MediumSpacer />

			<Wrapper>
				<Details>
					<CardTitle>Details</CardTitle>

					<DetailTitle>1 – Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?</DetailTitle>

					<DetailParagraph>Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

					Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.</DetailParagraph>

					<DetailTitle>2 – Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?</DetailTitle>

					<DetailParagraph>Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

					Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.</DetailParagraph>
				</Details>

				<ProposalHistory>
					<CardTitle>Proposal History</CardTitle>

					<HistoryItem>
						<HistoryTitle><ExternalLink href="#">Created</ExternalLink></HistoryTitle>	
						<HistoryTimeStamp>December 22nd, 2020 – 1:42am</HistoryTimeStamp>
					</HistoryItem>

					<HistoryItem>
						<HistoryTitle>Active</HistoryTitle>	
						<HistoryTimeStamp>December 22nd, 2020 – 1:42am</HistoryTimeStamp>
					</HistoryItem>

					<HistoryItem>
						<HistoryTitle>Succeeded</HistoryTitle>	
						<HistoryTimeStamp>December 22nd, 2020 – 1:42am</HistoryTimeStamp>
					</HistoryItem>

					<VoteButton href="#">Vote</VoteButton>


				</ProposalHistory>
			</Wrapper>
		</>
	);
};

export const AddressVotes = ({ address, votes }) => {
	return (
		<WrapperAligned>
			<Address>{address}</Address>
			<Votes>{votes}</Votes>
		</WrapperAligned>
	);
};

const WrapperAligned = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	flex-wrap: wrap;
`;

const Address = styled.p`
	${PSmallStyles}
	font-size: 12px;
	color: ${(props) => props.theme.colors.white};
	font-family: ${(props) => props.theme.fonts.interSemiBold};
	margin: 4px 0;
`;

const Votes = styled.p`
	${PSmallStyles}
	font-size: 12px;
	color: ${(props) => props.theme.colors.gray};
	margin: 0;
`;

const TopRow = styled.div`
	margin-top: -24px;
`;

const BackLink = styled.a`
	${H6Styles}
	color: ${(props) => props.theme.colors.gray};
	text-decoration: none;
	position: relative;

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

const H1 = styled.h1`
	${H1Styles}
	margin-bottom: 4px;
`;

const PidInfo = styled.p`
	${PStyles}
	color: ${(props) => props.theme.colors.gray};
	margin-top: 0;

	a {
		color: ${(props) => props.theme.colors.gray};
		text-decoration: none;

		&:hover {
			color: ${(props) => props.theme.colors.white};
		}
	}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Left = styled.p`
	${PLargeStyles}
	margin-top: 0; 
`;

const Right = styled.p`
	${PLargeStyles}
	margin-top: 0;
`;

const Details = styled.div`
	width: 67%;
`;

const DetailTitle = styled.p`
	${PLargeStyles}
`;

const DetailParagraph = styled.p`
	${PStyles}
	color: ${(props) => props.theme.colors.gray};
	margin-left: 32px;
	margin-bottom: 32px;
`;

const ProposalHistory = styled.div`
	width: calc(33% - 72px);
`;

const Card = styled.div`
	background: ${(props) => props.theme.colors.background};
	border: 1px solid ${(props) => props.theme.colors.lightNavy};
	border-radius: 8px;
	padding: 32px 36px 32px 36px;
	margin-bottom: 24px;
`;

const CardTitle = styled.h6`
	${H6Styles}
	margin-top: 0;
	margin-bottom: 8px;
`;

const CardValue = styled.p`
	${H1Styles}
	margin-bottom: 12px;
	margin-top: 0;
	
	${props => {
		switch (props.color) {
			case "green":
				return "color: #56F686;";
			case "red":
				return "color: #F65656;";
		}
	}}
`;

const HistoryItem = styled.div`
`;

const HistoryTitle = styled.p`
	${PLargeStyles}
	margin-bottom: 0px;

	a {
		color: ${(props) => props.theme.colors.white};
		text-decoration: none;
	}

	:before {
		content: "";
		display: inline-block;
		margin-right: 8px;
		width: 11px;
		height: 10px;
		background-image: url("data:image/svg+xml,%3Csvg width='11' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%2356F686' stroke-width='1.5' d='M1 6l3 3 6-8' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
	}
`;

const HistoryTimeStamp = styled.p`
	${PSmallStyles}
	margin-top: 0;
	color: ${(props) => props.theme.colors.gray};
	margin-left: 19px;
`;

const VoteButton = styled(PrimaryButton)`
	${PLargeStyles}
	margin-top: 48px;
	display: block;
`;