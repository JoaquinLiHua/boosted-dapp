import { useQuery } from 'react-query';
import Initialiser from 'context/Initialiser';
import { ethers } from 'ethers';

const useTreasuryValue = () => {
	const { isAppReady, walletAddress, provider } = Initialiser.useContainer();
	return useQuery<string>(
		['treasuryValue'],
		async () => {
			// const contract = new ethers.Contract("address", abi, provider as ethers.providers.Provider);

			const balance = ethers.utils.parseEther('0');

			return ethers.utils.formatEther(balance);
		},
		{
			enabled: isAppReady,
		}
	);
};

export default useTreasuryValue;
