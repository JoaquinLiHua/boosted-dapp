import { usdcToken } from "../tokenAddresses";

export interface IVault {
  id: string;
  imageUrl: string;
  imageAlt: string;
  tokenIcon: string;
  strategyName: string;
  title: string;
  apy?: number;
  wantTokenTicker: string;
  wantTokenAddress: string;
  vaultTokenTicker: string;
  vaultAddress: string;
  vaultRewardAddress: string;
  decimals: number;
  tag?: string;
  instructions: string;
}

export const controllerAddress = "0x75275575fD45FB4B88CD2b56aE6E54a62b33c788";
export const usdcVault = "0xb5f6221ea3c0Cb3FC7a3D0d36420311dc69B2f3c";
export const usdcVaultReward = "0xbA89bDde0FC7f67dE7C4eC32283f44c86c1868dc";

// Strategies
export const mStableStrat = "0x1280E96618349eF01571Ee148d850672d72f3E51";

export const B_VAULTS: IVault[] = [
  {
    id: "0",
    imageUrl: "/images/vault_one.png",
    imageAlt: "Rear view of modern home with pool",
    tokenIcon: "/images/usdc-logo.png",
    strategyName: "mStable Strategy",
    title: "Alpha Centauri A",
    apy: 40,
    wantTokenTicker: "USDC",
    wantTokenAddress: usdcToken,
    vaultTokenTicker: "bfUSDC",
    vaultAddress: usdcVault,
    vaultRewardAddress: usdcVaultReward,
    decimals: 6,
    tag: "Genesis Vault",
    instructions: "Deposit USDC, receive bfUSDC",
  },
];
