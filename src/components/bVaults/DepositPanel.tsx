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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
  IconButton,
} from "@chakra-ui/core";
import BN from "bignumber.js";
import React, { useCallback, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { IVault } from "src/constants/bVaults";
import { useAllowance } from "src/hooks/erc20/useAllowance";
import { useApprove } from "src/hooks/erc20/useApprove";
import { useVaultDeposit } from "src/hooks/vaults/useDeposit";
import { useTokenBalance } from "src/hooks/erc20/useTokenBalance";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useGetVaultPricePerFullShare } from "src/hooks/vaults/useGetVaultPricePerFullShare";
import { useGetVaultWithdrawalFee } from "src/hooks/vaults/useGetVaultWithdrawalFee";
import { useGetVaultDepositedAmount } from "src/hooks/vaults/useGetVaultDepositedAmount";

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
  const stakedAmount: BN = useGetVaultDepositedAmount(vault.vaultAddress);

  const pricePerFullShare: BN = useGetVaultPricePerFullShare(
    vault.vaultAddress
  );
  const withdrawalFee: BN = useGetVaultWithdrawalFee(
    vault.vaultAddress,
    vault.decimals
  );

  // Try this
  // const maxStakedAmount: BN = stakedAmount
  //   .multipliedBy(pricePerFullShare)
  //   .dividedBy(1e18)
  //   .minus(stakedAmount.multipliedBy(withdrawalFee).dividedBy(10000));

  const maxStakedAmount: BN = stakedAmount
    .multipliedBy(pricePerFullShare)
    .minus(stakedAmount.multipliedBy(withdrawalFee.dividedBy(100)))
    .dividedBy(1e18);

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
    const numberBalance = maxStakedAmount
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
      <Box mt={4} fontWeight="bold" fontSize="lg">
        How to participate in bVaults
      </Box>

      <Box mt={4} fontSize="md">
        1) Deposit your {vault.wantTokenTicker} to receive interest bearing{" "}
        {vault.vaultTokenTicker}
      </Box>

      <Box mt={4} fontSize="md">
        2) Stake your {vault.vaultTokenTicker} in the {vault.vaultTokenTicker}{" "}
        pool to participate in the rewards pool to gain additional rewards.
      </Box>

      <Box mt={4} fontSize="sm">
        *Step 2 is optional
      </Box>

      <Popover>
        <PopoverTrigger>
          <Button w={200} size="sm" rightIcon={<FaInfo />}>
            Learn more
          </Button>
        </PopoverTrigger>
        <PopoverContent zIndex={100}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>What is {vault.vaultTokenTicker}?</PopoverHeader>
          <PopoverBody>
            <Text>1) bfUSDC is interest bearing</Text>
            <Text>
              2) Stake your bfUSDC in the bfUSDC pool to earn additional rewards
              that can be BOOSTED
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Divider />
      <Box t={4} fontWeight="bold" fontSize="lg">
        Convert between USDC and bfUSDC
      </Box>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Your {vault.vaultTokenTicker} balance</Text>
        <Text>
          {getDisplayBalance(vaultTokenBalance, vault.decimals)}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Flex flexDirection={["column", "column", "row"]}>
        <Box width={["100%", "100%", "50%"]} mr={4}>
          <Flex justifyContent="space-between" mb={2}>
            <Text fontWeight="bold">
              {vault.wantTokenTicker.toUpperCase()} available to deposit
            </Text>
            <Text>
              {getDisplayBalance(wantTokenBalance, vault.decimals)}{" "}
              {vault.wantTokenTicker.toUpperCase()}
            </Text>
          </Flex>
          <Stack spacing={4}>
            <NumberInput
              value={depositAmount}
              onChange={handleDepositAmountChange}
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
        </Box>
        <Box width={["100%", "100%", "50%"]} mr={4} mt={[4, 4, 0]}>
          <Flex justifyContent="space-between" mb={2}>
            <Flex>
              <Text fontWeight="bold">
                {vault.wantTokenTicker.toUpperCase()} available to withdraw
              </Text>
              <Tooltip
                label={`There is a ${withdrawalFee.toNumber()}% withdrawal fee on this vault.`}
                fontSize="sm"
              >
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
              {getDisplayBalance(maxStakedAmount, vault.decimals)}{" "}
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
        </Box>
      </Flex>
    </Stack>
  );
};
