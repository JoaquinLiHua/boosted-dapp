import CoinGecko from 'coingecko-api';
import { createContainer } from 'unstated-next';

const useCoinGecko = () => {
	const CoinGeckoClient = new CoinGecko();
	return {
		CoinGeckoClient,
	};
};

const CoinGeckoClient = createContainer(useCoinGecko);

export default CoinGeckoClient;
