import { useCallback, useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import BN from 'bignumber.js';
import { getPricePerFullShare } from 'utils/vault';

export const useGetVaultPricePerFullShare = (vaultRewardsAddress: string) => {
	const [amount, setAmount] = useState(new BN(0));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchPrice = useCallback(async () => {
		if (account) {
			const amount = new BN(await getPricePerFullShare(ethereum, vaultRewardsAddress));
			setAmount(amount);
		}
	}, [account, ethereum, vaultRewardsAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchPrice();
			const refreshInterval = setInterval(fetchPrice, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [account, ethereum, setAmount, fetchPrice]);

	return amount;
};
