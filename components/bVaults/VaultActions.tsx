import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import {
	H6,
	MediumSpacer,
	H6Styles,
	SecondaryButton,
	PSmall,
	PSmallStyles,
	PStyles,
	PLargeStyles,
} from 'styles/common';

export const VaultActions = () => {
	return (
		<>
			<VaultActionsWrapper>
				<ClaimWrapper>
					<TitleWrapper>
						<ActionTitle>Claim</ActionTitle>
						<Available>Your earnings: 52.42 BOOST</Available>
					</TitleWrapper>

					<InputWrapper>
						<input type="number" placeholder="0" />
						<p>BOOST</p>
					</InputWrapper>

					<PoolButtonSecondary href="#">Claim</PoolButtonSecondary>
				</ClaimWrapper>

				<MediumSpacer />

				<Flex>
					<DepositWrapper>
						<TitleWrapper>
							<ActionTitle>Deposit</ActionTitle>
							<Available>Available: 5,000 BOOST</Available>
						</TitleWrapper>

						<InputWrapper>
							<input type="number" placeholder="0" />
							<p>BOOST</p>
						</InputWrapper>

						<Percentages>
							<PercentageButton href="#">25%</PercentageButton>
							<PercentageButton href="#">50%</PercentageButton>
							<PercentageButton href="#">75%</PercentageButton>
							<PercentageButton href="#">100%</PercentageButton>
						</Percentages>

						<PoolButtonSecondary href="#">Deposit</PoolButtonSecondary>
					</DepositWrapper>

					<WithdrawWrapper>
						<TitleWrapper>
							<ActionTitle>Withdraw</ActionTitle>
							<Available>Available: 1,000 BOOST</Available>
						</TitleWrapper>

						<InputWrapper>
							<input type="number" placeholder="0" />
							<p>BOOST</p>
						</InputWrapper>

						<Percentages>
							<PercentageButton href="#">25%</PercentageButton>
							<PercentageButton href="#">50%</PercentageButton>
							<PercentageButton href="#">75%</PercentageButton>
							<PercentageButton href="#">100%</PercentageButton>
						</Percentages>

						<PoolButtonSecondary href="#">Withdraw</PoolButtonSecondary>
					</WithdrawWrapper>
				</Flex>
			</VaultActionsWrapper>
		</>
	);
};

const VaultActionsWrapper = styled.div`
	padding-top: 12px;
	padding-left: 48px;
	padding-bottom: 36px;
	width: calc((100% / 3) * 2);

	input {
		font-size: 14px;
		appeareance: none;
		background: ${(props) => props.theme.colors.navy};
		font-family: ${(props) => props.theme.fonts.interSemiBold};
		border: 0;
		outline: 0;
		height: 40px;
		border-radius: 4px 0 0 4px;
		color: ${(props) => props.theme.colors.white};
		padding: 12px 6px 12px 24px;
		text-align: right;
		flex: 1 0 auto;
	}
}
`;

const InputWrapper = styled.div`
	display: flex;

	p {
		font-size: 14px;
		display: inline-block;
		background: ${(props) => props.theme.colors.navy};
		font-family: ${(props) => props.theme.fonts.interSemiBold};
		border: 0;
		outline: 0;
		height: 40px;
		border-radius: 0 4px 4px 0;
		color: ${(props) => props.theme.colors.gray};
		padding: 12px 24px 12px 0;
		text-align: right;
		margin: 0;
		align-self: right;

		display: flex;
		align-items: center;
	}
`;

const ActionTitle = styled.h6`
	${H6Styles}
	color: ${(props) => props.theme.colors.white};
	margin-bottom: 12px;
`;

const Available = styled.p`
	${PSmallStyles}
	color: ${(props) => props.theme.colors.gray};
	font-size: 12px;
`;

const Flex = styled.div`
	display: flex;
	justify-content: space-between;
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

const ClaimWrapper = styled.div``;

const DepositWrapper = styled.div`
	width: calc(50% - 18px);
`;

const WithdrawWrapper = styled.div`
	width: calc(50% - 18px);
`;

const PoolButtonSecondary = styled(SecondaryButton)`
	display: block;
	margin-top: 24px;
`;

const Percentages = styled.div`
	margin-top: 8px;
	display: flex;
	justify-content: space-between;
`;

const PercentageButton = styled(SecondaryButton)`
	${PSmallStyles}
	padding: 6px 0;
	width: calc(25% - 6px);
	border: 1px solid ${(props) => props.theme.colors.navy};

	&:hover {
		color: ${(props) => props.theme.colors.white};
		border: 1px solid ${(props) => props.theme.colors.lightNavy};
		box-shadow: none;
	}
`;
