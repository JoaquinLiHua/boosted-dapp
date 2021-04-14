import React, { useCallback, useState } from 'react';
import {
	Box,
	Text,
	Stack,
	Flex,
	Button,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Divider,
	Tooltip,
	IconButton,
} from '@chakra-ui/react';
import BN from 'bignumber.js';
import { IVault } from 'constants/bVaults';
import { useAllowance } from 'old hooks/erc20/useAllowance';
import { useApprove } from 'old hooks/erc20/useApprove';
import { useTokenBalance } from 'hooks/erc20/useTokenBalance';
import { getDisplayBalance } from 'utils/formatBalance';
import { useVaultRewardsStake } from 'old hooks/vaults/useVaultRewardsStake';
import { useGetVaultRewardsAmount } from 'old hooks/vaults/useGetVaultRewardsAmount';
import { useClaimVaultRewards } from 'old hooks/vaults/useClaimVaultRewards';
import { useGetVaultRewardsStakedAmount } from 'old hooks/vaults/useGetVaultRewardsStakedAmount';
import { BoostSection } from './BoostSection';
import { FaInfo } from 'react-icons/fa';

interface StakePanelProps {
	vault: IVault;
}

export const StakePanel: React.FC<StakePanelProps> = ({ vault }) => {
	const [stakeAmount, setStakeAmount] = useState<string>('0');
	const [unstakeAmount, setUnstakeAmount] = useState<string>('0');
	const [requestedStake, setRequestedStake] = useState<boolean>(false);
	const [requestedUnstake, setRequestedUnstake] = useState<boolean>(false);
	const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
	const [requestedClaim, setRequestedClaim] = useState<boolean>(false);

	const vaultTokenBalance: BN = useTokenBalance(vault.vaultAddress);
	const stakedAmount: BN = useGetVaultRewardsStakedAmount(vault.vaultRewardAddress);
	const claimableRewards = useGetVaultRewardsAmount(vault.vaultRewardAddress);
	const { onClaim } = useClaimVaultRewards(vault.vaultRewardAddress);

	const handleClaim = useCallback(async () => {
		try {
			setRequestedClaim(true);
			const txHash = await onClaim();
			if (!txHash) {
				throw 'Transactions error';
			} else {
				setRequestedClaim(false);
			}
		} catch (e) {
			console.log(e);
			setRequestedClaim(false);
		}
	}, [onClaim, setRequestedClaim]);

	const { onVaultRewardsStake, onVaultRewardsUnstake } = useVaultRewardsStake(
		vault.vaultRewardAddress,
		vault.decimals
	);

	const { onApprove } = useApprove(vault.vaultAddress, vault.vaultRewardAddress);

	const allowance: BN = useAllowance(vault.vaultAddress, vault.vaultRewardAddress);

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true);
			const txHash = await onApprove();
			if (!txHash) {
				throw 'Transactions error';
			} else {
				setRequestedApproval(false);
			}
		} catch (e) {
			console.log(e);
			setRequestedApproval(false);
		}
	}, [onApprove, setRequestedApproval]);

	const handleUnstake = useCallback(async () => {
		try {
			setRequestedUnstake(true);
			const txHash = await onVaultRewardsUnstake(unstakeAmount);
			if (!txHash) {
				throw 'Transactions error';
			} else {
				setRequestedUnstake(false);
			}
		} catch (e) {
			console.log(e);
			setRequestedUnstake(false);
		}
	}, [unstakeAmount, onVaultRewardsUnstake]);

	const handleStake = useCallback(async () => {
		try {
			setRequestedStake(true);
			const txHash = await onVaultRewardsStake(stakeAmount);
			if (!txHash) {
				throw 'Transactions error';
			} else {
				setRequestedStake(false);
			}
		} catch (e) {
			console.log(e);
			setRequestedStake(false);
		}
	}, [stakeAmount, onVaultRewardsStake]);

	const handlePercentageStakeInputs = (percentage) => {
		const numberBalance = vaultTokenBalance
			.dividedBy(new BN(10).pow(new BN(vault.decimals)))
			.multipliedBy(percentage);
		const stringValue = numberBalance.toString();
		setStakeAmount(stringValue);
	};

	const handlePercentageUnstakeInputs = (percentage: number) => {
		const numberBalance = stakedAmount
			.dividedBy(new BN(10).pow(new BN(vault.decimals)))
			.multipliedBy(percentage);
		const stringValue = numberBalance.toString();
		setUnstakeAmount(stringValue);
	};

	const handleStakeChange = (value: string) => setStakeAmount(value);
	const handleUnstakeChange = (value: string) => setUnstakeAmount(value);

	return (
		<Stack spacing={8}>
			<Box mt={4} fontWeight="bold" fontSize="lg">
				Particpate in the {vault.vaultTokenTicker} reward pool
			</Box>

			<Box mt={4} fontSize="md">
				1) Stake your {vault.vaultTokenTicker} in the {vault.vaultTokenTicker} pool to participate
				in the rewards pool to gain additional rewards.
			</Box>

			<Box mt={4} fontSize="md">
				2) Purchase BOOSTER to increase your yield in the pool.
			</Box>

			<Box mt={4} fontSize="md">
				Each strategy allocates some of the yield into the rewards pool for stakers.
			</Box>

			<Divider />

			<Box t={4} fontWeight="bold" fontSize="lg">
				Pool Rewards
			</Box>
			<Flex justifyContent="space-between">
				<Text fontWeight="bold">Rewards available to claim</Text>
				<Text>
					{getDisplayBalance(claimableRewards, vault.decimals)}{' '}
					{vault.wantTokenTicker.toUpperCase()}
				</Text>
			</Flex>
			<Stack spacing={6}>
				<Button
					colorScheme="blue"
					width="100%"
					isLoading={requestedClaim}
					disabled={!allowance.toNumber() || requestedClaim}
					onClick={() => handleClaim()}
				>
					Claim
				</Button>
			</Stack>
			<Divider />

			<Box t={4} fontWeight="bold" fontSize="lg">
				Stake and Unstake {vault.vaultTokenTicker}
			</Box>
			<Flex flexDirection={['column', 'column', 'row']}>
				<Box width={['100%', '100%', '50%']} mr={4}>
					<Flex justifyContent="space-between" mb={2}>
						<Text fontWeight="bold">{vault.vaultTokenTicker.toUpperCase()} available to stake</Text>
						<Text>
							{getDisplayBalance(vaultTokenBalance, vault.decimals)}{' '}
							{vault.vaultTokenTicker.toUpperCase()}
						</Text>
					</Flex>
					<Stack spacing={4}>
						<NumberInput value={stakeAmount} onChange={handleStakeChange}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Flex width="100%">
							<Button w="25%" mr={1} onClick={() => handlePercentageStakeInputs(0.25)}>
								25%
							</Button>
							<Button w="25%" mx={1} onClick={() => handlePercentageStakeInputs(0.5)}>
								50%
							</Button>
							<Button w="25%" mx={1} onClick={() => handlePercentageStakeInputs(0.75)}>
								75%
							</Button>
							<Button w="25%" ml={1} onClick={() => handlePercentageStakeInputs(1)}>
								100%
							</Button>
						</Flex>
						{!allowance.toNumber() ? (
							<Button
								colorScheme="blue"
								disabled={requestedApproval}
								isLoading={requestedApproval}
								onClick={() => handleApprove()}
							>
								Approve
							</Button>
						) : (
							<Button
								colorScheme="blue"
								width="100%"
								isLoading={requestedStake}
								disabled={requestedStake}
								onClick={() => handleStake()}
							>
								Stake
							</Button>
						)}
					</Stack>
				</Box>
				<Box width={['100%', '100%', '50%']} mr={4} mt={[4, 4, 0]}>
					<Flex justifyContent="space-between" mb={2}>
						<Flex>
							<Text fontWeight="bold">
								{vault.vaultTokenTicker.toUpperCase()} available to unstake
							</Text>
							<Tooltip label={`Your purchased BOOSTER(s) reset when you unstake`} fontSize="sm">
								<IconButton
									ml={[0, 0, 2]}
									mr={[2, 2, 0]}
									aria-label="vault-withdraw-info"
									size="xs"
									icon={<FaInfo />}
								/>
							</Tooltip>
						</Flex>

						<Text>
							{getDisplayBalance(stakedAmount, vault.decimals)}{' '}
							{vault.vaultTokenTicker.toUpperCase()}
						</Text>
					</Flex>
					<Stack spacing={4}>
						<NumberInput value={unstakeAmount} onChange={handleUnstakeChange}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<Flex width="100%">
							<Button w="25%" mr={1} onClick={() => handlePercentageUnstakeInputs(0.25)}>
								25%
							</Button>
							<Button w="25%" mx={1} onClick={() => handlePercentageUnstakeInputs(0.5)}>
								50%
							</Button>
							<Button w="25%" mx={1} onClick={() => handlePercentageUnstakeInputs(0.75)}>
								75%
							</Button>
							<Button w="25%" ml={1} onClick={() => handlePercentageUnstakeInputs(1)}>
								100%
							</Button>
						</Flex>
						<Button
							colorScheme="blue"
							width="100%"
							isLoading={requestedUnstake}
							disabled={!allowance.toNumber() || requestedUnstake}
							onClick={() => handleUnstake()}
						>
							Unstake
						</Button>
					</Stack>
				</Box>
			</Flex>
			<Divider />
			<BoostSection vault={vault} />
		</Stack>
	);
};
