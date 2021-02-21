import { useQuery } from 'react-query';

import Initialiser from 'context/Initialiser';
import CoinGecko from 'context/CoinGecko';

type FetchTokenPriceResponse = {
	usd: number;
	usd_24h_change: number;
};

const useTokenPrie = (tokenAddress: string) => {
	const { isAppReady } = Initialiser.useContainer();
	const { CoinGeckoClient } = CoinGecko.useContainer();

	return useQuery<{
		priceInUSD: number;
		dailyChangePercent: number;
	}>(
		['tokenPrice', CoinGeckoClient],
		async () => {
			const { data } = await CoinGeckoClient.simple.fetchTokenPrice({
				contract_addresses: tokenAddress,
				vs_currencies: 'usd',
				include_24hr_change: true,
			});

			const TokenResponse = data[tokenAddress.toLowerCase()] as FetchTokenPriceResponse;

			const priceInUSD = TokenResponse.usd;
			const dailyChangePercent = TokenResponse.usd_24h_change;

			return {
				priceInUSD,
				dailyChangePercent,
			};
		},
		{
			enabled: isAppReady,
		}
	);
};

export default useTokenPrie;
