import { useCallback, useState, useEffect } from 'react';

import Initialiser from 'context/Initialiser';

import BN from 'bignumber.js';
import { getDepositedAmount } from 'utils/vault';

export const useGetVaultDepositedAmount = (vaultAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchDepositedAmount = useCallback(async () => {
		if (walletAddress) {
			const amount = new BN(await getDepositedAmount(provider, vaultAddress, walletAddress));
			setAmount(amount);
		}
	}, [walletAddress, provider, vaultAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchDepositedAmount();
			const refreshInterval = setInterval(fetchDepositedAmount, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setAmount, fetchDepositedAmount]);

	return amount;
};
