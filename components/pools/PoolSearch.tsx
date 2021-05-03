import React from 'react';
import styled from 'styled-components';
import { SearchField, Dropdown } from 'styles/common';

type PoolSearchProps = {};

const PoolSearchComponent: React.FC<PoolSearchProps> = ({}) => {
	return (
		<PoolSearchWrapper>
			<PoolSearch type="search" placeholder="Search pools.."></PoolSearch>
			<PoolDropdown name="pools" id="pools">
				<option value="all" selected>
					All pools
				</option>
				<option value="closed">Closed pools</option>
				<option value="closed">Another pool option</option>
			</PoolDropdown>
		</PoolSearchWrapper>
	);
};
export default PoolSearchComponent;

const PoolSearchWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const PoolSearch = styled(SearchField)`
	border-radius: 24px 0 0 24px;
	width: calc(100% - 203px);
`;

const PoolDropdown = styled(Dropdown)`
	border-radius: 0 24px 24px 0;
`;
