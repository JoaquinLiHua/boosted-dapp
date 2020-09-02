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
} from "@chakra-ui/core";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import useAllowance from "src/hooks/useAllowance";
import { IPool } from "src/context/PoolContext";
import useApprove from "src/hooks/useApprove";
import useStake from "src/hooks/useStake";
import BigNumber from "bignumber.js";
import useStakedAmount from "src/hooks/useStakedAmount";

interface StakingPanelProps {
  pool: IPool;
}

export const StakingPanel: React.FC<StakingPanelProps> = ({ pool }) => {
  const allowance = useAllowance(pool.tokenContract, pool.address);
  const tokenBalance = useTokenBalance(pool.tokenContract);
  const stakedAmount = useStakedAmount(pool.address);
  const { onApprove } = useApprove(pool.tokenContract, pool.address);
  const { onStake, onUnstake } = useStake(pool.address);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedStake, setRequestedStake] = useState<boolean>(false);
  const [requestedUnstake, setRequestedUnstake] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState<number>(0);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      setRequestedApproval(false);
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);

  const handlePercentageInputs = (percentage) => {
    const numberBalance = tokenBalance.dividedBy(
      new BigNumber(10).pow(new BigNumber(18))
    );
    setStakeAmount(percentage * numberBalance.toNumber());
  };

  const handleStake = useCallback(async () => {
    try {
      setRequestedStake(true);
      const txHash = await onStake(stakeAmount);
      if (!txHash) {
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
      const txHash = await onUnstake(stakeAmount);
      if (!txHash) {
        setRequestedUnstake(false);
      }
    } catch (e) {
      setRequestedUnstake(false);
      console.log(e);
    }
  }, [stakeAmount, onUnstake]);

  const handleChange = (_, value) => setStakeAmount(value);

  return (
    <Stack>
      <Flex
        justifyContent="space-between"
        my={4}
        borderWidth={1}
        borderRadius={5}
        p={8}
      >
        <Text>{pool.tokenTicker.toUpperCase()} balance</Text>
        <Text>
          {getDisplayBalance(tokenBalance)} {pool.tokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        my={4}
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
        <Button disabled={requestedApproval} onClick={() => handleApprove()}>
          Approve {pool.tokenTicker.toUpperCase()}
        </Button>
      ) : (
        <>
          <NumberInput value={stakeAmount} onChange={handleChange}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Flex justifyContent="space-between" my="4">
            <Button onClick={() => handlePercentageInputs(0.25)}>25%</Button>
            <Button onClick={() => handlePercentageInputs(0.5)}>50%</Button>
            <Button onClick={() => handlePercentageInputs(0.75)}>75%</Button>
            <Button onClick={() => handlePercentageInputs(1)}>100%</Button>
          </Flex>
          <Flex justifyContent="space-evenly">
            <Button disabled={requestedStake} onClick={() => handleStake()}>
              Stake
            </Button>
            <Button disabled={requestedUnstake} onClick={() => handleUnstake()}>
              Unstake
            </Button>
          </Flex>
        </>
      )}
    </Stack>
  );
};
