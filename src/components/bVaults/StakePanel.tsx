import React, { useCallback, useState } from "react";
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
} from "@chakra-ui/core";
import BN from "bignumber.js";
import { IVault } from "src/constants/bVaults";
import { useAllowance } from "src/hooks/useAllowance";
import { useApprove } from "src/hooks/useApprove";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useVaultRewardsStake } from "src/hooks/useVaultRewardsStake";
import { useGetVaultRewardsAmount } from "src/hooks/useGetVaultRewardsAmount";
import { useClaimVaultRewards } from "src/hooks/useClaimVaultRewards";
import { useGetVaultRewardsStakedAmount } from "src/hooks/useGetVaultRewardsStakedAmount";

interface StakePanelProps {
  vault: IVault;
}

export const StakePanel: React.FC<StakePanelProps> = ({ vault }) => {
  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
  const [requestedStake, setRequestedStake] = useState<boolean>(false);
  const [requestedUnstake, setRequestedUnstake] = useState<boolean>(false);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedClaim, setRequestedClaim] = useState<boolean>(false);

  const vaultTokenBalance: BN = useTokenBalance(vault.vaultAddress);
  const stakedAmount: BN = useGetVaultRewardsStakedAmount(
    vault.vaultRewardAddress
  );

  const claimableRewards = useGetVaultRewardsAmount(vault.vaultRewardAddress);
  const { onClaim } = useClaimVaultRewards(vault.vaultRewardAddress);

  const handleClaim = useCallback(async () => {
    try {
      setRequestedClaim(true);
      const txHash = await onClaim();
      if (!txHash) {
        throw "Transactions error";
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
  const { onApprove } = useApprove(
    vault.vaultAddress,
    vault.vaultRewardAddress
  );
  const allowance: BN = useAllowance(
    vault.vaultAddress,
    vault.vaultRewardAddress
  );

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (!txHash) {
        throw "Transaction error";
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
        throw "Transaction error";
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
        throw "Transaction error";
      } else {
        setRequestedStake(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedStake(false);
    }
  }, [stakeAmount, onVaultRewardsStake]);

  const handlePercentageStakeInputs = (percentage) => {
    const numberBalance = vaultTokenBalance.dividedBy(
      new BN(10).pow(new BN(vault.decimals))
    );
    const stringValue = (percentage * numberBalance.toNumber()).toString();
    setStakeAmount(stringValue);
  };

  const handlePercentageUnstakeInputs = (percentage: number) => {
    const numberBalance = stakedAmount.dividedBy(
      new BN(10).pow(new BN(vault.decimals))
    );
    const stringValue = (percentage * numberBalance.toNumber()).toString();
    setUnstakeAmount(stringValue);
  };

  const handleStakeChange = (value: string) => setStakeAmount(value);
  const handleUnstakeChange = (value: string) => setUnstakeAmount(value);

  return (
    <Stack spacing={8}>
      <Box mt={4} fontWeight="bold" fontSize="lg" textTransform="uppercase">
        Stake {vault.vaultTokenTicker} in vault to receive rewards.
      </Box>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Rewards available to claim</Text>
        <Text>
          {getDisplayBalance(claimableRewards)}{" "}
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
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.vaultTokenTicker.toUpperCase()} available to stake
        </Text>
        <Text>
          {getDisplayBalance(vaultTokenBalance, vault.decimals)}{" "}
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
          <Button
            w="25%"
            mr={1}
            onClick={() => handlePercentageStakeInputs(0.25)}
          >
            25%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageStakeInputs(0.5)}
          >
            50%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageStakeInputs(0.75)}
          >
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
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.vaultTokenTicker.toUpperCase()} available to unstake
        </Text>
        <Text>
          {getDisplayBalance(stakedAmount, vault.decimals)}{" "}
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
          <Button
            w="25%"
            mr={1}
            onClick={() => handlePercentageUnstakeInputs(0.25)}
          >
            25%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageUnstakeInputs(0.5)}
          >
            50%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageUnstakeInputs(0.75)}
          >
            75%
          </Button>
          <Button
            w="25%"
            ml={1}
            onClick={() => handlePercentageUnstakeInputs(1)}
          >
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
    </Stack>
  );
};
