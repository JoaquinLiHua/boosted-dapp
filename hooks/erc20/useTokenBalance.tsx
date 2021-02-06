import { useCallback, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { getBalanceOf } from 'utils/erc20';
import BigNumber from 'bignumber.js';

/**
 * Hooks for getting a token balance of a user
 * @param tokenAddress
 */
export const useTokenBalance = (tokenAddress: string) => {
	const [balance, setBalance] = useState<BigNumber>(new BigNumber('0'));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchBalance = useCallback(async () => {
		if (account) {
			const balance: BigNumber = new BigNumber(await getBalanceOf(ethereum, tokenAddress, account));
			setBalance(balance);
		}
	}, [account, ethereum, tokenAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchBalance();
			const refreshInterval = setInterval(fetchBalance, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [account, ethereum, setBalance, tokenAddress, fetchBalance]);

	return balance;
};
