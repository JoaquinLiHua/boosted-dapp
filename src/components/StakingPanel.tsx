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
import { getDisplayBalance } from "src/utils/formatBalance";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import useAllowance from "src/hooks/useAllowance";
import { IPool } from "src/context/PoolContext";
import useApprove from "src/hooks/useApprove";
import useStake from "src/hooks/useStake";
import BN from "bignumber.js";
import useStakedAmount from "src/hooks/useStakedAmount";
import useExit from "src/hooks/useExit";

interface StakingPanelProps {
  pool: IPool;
}

export const StakingPanel: React.FC<StakingPanelProps> = ({ pool }) => {
  const allowance = useAllowance(pool.tokenContract, pool.address);
  const tokenBalance = useTokenBalance(pool.tokenContract);
  const stakedAmount = useStakedAmount(pool.address);
  const { onApprove } = useApprove(pool.tokenContract, pool.address);
  const { onStake, onUnstake } = useStake(pool.address);
  const { onExit } = useExit(pool.address);
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
        throw "Transactions error";
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
        throw "Transactions error";
      } else {
        setRequestedStake(false);
      }
    } catch (e) {
      setRequestedStake(false);
      console.log(e);
    }
  }, [stakeAmount, onStake]);

  const handleUnstake = useCallback(async () => {
    try {
      setRequestedUnstake(true);
      const txHash = await onUnstake(unstakeAmount);
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedUnstake(false);
      }
    } catch (e) {
      setRequestedUnstake(false);
      console.log(e);
    }
  }, [unstakeAmount, onUnstake]);

  const handleExit = useCallback(async () => {
    try {
      setRequestedExit(true);
      const txHash = await onExit();
      if (!txHash) {
        throw "Transactions error";
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
    <Stack>
      <Flex
        justifyContent="space-between"
        my={2}
        borderWidth={1}
        borderRadius={5}
        p={8}
      >
        <Text>{pool.tokenTicker.toUpperCase()} balance</Text>
        <Text>
          {getDisplayBalance(tokenBalance)} {pool.tokenTicker.toUpperCase()}
        </Text>
      </Flex>
      {allowance.toNumber() && (
        <Stack>
          <NumberInput value={stakeAmount} onChange={handleStakeChange}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Flex justifyContent="space-between" my="2">
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
          <Flex justifyContent="space-evenly">
            <Button
              colorScheme="green"
              width="100%"
              my="2"
              disabled={requestedStake}
              onClick={() => handleStake()}
            >
              {requestedStake ? "Staking" : "Stake"}
            </Button>
          </Flex>
        </Stack>
      )}
      <Divider />
      <Flex
        justifyContent="space-between"
        my={2}
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
          onClick={() => handleApprove()}
        >
          {requestedApproval
            ? "Approving..."
            : `Approve ${pool.tokenTicker.toUpperCase()}`}
        </Button>
      ) : (
        <>
          <Stack>
            <NumberInput value={unstakeAmount} onChange={handleUnstakeChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Flex justifyContent="space-between" my="2">
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
            <Flex justifyContent="space-evenly">
              <Button
                colorScheme="green"
                width="100%"
                my="2"
                disabled={requestedUnstake}
                onClick={() => handleUnstake()}
              >
                {requestedUnstake ? "Unstaking..." : "Unstake"}
              </Button>
            </Flex>
          </Stack>
          <Flex>
            <Button
              my="2"
              width="100%"
              disabled={requestedExit}
              onClick={() => handleExit()}
              colorScheme="red"
            >
              {requestedExit ? "Exiting..." : "Exit & Claim"}
            </Button>
          </Flex>
        </>
      )}
    </Stack>
  );
};
