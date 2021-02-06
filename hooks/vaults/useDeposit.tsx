import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import { deposit, withdraw } from 'utils/vault';

export const useVaultDeposit = (vaultAddress: string, decimals: number) => {
	const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

	const handleDeposit = useCallback(
		async (amount: string) => {
			if (account) {
				const txHash = await deposit(ethereum, vaultAddress, amount, decimals, account);
				return txHash;
			}
		},
		[account, vaultAddress, ethereum, decimals]
	);

	const handleWithdraw = useCallback(
		async (amount: string) => {
			if (account) {
				const txHash = await withdraw(ethereum, vaultAddress, amount, decimals, account);
				return txHash;
			}
		},
		[account, vaultAddress, ethereum, decimals]
	);

	return { onVaultDeposit: handleDeposit, onVaultWithdraw: handleWithdraw };
};
