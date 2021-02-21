import { BigNumberish } from 'ethers';

export const formatPercent = (value: BigNumberish) => {
	return Number(value).toFixed(2);
};

export const formatNumber = (value: BigNumberish) => {
	return Number(value).toFixed(2);
};
