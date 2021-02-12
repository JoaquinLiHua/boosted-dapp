import React from 'react';
import styled from 'styled-components';
import { VaultCard } from './VaultCard';
import { VaultTableTitles } from './VaultTableTitles';

import { H1, ThreeCols, Spacer, SearchField, Dropdown } from 'styles/common';

export const Vaults: React.FC = () => {
	return (
		<>
			<TopRow>
				<H1>Vaults</H1>
				<VaultSearchWrapper>
					<VaultSearch type="search" placeholder="Search vaults.."></VaultSearch>
					<VaultDropdown name="vaults" id="vaults">
						<option value="all" selected>
							All vaults
						</option>
						<option value="closed">Closed vaults</option>
						<option value="another">Another vault option</option>
					</VaultDropdown>
				</VaultSearchWrapper>
			</TopRow>

      <Spacer />

      <VaultTableTitles
        vaultTitle="Vault"
        apyTitle="APY"
        tvlTitle="TVL"
        yourBalanceTitle="Your balance"
        yourDepositTitle="Your deposit"
        yourPoolPercentageTitle="Your Pool %"
        yourEearningsTitle="Your earnings"
      />

      <VaultCard
        logoURL="X"
        vault="Alpha Centauri A"
        apy="81.20%"
        tvl="$533,291.20"
        balance="10,000"
        deposit="5,000"
        poolPercentage="0.21%"
        earnings="12.42"
      />

      <VaultCard
        logoURL="X"
        vault="Alpha Centauri A"
        apy="81.20%"
        tvl="$533,291.20"
        balance="10,000"
        deposit="5,000"
        poolPercentage="0.21%"
        earnings="12.42"
      />

      <VaultCard
        logoURL="X"
        vault="Alpha Centauri A"
        apy="81.20%"
        tvl="$533,291.20"
        balance="10,000"
        deposit="5,000"
        poolPercentage="0.21%"
        earnings="12.42"
      />

			<Spacer />
		</>
	);
};

const TopRow = styled.div``;

const VaultSearchWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const VaultSearch = styled(SearchField)`
	border-radius: 24px 0 0 24px;
	width: calc(100% - 203px);
`;

const VaultDropdown = styled(Dropdown)`
	border-radius: 0 24px 24px 0;
`;