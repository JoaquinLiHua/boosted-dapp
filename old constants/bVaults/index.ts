import { usdcToken } from '../tokenAddresses';

export interface IVault {
	id: string;
	imageUrl: string;
	imageAlt: string;
	tokenIcon: string;
	strategyName: string;
	title: string;
	apy?: string;
	wantTokenTicker: string;
	wantTokenAddress: string;
	vaultTokenTicker: string;
	vaultAddress: string;
	vaultRewardAddress: string;
	decimals: number;
	tag?: string;
	strategyContract?: string;
}

// V1 (BUG PRESENT)
export const controllerAddress = '0x5Cf5eeCd076D1f2CBCD46B6bEF1783b37D89748a';
export const usdcVault = '0xf053B13FD62f908d0569099E517cB3B12A2BE1B4';
export const usdcVaultReward = '0x0807a6e36BBb005d4Ec1f1917d4dB53C6fBd9Ab0';

// Strategies
export const mStableStrat = '0xcE25CC3f83B5cb1c39DA46a914C00E8f2590f6ab';

// V2 (BUG FIX)
export const controllerV2Address = '0x3032f292C281D174D53626566cB8a743a0D5C1db';
export const usdcVaultV2Reward = '0xb66e6E306A87766Fc3d3B99252C0D6E6018dB118';

// Strategies
export const mStableStratV2 = '0x673484a3855f2330e12FC8f986801f4c5de38526';

export const B_VAULTS: IVault[] = [
	{
		id: '0',
		imageUrl: '/images/vault_one.png',
		imageAlt: 'Vault One Graphic',
		tokenIcon: '/images/usdc-logo.png',
		strategyName: 'mStable Strategy',
		title: 'Alpha Centauri A',
		apy: '-',
		wantTokenTicker: 'USDC',
		wantTokenAddress: usdcToken,
		vaultTokenTicker: 'bfUSDC',
		vaultAddress: usdcVault,
		vaultRewardAddress: usdcVaultReward,
		decimals: 6,
		tag: 'Genesis Vault',
		strategyContract: `https://etherscan.io/address/${mStableStrat}#code`,
	},
	{
		id: '1',
		imageUrl: '/images/vault_two.png',
		imageAlt: 'Vault Two Graphic',
		tokenIcon: '/images/boost-icon.png',
		strategyName: 'Your Strategy',
		title: 'Suggest a vault',
		apy: '-',
		wantTokenTicker: '',
		wantTokenAddress: '',
		vaultTokenTicker: '',
		vaultAddress: '',
		vaultRewardAddress: '',
		decimals: 18,
		tag: 'Coming Soon',
	},
	{
		id: '2',
		imageUrl: '/images/vault_three.png',
		imageAlt: 'Vault Three Graphic',
		tokenIcon: '/images/boost-icon.png',
		strategyName: 'Your Strategy',
		title: 'Suggest a vault',
		apy: '-',
		wantTokenTicker: '',
		wantTokenAddress: '',
		vaultTokenTicker: '',
		vaultAddress: '',
		vaultRewardAddress: '',
		decimals: 18,
		tag: 'Coming Soon',
	},
];

export const B_VAULTS_V2: IVault[] = [
	{
		id: '0',
		imageUrl: '/images/vault_one.png',
		imageAlt: 'Vault One Graphic',
		tokenIcon: '/images/usdc-logo.png',
		strategyName: 'mStable Strategy',
		title: 'Alpha Centauri A',
		apy: '-',
		wantTokenTicker: 'USDC',
		wantTokenAddress: usdcToken,
		vaultTokenTicker: 'bfUSDC',
		vaultAddress: usdcVault,
		vaultRewardAddress: usdcVaultV2Reward,
		decimals: 6,
		tag: 'Genesis Vault',
		strategyContract: `https://etherscan.io/address/${mStableStratV2}#code`,
	},
	{
		id: '1',
		imageUrl: '/images/vault_two.png',
		imageAlt: 'Vault Two Graphic',
		tokenIcon: '/images/boost-icon.png',
		strategyName: 'Your Strategy',
		title: 'Suggest a vault',
		apy: '-',
		wantTokenTicker: '',
		wantTokenAddress: '',
		vaultTokenTicker: '',
		vaultAddress: '',
		vaultRewardAddress: '',
		decimals: 18,
		tag: 'Coming Soon',
	},
	{
		id: '2',
		imageUrl: '/images/vault_three.png',
		imageAlt: 'Vault Three Graphic',
		tokenIcon: '/images/boost-icon.png',
		strategyName: 'Your Strategy',
		title: 'Suggest a vault',
		apy: '-',
		wantTokenTicker: '',
		wantTokenAddress: '',
		vaultTokenTicker: '',
		vaultAddress: '',
		vaultRewardAddress: '',
		decimals: 18,
		tag: 'Coming Soon',
	},
];
