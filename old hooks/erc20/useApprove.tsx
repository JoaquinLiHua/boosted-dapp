import { useCallback } from 'react';

import Initialiser from 'context/Initialiser';

import { approve } from 'utils/erc20';

export const useApprove = (tokenContract: string, contractAddress: string) => {
	const {
		walletAddress,
		provider,
	}: { walletAddress: string | null; provider: any } = Initialiser.useContainer();

	const handleApprove = useCallback(async () => {
		try {
			console.log(tokenContract);
			console.log(contractAddress);

			const tx = await approve(provider, tokenContract, contractAddress, walletAddress);
			return tx;
		} catch (e) {
			return false;
		}
	}, [walletAddress, tokenContract, contractAddress, provider]);

	return {
		onApprove: handleApprove,
	};
};
