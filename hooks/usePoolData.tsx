import { AvailablePools } from 'constants/pools';
import usePoolQuery, { PoolQueryData } from 'queries/pool/usePoolQuery';

type PoolData = {
	[name: string]: {
		data: PoolQueryData | undefined;
	};
};

// @notice hook used to aggregate and apply pricing to values
const usePools = (): PoolData => {
	const boostEthData = usePoolQuery(AvailablePools.BOOSTETH);
	// @todo: add the coingecko integration to calculate the apys and pricing in this hook
	return {
		[AvailablePools.BOOSTETH]: {
			data: boostEthData.data,
		},
	};
};

export default usePools;
