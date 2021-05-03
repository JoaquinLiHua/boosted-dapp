export enum AvailablePools {
	BOOSTETH = 'BOOSTETH',
	ORBTETH = 'ORBTETH',
	USDC = 'USDC',
	ALPHA = 'ALPHA',
	SUSHI = 'SUSHI',
	LINK = 'LINK',
}

export type Pool = {
	symbol: string;
	decimals: number;
	contractAddress: string;
	stakedTokenAddress: string;
};

export const pools = [
	{
		symbol: AvailablePools.BOOSTETH,
		decimals: 18,
		contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		stakedTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	},
	{
		symbol: AvailablePools.ORBTETH,
		decimals: 18,
		contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		stakedTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	},
	{
		symbol: AvailablePools.USDC,
		decimals: 18,
		contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		stakedTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	},
	{
		symbol: AvailablePools.ALPHA,
		decimals: 18,
		contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		stakedTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	},
	{
		symbol: AvailablePools.SUSHI,
		decimals: 18,
		contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		stakedTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	},
	{
		symbol: AvailablePools.LINK,
		decimals: 18,
		contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
		stakedTokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
	},
];

export const poolBySymbol = () =>
	pools.reduce((obj: any, item: Pool) => {
		obj[item.symbol] = item;
		return obj;
	}, {});
