import { useCallback, useEffect, useState } from 'react';
import Initialiser from 'context/Initialiser';

import { getBalanceOf } from 'utils/erc20';
import BigNumber from 'bignumber.js';

/**
 * Hooks for getting a token balance of a user
 * @param tokenAddress
 */
export const useTokenBalance = (tokenAddress: string) => {
	const [balance, setBalance] = useState<BigNumber>(new BigNumber('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchBalance = useCallback(async () => {
		if (walletAddress) {
			const balance: BigNumber = new BigNumber(
				await getBalanceOf(provider, tokenAddress, walletAddress)
			);
			setBalance(balance);
		}
	}, [walletAddress, provider, tokenAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchBalance();
			const refreshInterval = setInterval(fetchBalance, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setBalance, tokenAddress, fetchBalance]);

	return balance;
};
