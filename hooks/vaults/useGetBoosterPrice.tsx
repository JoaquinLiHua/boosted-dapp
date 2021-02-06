import { useCallback, useState, useEffect } from 'react';

import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { getBoosterInfo } from 'utils/vault';
import BN from 'bignumber.js';

export const useGetBoosterPrice = (vaultRewardsAddress: string) => {
	const [boosterPrice, setBoosterPrice] = useState(new BN('0'));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchBoosterPrice = useCallback(async () => {
		if (account) {
			const { boosterPrice } = await getBoosterInfo(ethereum, vaultRewardsAddress, account);
			const amount = new BN(boosterPrice);
			setBoosterPrice(amount);
		}
	}, [account, ethereum, vaultRewardsAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchBoosterPrice();
			const refreshInterval1 = setInterval(fetchBoosterPrice, 10000);

			return () => {
				clearInterval(refreshInterval1);
			};
		} else {
			return;
		}
	}, [account, ethereum, fetchBoosterPrice]);

	return boosterPrice;
};
