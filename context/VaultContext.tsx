import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { B_VAULTS, B_VAULTS_V2, IVault } from 'constants/bVaults';

interface IVaultContext {
	vaults: IVault[];
	vaultsV2: IVault[];
}

export const VaultContext = createContext<IVaultContext>({
	vaults: [],
	vaultsV2: [],
});

export const VaultProvider: React.FC = ({ children }) => {
	const [vaults, setVaults] = useState<IVault[]>([]);
	const [vaultsV2, setVaultsV2] = useState<IVault[]>([]);

	const getVaults = useCallback(async () => {
		setVaults(B_VAULTS);
		setVaultsV2(B_VAULTS_V2);
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
				vaultsV2,
			}}
		>
			{children}
		</VaultContext.Provider>
	);
};

export const useVaultContext = () => useContext(VaultContext) as IVaultContext;
