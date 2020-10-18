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
import React, { useState } from "react";
import { IVault } from "src/constants/bVaults";
import { useStakedAmount } from "src/hooks/useStakedAmount";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { getDisplayBalance } from "src/utils/formatBalance";

interface StakePanelProps {
  vault: IVault;
}

export const StakePanel: React.FC<StakePanelProps> = ({ vault }) => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [requestedDeposit, setRequestedDeposit] = useState<boolean>(false);
  const [requestedWithdraw, setRequestedWithdraw] = useState<boolean>(false);
  const [requestedClaim, setRequestedClaim] = useState<boolean>(false);

  const vaultTokenBalance: BN = useTokenBalance(vault.vaultRewardAddress);
  const stakedAmount: BN = useStakedAmount(vault.vaultRewardAddress);
  const claimableRewards: BN = new BN(1 * 1e18);

  const handleClaim = () => {
    setRequestedClaim(true);
  };

  const handleDeposit = () => {
    setRequestedDeposit(true);
  };

  const handleWithdraw = () => {
    setRequestedWithdraw(true);
  };

  const handlePercentageDepositInputs = (percentage) => {
    const bnValue: BN = vaultTokenBalance.dividedBy(percentage);
    const stringValue = bnValue.toString();
    setDepositAmount(stringValue);
  };

  const handlePercentageWithdrawInput = (percentage: number) => {
    const bnValue: BN = stakedAmount.dividedBy(percentage);
    const stringValue = bnValue.toString();
    setWithdrawAmount(stringValue);
  };
  const handleDepositAmountChange = (value: string) => setDepositAmount(value);
  const handleWithdrawAmountChange = (value: string) =>
    setWithdrawAmount(value);

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
          disabled={requestedClaim}
          onClick={() => handleClaim()}
        >
          Claim
        </Button>
      </Stack>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.vaultTokenTicker.toUpperCase()} available to deposit
        </Text>
        <Text>
          {getDisplayBalance(vaultTokenBalance)}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
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
        <Button
          colorScheme="blue"
          width="100%"
          isLoading={requestedDeposit}
          disabled={requestedDeposit}
          onClick={() => handleDeposit()}
        >
          Deposit
        </Button>
      </Stack>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.vaultTokenTicker.toUpperCase()} available to withdraw
        </Text>
        <Text>
          {getDisplayBalance(stakedAmount)}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
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
          disabled={requestedWithdraw}
          onClick={() => handleWithdraw()}
        >
          Withdraw
        </Button>
      </Stack>
    </Stack>
  );
};
