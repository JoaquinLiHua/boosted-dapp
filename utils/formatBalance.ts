import BN from 'bignumber.js';

export const getDisplayBalance = (balance: BN, decimals = 18) => {
	if (!balance.isZero()) {
		const displayBalance = balance.dividedBy(new BN(10).pow(decimals));
		if (displayBalance.lt(1)) {
			return displayBalance.toPrecision(4);
		} else {
			return displayBalance.toFixed(4);
		}
	} else {
		return '0';
	}
};

export const getFullDisplayBalance = (balance: BN, decimals = 18) => {
	if (!balance.isZero()) {
		return balance.dividedBy(new BN(10).pow(decimals)).toFixed();
	} else {
		return '0';
	}
};
