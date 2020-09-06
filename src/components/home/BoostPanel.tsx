import React, { useState, useCallback } from "react";
import { Stack, Flex, Button, Text } from "@chakra-ui/core";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { boostToken } from "src/constants/tokenAddresses";
import { useAllowance } from "src/hooks/useAllowance";
import { IPool } from "src/context/PoolContext";
import { useApprove } from "src/hooks/useApprove";

import { useBoost } from "src/hooks/useBooster";
import { useGetBoosterBalance } from "src/hooks/useBoosterCount";
import BN from "bignumber.js";

interface BoostPanelProps {
  pool: IPool;
}

export const BoostPanel: React.FC<BoostPanelProps> = ({ pool }) => {
  const { onApprove } = useApprove(boostToken, pool.address);
  const { onBoost } = useBoost(pool.address);
  const allowance = useAllowance(boostToken, pool.address);
  const boostBalance: BN = useTokenBalance(boostToken);
  const boosterBalance: BN = useGetBoosterBalance(pool.address);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedBoost, setRequestedBoost] = useState<boolean>(false);

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

  const handleBoost = useCallback(async () => {
    try {
      setRequestedBoost(true);
      const txHash = await onBoost();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedApproval(false);
    }
  }, [setRequestedBoost, onBoost]);

  return (
    <Stack spacing={4}>
      <Flex
        justifyContent="space-between"
        borderWidth={1}
        borderRadius={5}
        p={8}
        width={"100%"}
      >
        <Text>BOOST Balance</Text>
        <Text>{getDisplayBalance(boostBalance)} BOOST</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        borderWidth={1}
        borderRadius={5}
        p={8}
        width={"100%"}
      >
        <Text>BOOSTERS</Text>
        <Text>{getDisplayBalance(boosterBalance)} / 5.0000 BOOST</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        borderWidth={1}
        borderRadius={5}
        p={8}
      >
        <Text>Cost of BOOSTER</Text>
        <Text>
          {pool.boosterPrice ? getDisplayBalance(pool.boosterPrice) : 0} BOOST
        </Text>
      </Flex>
      {!allowance.toNumber() ? (
        <Button
          colorScheme="green"
          isLoading={requestedApproval}
          disabled={requestedApproval}
          onClick={() => handleApprove()}
        >
          {requestedApproval ? "Approving..." : "Approve BOOST"}
        </Button>
      ) : (
        <Button
          colorScheme="green"
          isLoading={requestedBoost}
          disabled={
            boostBalance.toNumber() <
              (pool.boosterPrice?.toNumber() ?? 99999) || requestedBoost
          }
          onClick={() => handleBoost()}
        >
          {boostBalance.toNumber() < (pool.boosterPrice?.toNumber() ?? 99999)
            ? "Insufficient Balance"
            : requestedBoost
            ? "Boosting..."
            : "Buy BOOSTER"}
        </Button>
      )}
    </Stack>
  );
};
