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
import React, { useCallback, useState } from "react";
import { IVault } from "src/constants/bVaults";
import { useAllowance } from "src/hooks/useAllowance";
import { useApprove } from "src/hooks/useApprove";
import { useVaultDeposit } from "src/hooks/useDeposit";
import { useGetVaultRewardsStakedAmount } from "src/hooks/useGetVaultRewardsStakedAmount";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { getDisplayBalance } from "src/utils/formatBalance";

interface DepositPanelProps {
  vault: IVault;
}

export const DepositPanel: React.FC<DepositPanelProps> = ({ vault }) => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [requestedDeposit, setRequestedDeposit] = useState<boolean>(false);
  const [requestedWithdraw, setRequestedWithdraw] = useState<boolean>(false);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);

  const wantTokenBalance: BN = useTokenBalance(vault.wantTokenAddress);
  const vaultTokenBalance: BN = useTokenBalance(vault.vaultAddress);
  const stakedAmount: BN = useGetVaultRewardsStakedAmount(vault.vaultAddress);

  const { onVaultDeposit, onVaultWithdraw } = useVaultDeposit(
    vault.vaultAddress,
    vault.decimals
  );
  const { onApprove } = useApprove(vault.wantTokenAddress, vault.vaultAddress);
  const allowance: BN = useAllowance(
    vault.wantTokenAddress,
    vault.vaultAddress
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

  const handleDeposit = useCallback(async () => {
    try {
      setRequestedDeposit(true);
      const txHash = await onVaultDeposit(depositAmount);
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedDeposit(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedDeposit(false);
    }
  }, [depositAmount, onVaultDeposit]);

  const handleWithdraw = useCallback(async () => {
    try {
      setRequestedWithdraw(true);
      const txHash = await onVaultWithdraw(withdrawAmount);
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedWithdraw(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedWithdraw(false);
    }
  }, [withdrawAmount, onVaultWithdraw]);

  const handlePercentageDepositInputs = (percentage) => {
    const numberBalance = wantTokenBalance
      .dividedBy(Math.pow(10, vault.decimals))
      .multipliedBy(percentage);
    const stringValue = numberBalance.toString();
    setDepositAmount(stringValue);
  };

  const handlePercentageWithdrawInput = (percentage: number) => {
    const numberBalance = stakedAmount
      .dividedBy(Math.pow(10, vault.decimals))
      .multipliedBy(percentage);
    const stringValue = numberBalance.toString();
    setWithdrawAmount(stringValue);
  };

  const handleDepositAmountChange = (value: string) => setDepositAmount(value);
  const handleWithdrawAmountChange = (value: string) =>
    setWithdrawAmount(value);

  return (
    <Stack spacing={8}>
      <Box mt={4} fontWeight="bold" fontSize="lg" textTransform="uppercase">
        Deposit {vault.wantTokenTicker} to receive {vault.vaultTokenTicker} and
        start staking in vaults.
      </Box>

      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Your {vault.vaultTokenTicker} balance</Text>
        <Text>
          {getDisplayBalance(vaultTokenBalance, vault.decimals)}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.wantTokenTicker.toUpperCase()} available to deposit
        </Text>
        <Text>
          {getDisplayBalance(wantTokenBalance, vault.decimals)}{" "}
          {vault.wantTokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Stack spacing={4}>
        <NumberInput value={depositAmount} onChange={handleDepositAmountChange}>
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
            onClick={() => handlePercentageDepositInputs(0.25)}
          >
            25%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageDepositInputs(0.5)}
          >
            50%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageDepositInputs(0.75)}
          >
            75%
          </Button>
          <Button
            w="25%"
            ml={1}
            onClick={() => handlePercentageDepositInputs(1)}
          >
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
            isLoading={requestedDeposit}
            disabled={requestedDeposit}
            onClick={() => handleDeposit()}
          >
            Deposit
          </Button>
        )}
      </Stack>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.wantTokenTicker.toUpperCase()} available to withdraw
        </Text>
        <Text>
          {getDisplayBalance(stakedAmount, vault.decimals)}{" "}
          {vault.wantTokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Stack spacing={4}>
        <NumberInput
          value={withdrawAmount}
          onChange={handleWithdrawAmountChange}
        >
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
            onClick={() => handlePercentageWithdrawInput(0.25)}
          >
            25%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageWithdrawInput(0.5)}
          >
            50%
          </Button>
          <Button
            w="25%"
            mx={1}
            onClick={() => handlePercentageWithdrawInput(0.75)}
          >
            75%
          </Button>
          <Button
            w="25%"
            ml={1}
            onClick={() => handlePercentageWithdrawInput(1)}
          >
            100%
          </Button>
        </Flex>
        <Button
          colorScheme="blue"
          width="100%"
          isLoading={requestedWithdraw}
          disabled={!allowance.toNumber() || requestedWithdraw}
          onClick={() => handleWithdraw()}
        >
          Withdraw
        </Button>
      </Stack>
    </Stack>
  );
};
