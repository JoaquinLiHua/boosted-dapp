import { useQuery } from 'react-query';
import Initialiser from 'context/Initialiser';
import { ethers } from 'ethers';

const useTotalSupply = (contract: any) => {
	const { isAppReady, provider } = Initialiser.useContainer();
	return useQuery<string>(
		['totalSupply'],
		async () => {
			const tokenContract = new ethers.Contract(
				contract.address,
				contract.abi,
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

export default useTotalSupply;
