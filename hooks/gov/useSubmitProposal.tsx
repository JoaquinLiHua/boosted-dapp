import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { submitProposal } from 'utils/governance';

const useSubmitProposal = () => {
	const { ethereum, account }: { ethereum: provider; account: string | null } = useWallet();

	const handleSubmitProposal = useCallback(
		async (values) => {
			try {
				const tx = await submitProposal(ethereum, account, values);
				return tx;
			} catch (e) {
				return false;
			}
		},
		[ethereum, account]
	);

	return { onSubmitProposal: (values) => handleSubmitProposal(values) };
};

export default useSubmitProposal;
