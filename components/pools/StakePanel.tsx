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
} from "@chakra-ui/react";
import BN from "bignumber.js";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useTokenBalance } from "src/hooks/erc20/useTokenBalance";
import { useAllowance } from "src/hooks/erc20/useAllowance";
import { useApprove } from "src/hooks/erc20/useApprove";
import { useStake } from "src/hooks/pools/useStake";
import { useStakedAmount } from "src/hooks/pools/useStakedAmount";
import { WithdrawWarning } from "../general/WithdrawWarning";
import { useClaimRewards } from "src/hooks/pools/useClaimRewards";
import { useGetRewardAmount } from "src/hooks/pools/useGetRewardAmount";
import { IPool } from "src/constants/pools";

interface StakePanelProps {
  pool: IPool;
}

export const StakePanel: React.FC<StakePanelProps> = ({ pool }) => {
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

  const [requestedClaim, setRequestedClaim] = useState<boolean>(false);
  const rewardAmount = useGetRewardAmount(pool.address);
  const { onClaim } = useClaimRewards(pool.address);

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
        <Text fontSize="md" fontWeight="bold" py={8} as="u">
          STAKING
        </Text>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold">
            {pool.tokenTicker.toUpperCase()} Balance
          </Text>
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
        <Text fontSize="md" fontWeight="bold" py={8} as="u">
          UNSTAKING/WITHDRAW
        </Text>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold">{pool.tokenTicker.toUpperCase()} Staked</Text>
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
              Please do so manually below.
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
        <Divider py={4} />
        <Stack spacing={4}>
          <Text fontSize="md" fontWeight="bold" py={8} as="u">
            CLAIM REWARDS
          </Text>
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Rewards Claimable</Text>
            <Text>{getDisplayBalance(rewardAmount)} BOOST</Text>
          </Flex>
          <Button
            width="100%"
            colorScheme="green"
            isLoading={requestedClaim}
            disabled={requestedClaim || rewardAmount.toNumber() === 0}
            onClick={() => handleClaim()}
          >
            Claim
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
