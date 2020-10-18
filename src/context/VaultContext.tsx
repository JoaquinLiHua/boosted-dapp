import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";
import { usePriceFeedContext } from "./PriceFeedContext";
import { B_VAULTS, IVault } from "src/constants/bVaults";

interface IVaultContext {
  vaults: IVault[];
}

export const VaultContext = createContext<IVaultContext>({
  vaults: [],
});

export const VaultProvider: React.FC = ({ children }) => {
  const { coinGecko } = usePriceFeedContext();
  const [vaults, setVaults] = useState<IVault[]>([]);
  const {
    ethereum,
    account,
  }: { ethereum: provider; account: string | null } = useWallet();

  const getVaults = useCallback(async () => {
    setVaults(B_VAULTS);
  }, []);

  useEffect(() => {
    getVaults();
    const refreshInterval = setInterval(getVaults, 10000);
    return () => clearInterval(refreshInterval);
  }, [getVaults]);

  return (
    <VaultContext.Provider
      value={{
        vaults,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVaultContext = () => useContext(VaultContext) as IVaultContext;
