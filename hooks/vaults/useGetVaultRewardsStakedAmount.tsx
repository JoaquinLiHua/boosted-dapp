import { useCallback, useState, useEffect } from 'react';

import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import BN from 'bignumber.js';
import { getStakedAmount } from 'utils/vault';

export const useGetVaultRewardsStakedAmount = (vaultRewardsAddress: string) => {
	const [amount, setAmount] = useState(new BN('0'));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchStakedAmount = useCallback(async () => {
		if (account) {
			const amount = new BN(await getStakedAmount(ethereum, vaultRewardsAddress, account));
			setAmount(amount);
		}
	}, [account, ethereum, vaultRewardsAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchStakedAmount();
			const refreshInterval = setInterval(fetchStakedAmount, 5000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [account, ethereum, setAmount, fetchStakedAmount]);

	return amount;
};
