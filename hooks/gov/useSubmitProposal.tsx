import { useCallback } from 'react';
import Initialiser from 'context/Initialiser';

import { submitProposal } from 'utils/governance';

const useSubmitProposal = () => {
	const { provider, walletAddress } = Initialiser.useContainer();

	const handleSubmitProposal = useCallback(
		async (values) => {
			try {
				const tx = await submitProposal(provider, walletAddress, values);
				return tx;
			} catch (e) {
				return false;
			}
		},
		[provider, walletAddress]
	);

	return { onSubmitProposal: (values) => handleSubmitProposal(values) };
};

export default useSubmitProposal;
