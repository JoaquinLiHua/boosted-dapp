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
}

export const controllerAddress = "0xeDBAc73c0cc8A26180cC50df58f10441AF03d6C7";
export const usdcVault = "0x1474Dba2DF6dA2fFDba9601dc06Cd0463C172aC5";
export const usdcVaultReward = "0xe303fefd0f9a05cA92202747E9F6A1a4250B0E43";

// Strategies
export const mStableStrat = "0xe8645071649e077DcD2edC81666cbc48939aAA1A";

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
  },
];
