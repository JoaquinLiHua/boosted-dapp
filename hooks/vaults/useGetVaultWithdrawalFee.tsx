import { useCallback, useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import BN from 'bignumber.js';
import { getWithdrawalFee } from 'utils/vault';

export const useGetVaultWithdrawalFee = (vaultRewardsAddress: string, decimal: number) => {
	const [amount, setAmount] = useState(new BN(0));
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const fetchFee = useCallback(async () => {
		if (account) {
			const { withdrawFee, denom } = await getWithdrawalFee(ethereum, vaultRewardsAddress);

			const withdrawFeeBN: BN = new BN(withdrawFee);
			const denomBN: BN = new BN(denom);

			const calculatedWithdrawalFee = withdrawFeeBN.div(denomBN).multipliedBy(100);
			setAmount(calculatedWithdrawalFee);
		}
	}, [account, ethereum, vaultRewardsAddress]);

	useEffect(() => {
		if (account && ethereum) {
			fetchFee();
			const refreshInterval = setInterval(fetchFee, 60000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [account, ethereum, setAmount, fetchFee]);

	return amount;
};
