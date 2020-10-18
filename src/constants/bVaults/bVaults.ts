export interface IVault {
  id: string;
  imageUrl: string;
  imageAlt: string;
  tokenIcon: string;
  underlyingTokenTicker: string;
  strategyName: string;
  title: string;
  apy: number;
}

export const B_VAULTS: IVault[] = [
  {
    id: "0",
    imageUrl: "/images/vault_one.png",
    imageAlt: "Rear view of modern home with pool",
    tokenIcon: "/images/usdc-logo.png",
    underlyingTokenTicker: "USDC",
    strategyName: "mStable Strategy",
    title: "Alpha Centauri A",
    apy: 40,
  },
];
