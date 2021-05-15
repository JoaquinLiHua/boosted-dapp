import { useQuery } from 'react-query';
import Initialiser from 'context/Initialiser';
import { ethers } from 'ethers';
import QUERY_KEYS from 'constants/queryKeys';
import ERC20 from 'contracts/ERC20';

const useTotalSupplyQuery = (address: string) => {
	const { isAppReady, provider } = Initialiser.useContainer();
	return useQuery<string>(
		QUERY_KEYS.Token.TotalSupply,
		async () => {
			const tokenContract = new ethers.Contract(
				address,
				ERC20.abi,
				provider as ethers.providers.Provider
			);

			const totalSupply = await tokenContract.totalSupply();

			return ethers.utils.formatEther(totalSupply);
		},
		{
			enabled: isAppReady,
		}
	);
};

export default useTotalSupplyQuery;
