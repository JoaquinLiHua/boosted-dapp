import { useQuery } from 'react-query';
import { ethers } from 'ethers';

import CoinGecko from 'context/CoinGecko';
import Initialiser from 'context/Initialiser';
import ERC20 from 'contracts/ERC20';
import Treasury from 'contracts/Treasury';
import QUERY_KEYS from 'constants/queryKeys';
import { CryptoCurrencies, CryptocurrencyWithAddresses } from 'constants/cryptocurrencies';

const useTreasuryValueQuery = () => {
	const { isAppReady, provider } = Initialiser.useContainer();
	const { CoinGeckoClient } = CoinGecko.useContainer();

	return useQuery<number>(
		QUERY_KEYS.Treasury,
		async () => {
			const { data } = await CoinGeckoClient.simple.fetchTokenPrice({
				contract_addresses: CryptocurrencyWithAddresses[CryptoCurrencies.CRV].address,
				vs_currencies: 'usd',
			});
			const ycrvPrice = Number(
				data[CryptocurrencyWithAddresses[CryptoCurrencies.CRV].address.toLowerCase()].usd
			);

			const tokenContract = new ethers.Contract(
				CryptocurrencyWithAddresses[CryptoCurrencies.CRV].address,
				ERC20.abi,
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

export default useTreasuryValueQuery;
