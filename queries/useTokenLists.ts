import { useQuery } from 'react-query';
import axios from 'axios';
import keyBy from 'lodash/keyBy';

export type Token = {
	chainId: number;
	address: string;
	name: string;
	symbol: string;
	decimals: number;
	logoURI: string;
};

export type TokenListResponse = {
	keywords: string[];
	logoURI: string;
	name: string;
	timestamp: string;
	tokens: Token[];
	version: { major: number; minor: number; patch: number };
};

const useTokenLists = () => {
	return useQuery<Record<string, Token>>('tokenLists', async () => {
		const response = await axios.get<TokenListResponse>('https://tokens.1inch.eth.link');

		return keyBy(response.data.tokens, 'symbol');
	});
};

export default useTokenLists;
