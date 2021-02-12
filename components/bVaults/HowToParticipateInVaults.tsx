import React,  { useState } from 'react';
import styled, { css } from 'styled-components';
import { H6, H6Styles, PSmall, PSmallStyles, PStyles, PLargeStyles } from 'styles/common';

export const HowToParticipateInVaults = () => {
	return (
		<>
			<HowToParticipateInVaultsWrapper>
				<HowToH6>How to participate in bVaults?</HowToH6>
				<HowToP><strong>Step 1:</strong> Deposit your USDC to receive interest bearing bfUSDC</HowToP>
				<HowToP><strong>Step 2:</strong> Stake your bfUSDC in the bfUSDC pool to participate in the rewards pool to gain additional rewards. This step is optional.</HowToP>

				<HowToH6>What is bfusdc?</HowToH6>
				<HowToP><strong>1)</strong> bfUSDC is interest bearing</HowToP>
				<HowToP><strong>2)</strong> Stake your bfUSDC in the bfUSDC pool to earn additional rewards that can be BOOSTED.</HowToP>
			</HowToParticipateInVaultsWrapper>
		</>
	);
}

const HowToParticipateInVaultsWrapper = styled.div`
	border-right: 1px solid ${(props) => props.theme.colors.lightNavy};
	width: calc(100% / 3);
	padding-right: 48px;
	margin-bottom: -48px;
	padding-bottom: 48px;
  padding-top: 12px;
}
`;

const HowToP = styled.p`
	${PSmallStyles}
	color: ${(props) => props.theme.colors.white};
	margin-top: 12px;
	margin-bottom: 0;
`;

const HowToH6 = styled.h6`
	${H6Styles}
	margin-bottom: 12px;
`;