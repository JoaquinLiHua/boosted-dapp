import { usdcToken } from "../tokenAddresses";

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

export const controllerAddress = "0x5Cf5eeCd076D1f2CBCD46B6bEF1783b37D89748a";
export const usdcVault = "0xf053B13FD62f908d0569099E517cB3B12A2BE1B4";
export const usdcVaultReward = "0x0807a6e36BBb005d4Ec1f1917d4dB53C6fBd9Ab0";
// Strategies
export const mStableStrat = "0xcE25CC3f83B5cb1c39DA46a914C00E8f2590f6ab";

export const B_VAULTS: IVault[] = [
  {
    id: "0",
    imageUrl: "/images/vault_one.png",
    imageAlt: "Vault One Graphic",
    tokenIcon: "/images/usdc-logo.png",
    strategyName: "mStable Strategy",
    title: "Alpha Centauri A",
    apy: "-",
    wantTokenTicker: "USDC",
    wantTokenAddress: usdcToken,
    vaultTokenTicker: "bfUSDC",
    vaultAddress: usdcVault,
    vaultRewardAddress: usdcVaultReward,
    decimals: 6,
    tag: "Genesis Vault",
    strategyContract:
      "https://etherscan.io/address/0x43e1a49C86F8471eb454c2b2d95B899cB35CA399#code",
  },
  {
    id: "1",
    imageUrl: "/images/vault_two.png",
    imageAlt: "Vault Two Graphic",
    tokenIcon: "/images/boost-icon.png",
    strategyName: "Your Strategy",
    title: "Suggest a vault",
    apy: "-",
    wantTokenTicker: "",
    wantTokenAddress: "",
    vaultTokenTicker: "",
    vaultAddress: "",
    vaultRewardAddress: "",
    decimals: 18,
    tag: "Coming Soon",
  },
];
