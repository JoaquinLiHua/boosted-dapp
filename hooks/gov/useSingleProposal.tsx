import { useCallback, useEffect, useState } from 'react';
import Initialiser from 'context/Initialiser';

import { getSingleProposal } from 'utils/governance';

export const useSingleProposal = (id: any) => {
	const [proposal, setProposal] = useState<any>(null);
	const { provider }: { provider: any } = Initialiser.useContainer();

	const fetchSingleProposal = useCallback(async () => {
		const singleProposal = await getSingleProposal(provider, id);
		setProposal(singleProposal);
	}, [provider, id]);

	useEffect(() => {
		if (provider) {
			fetchSingleProposal();
		}
	}, [fetchSingleProposal, provider]);

	return proposal;
};
