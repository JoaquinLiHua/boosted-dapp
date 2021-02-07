import { useCallback, useEffect, useState } from 'react';

import BN from 'bignumber.js';
import Initialiser from 'context/Initialiser';

import { getAllowance } from '../../utils/erc20';

export const useAllowance = (tokenContract: string, contractToCheck: string) => {
	const [allowance, setAllowance] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: any; provider: any } = Initialiser.useContainer();
	const fetchAllowance = useCallback(async () => {
		const allowance = new BN(
			await getAllowance(provider, tokenContract, contractToCheck, walletAddress)
		);
		setAllowance(allowance);
	}, [walletAddress, contractToCheck, tokenContract, provider]);

	useEffect(() => {
		if (walletAddress) {
			fetchAllowance();
		}
		const refreshInterval = setInterval(fetchAllowance, 5000);
		return () => clearInterval(refreshInterval);
	}, [walletAddress, fetchAllowance]);

	return allowance;
};
