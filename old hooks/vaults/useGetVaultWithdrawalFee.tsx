import { useCallback, useState, useEffect } from 'react';
import Initialiser from 'context/Initialiser';

import BN from 'bignumber.js';
import { getWithdrawalFee } from 'utils/vault';

export const useGetVaultWithdrawalFee = (vaultRewardsAddress: string, decimal: number) => {
	const [amount, setAmount] = useState(new BN(0));
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const fetchFee = useCallback(async () => {
		if (walletAddress) {
			const { withdrawFee, denom } = await getWithdrawalFee(provider, vaultRewardsAddress);

			const withdrawFeeBN: BN = new BN(withdrawFee);
			const denomBN: BN = new BN(denom);

			const calculatedWithdrawalFee = withdrawFeeBN.div(denomBN).multipliedBy(100);
			setAmount(calculatedWithdrawalFee);
		}
	}, [walletAddress, provider, vaultRewardsAddress]);

	useEffect(() => {
		if (walletAddress && provider) {
			fetchFee();
			const refreshInterval = setInterval(fetchFee, 60000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [walletAddress, provider, setAmount, fetchFee]);

	return amount;
};
