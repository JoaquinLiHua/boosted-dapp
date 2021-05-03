import { AvailablePools } from './pools';

export const QUERY_KEYS = {
	Treasury: ['treasury', 'treasuryValue'],
	TokenList: {
		OneInch: ['tokenList', 'oneInch'],
	},
	Token: {
		Balance: (walletAddress: string) => ['token', 'balance', walletAddress],
		TotalSupply: ['token', 'totalSupply'],
	},
	Price: {
		Coingecko: (CoinGeckoClient: any, tokenAddress: string) => [
			'tokenPrice',
			CoinGeckoClient,
			tokenAddress,
		],
	},
	Pools: {
		PoolInfo: (pool: AvailablePools, walletAddress: string) => [
			'pools',
			'poolInfo',
			pool,
			walletAddress,
		],
	},
};

export default QUERY_KEYS;
