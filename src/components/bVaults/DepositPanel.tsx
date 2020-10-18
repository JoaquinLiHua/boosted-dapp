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

interface DepositPanelProps {
  vault: IVault;
}

export const DepositPanel: React.FC<DepositPanelProps> = ({ vault }) => {
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [requestedDeposit, setRequestedDeposit] = useState<boolean>(false);
  const [requestedWithdraw, setRequestedWithdraw] = useState<boolean>(false);

  const wantTokenBalance: BN = useTokenBalance(vault.wantTokenTicker);
  const vaultTokenBalance: BN = useTokenBalance(vault.vaultAddress);
  const stakedAmount: BN = useStakedAmount(vault.vaultAddress);

  const handleDeposit = () => {};

  const handlePercentageDepositInputs = (percentage) => {
    const numberBalance = wantTokenBalance.dividedBy(percentage);
    const stringValue = (percentage * numberBalance.toNumber()).toString();
    setDepositAmount(stringValue);
  };

  const handlePercentageWithdrawInput = (percentage: number) => {
    const numberBalance = stakedAmount.dividedBy(new BN(10).pow(new BN(18)));
    const stringValue = (percentage * numberBalance.toNumber()).toString();
    setWithdrawAmount(stringValue);
  };
  const handleDepositAmountChange = (value: string) => setDepositAmount(value);

  return (
    <Stack spacing={8}>
      <Box mt={4} fontWeight="bold" fontSize="lg" textTransform="uppercase">
        Deposit {vault.wantTokenTicker} to receive {vault.vaultTokenTicker} and
        start staking in vaults.
      </Box>

      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          Your
          {vault.vaultTokenTicker} balance
        </Text>
        <Text>
          {getDisplayBalance(wantTokenBalance)}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">
          {vault.wantTokenTicker.toUpperCase()} available to deposit
        </Text>
        <Text>
          {getDisplayBalance(wantTokenBalance)}{" "}
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
          {vault.wantTokenTicker.toUpperCase()} available to withdraw
        </Text>
        <Text>
          {/* {getDisplayBalance(wantTokenBalance)} {pool.tokenTicker.toUpperCase()} */}
          0
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
          Withdraw
        </Button>
      </Stack>
    </Stack>
  );
};
