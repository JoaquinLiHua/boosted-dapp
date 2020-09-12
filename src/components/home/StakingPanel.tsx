import React, { useCallback, useState } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
} from "@chakra-ui/core";
import BN from "bignumber.js";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { useAllowance } from "src/hooks/useAllowance";
import { IPool } from "src/context/PoolContext";
import { useApprove } from "src/hooks/useApprove";
import { useStake } from "src/hooks/useStake";
import { useStakedAmount } from "src/hooks/useStakedAmount";
import { useExit } from "src/hooks/useExit";

interface StakingPanelProps {
  pool: IPool;
}

export const StakingPanel: React.FC<StakingPanelProps> = ({ pool }) => {
  const { onApprove } = useApprove(pool.tokenContract, pool.address);
  const { onStake, onUnstake } = useStake(pool.address);
  const { onExit } = useExit(pool.address);

  const allowance: BN = useAllowance(pool.tokenContract, pool.address);
  const tokenBalance: BN = useTokenBalance(pool.tokenContract);
  const stakedAmount: BN = useStakedAmount(pool.address);

  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedStake, setRequestedStake] = useState<boolean>(false);
  const [requestedUnstake, setRequestedUnstake] = useState<boolean>(false);
  const [requestedExit, setRequestedExit] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("");

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

  const handlePercentageStakeInputs = (percentage) => {
    const numberBalance = tokenBalance.dividedBy(new BN(10).pow(new BN(18)));
    const stringValue = (percentage * numberBalance.toNumber()).toString();
    setStakeAmount(stringValue);
  };

  const handlePercentageUnstakeInput = (percentage: number) => {
    const numberBalance = stakedAmount.dividedBy(new BN(10).pow(new BN(18)));
    const stringValue = (percentage * numberBalance.toNumber()).toString();
    setUnstakeAmount(stringValue);
  };

  const handleStake = useCallback(async () => {
    try {
      setRequestedStake(true);
      const txHash = await onStake(stakeAmount);
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedStake(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedStake(false);
    }
  }, [stakeAmount, onStake]);

  const handleUnstake = useCallback(async () => {
    try {
      setRequestedUnstake(true);
      const txHash = await onUnstake(unstakeAmount);
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedUnstake(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedUnstake(false);
    }
  }, [unstakeAmount, onUnstake]);

  const handleExit = useCallback(async () => {
    try {
      setRequestedExit(true);
      const txHash = await onExit();
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedExit(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedExit(false);
    }
  }, [onExit]);

  const handleStakeChange = (value: string) => setStakeAmount(value);
  const handleUnstakeChange = (value: string) => setUnstakeAmount(value);

  return (
    <Stack direction={["row", "row", "column"]} overflow="scroll">
      <Stack flexDirection={["column"]}>
        <Flex
          justifyContent="space-between"
          borderWidth={1}
          borderRadius={5}
          p={8}
        >
          <Text>{pool.tokenTicker.toUpperCase()} balance</Text>
          <Text>
            {getDisplayBalance(tokenBalance)} {pool.tokenTicker.toUpperCase()}
          </Text>
        </Flex>
        {allowance.toNumber() > 0 && (
          <Stack spacing={4}>
            <NumberInput value={stakeAmount} onChange={handleStakeChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Flex justifyContent="space-between">
              <Button onClick={() => handlePercentageStakeInputs(0.25)}>
                25%
              </Button>
              <Button onClick={() => handlePercentageStakeInputs(0.5)}>
                50%
              </Button>
              <Button onClick={() => handlePercentageStakeInputs(0.75)}>
                75%
              </Button>
              <Button onClick={() => handlePercentageStakeInputs(0.99999)}>
                100%
              </Button>
            </Flex>
            <Button
              colorScheme="green"
              width="100%"
              isLoading={requestedStake}
              disabled={requestedStake}
              onClick={() => handleStake()}
            >
              Stake
            </Button>
          </Stack>
        )}
      </Stack>
      <Divider display={["none", "none", "flex"]} />
      <Stack direction={["column"]}>
        <Flex
          justifyContent="space-between"
          borderWidth={1}
          borderRadius={5}
          p={8}
        >
          <Text>{pool.tokenTicker.toUpperCase()} staked</Text>
          <Text>
            {getDisplayBalance(stakedAmount)} {pool.tokenTicker.toUpperCase()}
          </Text>
        </Flex>
        {!allowance.toNumber() ? (
          <Button
            colorScheme="green"
            disabled={requestedApproval}
            isLoading={requestedApproval}
            onClick={() => handleApprove()}
          >
            Approve
          </Button>
        ) : (
          <Stack spacing={4}>
            <NumberInput value={unstakeAmount} onChange={handleUnstakeChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Flex justifyContent="space-between">
              <Button onClick={() => handlePercentageUnstakeInput(0.25)}>
                25%
              </Button>
              <Button onClick={() => handlePercentageUnstakeInput(0.5)}>
                50%
              </Button>
              <Button onClick={() => handlePercentageUnstakeInput(0.75)}>
                75%
              </Button>
              <Button onClick={() => handlePercentageUnstakeInput(0.99999)}>
                100%
              </Button>
            </Flex>
            <Button
              isLoading={requestedUnstake}
              colorScheme="green"
              width="100%"
              disabled={requestedUnstake}
              onClick={() => handleUnstake()}
            >
              Unstake
            </Button>
            <Button
              isLoading={requestedExit}
              width="100%"
              disabled={requestedExit}
              onClick={() => handleExit()}
              colorScheme="red"
            >
              Exit All & Claim
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
