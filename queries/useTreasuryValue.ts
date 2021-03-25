import { useQuery } from 'react-query';
import { ethers, BigNumber } from 'ethers';

import CoinGecko from 'context/CoinGecko';
import Initialiser from 'context/Initialiser';
import yCrvToken from 'contracts/yCrvToken';
import Treasury from 'contracts/Treasury';

const useTreasuryValue = () => {
	const { isAppReady, provider } = Initialiser.useContainer();
	const { CoinGeckoClient } = CoinGecko.useContainer();

	return useQuery<number>(
		['treasuryValue'],
		async () => {
			const { data } = await CoinGeckoClient.simple.fetchTokenPrice({
				contract_addresses: yCrvToken.address,
				vs_currencies: 'usd',
			});
			const ycrvPrice = Number(data[yCrvToken.address.toLowerCase()].usd);

			const tokenContract = new ethers.Contract(
				yCrvToken.address,
				yCrvToken.abi,
				provider as ethers.providers.Provider
			);

			const balanceBN = await tokenContract.balanceOf(Treasury.address);

			const balance = Number(ethers.utils.formatEther(balanceBN));

			return balance * ycrvPrice;
		},
		{
			enabled: isAppReady,
		}
	);
};

export default useTreasuryValue;
