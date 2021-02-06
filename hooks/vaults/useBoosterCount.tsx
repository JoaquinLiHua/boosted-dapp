import { useCallback, useState, useEffect } from 'react';

import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { boostCount } from 'utils/vault';
import BN from 'bignumber.js';

export const useGetBoosterBalance = (vaultRewardsAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchBalance = useCallback(async () => {
		if (account) {
			const amount = new BN(await boostCount(ethereum, vaultRewardsAddress, account));
			setAmount(amount);
		}
	}, [account, ethereum, vaultRewardsAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchBalance();
			const refreshInterval = setInterval(fetchBalance, 10000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [account, ethereum, setAmount, fetchBalance]);

	return amount;
};
