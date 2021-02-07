import { useCallback, useEffect, useState } from 'react';

import BN from 'bignumber.js';
import Initialiser from 'context/Initialiser';

import { getBalanceOf } from 'utils/erc20';
import { usePriceFeedContext } from 'context/PriceFeedContext';
import { yCRVToken } from 'constants/tokenAddresses';
import { governanceContract, treasuryV3Contract } from 'constants/bfAddresses';

export const useTreasuryBalance = () => {
	const [balance, setBalance] = useState(new BN(0));
	const { provider }: { provider: any } = Initialiser.useContainer();
	const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
	const fetchTreasuryBalance = useCallback(async () => {
		const { data } = await coinGecko.simple.fetchTokenPrice({
			contract_addresses: yCRVToken,
			vs_currencies: 'usd',
		});
		const priceInUSD = data[yCRVToken].usd;
		const balance = new BN(await getBalanceOf(provider, yCRVToken, governanceContract));
		const newTreasuryBalance = new BN(await getBalanceOf(provider, yCRVToken, treasuryV3Contract));
		const totalBalance = balance.plus(newTreasuryBalance);
		const usdBalance = new BN(priceInUSD).multipliedBy(totalBalance);
		setBalance(usdBalance);
	}, [provider, coinGecko]);

	useEffect(() => {
		if (provider) {
			fetchTreasuryBalance();
			const refreshInterval = setInterval(fetchTreasuryBalance, 30000);
			return () => clearInterval(refreshInterval);
		} else {
			return;
		}
	}, [provider, setBalance, fetchTreasuryBalance]);

	return balance;
};
