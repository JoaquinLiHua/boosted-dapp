import { useCallback, useEffect, useState } from 'react';
import Initialiser from 'context/Initialiser';

import { proposals as getProposals } from 'utils/governance';

export const useProposals = () => {
	const [proposals, setProposals] = useState<any[] | null>(null);
	const { provider }: { walletAddress: any; provider: any } = Initialiser.useContainer();

	const fetchProposal = useCallback(async () => {
		const proposals = await getProposals(provider);
		setProposals(proposals);
	}, [provider]);

	useEffect(() => {
		fetchProposal();
	}, [fetchProposal]);

	return proposals;
};
