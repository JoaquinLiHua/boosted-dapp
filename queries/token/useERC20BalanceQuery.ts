import { useQuery } from 'react-query';
import Initialiser from 'context/Initialiser';
import { ethers } from 'ethers';
import QUERY_KEYS from 'constants/queryKeys';
import ERC20 from 'contracts/ERC20';

const useERC20BalanceQuery = (address: string) => {
	const { isAppReady, walletAddress, provider } = Initialiser.useContainer();
	return useQuery<string>(
		QUERY_KEYS.Token.Balance(walletAddress ?? ''),
		async () => {
			const tokenContract = new ethers.Contract(
				address,
				ERC20.abi,
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
