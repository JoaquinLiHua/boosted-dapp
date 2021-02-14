import { useQuery } from 'react-query';
import BigNumber from 'bignumber.js';
import Initialiser from 'context/Initialiser';

const useERC20Balance = () => {
	const { isAppReady, walletAddress } = Initialiser.useContainer();
	return useQuery<BigNumber>(
		['erc20Balance', walletAddress],
		async () => {
			return new BigNumber(0);
		},
		{
			enabled: isAppReady && walletAddress !== null,
		}
	);
};

export default useERC20Balance;
