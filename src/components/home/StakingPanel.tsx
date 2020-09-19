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
import { WithdrawWarning } from "../general/WithdrawWarning";

interface StakingPanelProps {
  pool: IPool;
}

export const StakingPanel: React.FC<StakingPanelProps> = ({ pool }) => {
  const { onApprove } = useApprove(pool.tokenContract, pool.address);
  const { onStake } = useStake(pool.address);

  const [exitType, setExitType] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean | null>(null);

  const allowance: BN = useAllowance(pool.tokenContract, pool.address);
  const tokenBalance: BN = useTokenBalance(pool.tokenContract);
  const stakedAmount: BN = useStakedAmount(pool.address);

  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedStake, setRequestedStake] = useState<boolean>(false);

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

  const handleStakeChange = (value: string) => setStakeAmount(value);
  const handleUnstakeChange = (value: string) => setUnstakeAmount(value);

  return (
    <>
      {showExitModal && (
        <WithdrawWarning
          setShowExitModal={setShowExitModal}
          type={exitType}
          pool={pool}
          unstakeAmount={unstakeAmount}
        />
      )}
      <Stack>
        <Flex justifyContent="space-between" py={8}>
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
              <Button
                w="25%"
                ml={1}
                onClick={() => handlePercentageStakeInputs(0.99999)}
              >
                100%
              </Button>
            </Flex>
            <Text fontSize="sm" my={2} textAlign="center">
              Staking LP tokens will claim your available rewards.
            </Text>
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
      <Divider py={4} />
      <Stack>
        <Flex justifyContent="space-between" py={8}>
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
            <Flex justifyContent="space-between" width="100%">
              <Button
                w="25%"
                mr={1}
                onClick={() => handlePercentageUnstakeInput(0.25)}
              >
                25%
              </Button>
              <Button
                w="25%"
                mx={1}
                onClick={() => handlePercentageUnstakeInput(0.5)}
              >
                50%
              </Button>
              <Button
                w="25%"
                mx={1}
                onClick={() => handlePercentageUnstakeInput(0.75)}
              >
                75%
              </Button>
              <Button
                w="25%"
                ml={1}
                onClick={() => handlePercentageUnstakeInput(0.99999)}
              >
                100%
              </Button>
            </Flex>
            <Text fontSize="sm" my={2} textAlign="center">
              Unstaking and/or Exiting do not automatically claim your rewards.
              Please do so manually in "rewards".
            </Text>
            <Button
              colorScheme="green"
              width="100%"
              onClick={() => {
                setExitType("unstake"), setShowExitModal(true);
              }}
            >
              Unstake
            </Button>
            <Button
              width="100%"
              onClick={() => {
                setExitType("exit"), setShowExitModal(true);
              }}
              colorScheme="red"
            >
              Exit
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  );
};
