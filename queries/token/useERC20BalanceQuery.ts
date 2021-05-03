import { useQuery } from 'react-query';
import Initialiser from 'context/Initialiser';
import { ethers } from 'ethers';
import QUERY_KEYS from 'constants/queryKeys';

const useERC20BalanceQuery = (contract: any) => {
	const { isAppReady, walletAddress, provider } = Initialiser.useContainer();
	return useQuery<string>(
		QUERY_KEYS.Token.Balance(walletAddress ?? ''),
		async () => {
			const tokenContract = new ethers.Contract(
				contract.address,
				contract.abi,
				provider as ethers.providers.Provider
			);

			const balance = await tokenContract.balanceOf(walletAddress);

			return ethers.utils.formatEther(balance);
		},
		{
			enabled: isAppReady && walletAddress !== null,
		}
	);
};

export default useERC20BalanceQuery;
