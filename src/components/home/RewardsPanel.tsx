import React, { useState, useCallback } from "react";
import { Stack, Flex, Text, Button } from "@chakra-ui/core";
import { IPool } from "src/context/PoolContext";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useGetRewardAmount } from "src/hooks/useGetRewardAmount";
import { useClaimRewards } from "src/hooks/useClaimRewards";

interface RewardsPanelProps {
  pool: IPool;
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({ pool }) => {
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

  return (
    <Stack>
      <Flex
        justifyContent="space-between"
        my={4}
        borderWidth={1}
        borderRadius={5}
        p={8}
      >
        <Text>Rewards earned</Text>
        <Text>{getDisplayBalance(rewardAmount)} BOOST</Text>
      </Flex>
      <Button
        width="100%"
        colorScheme="green"
        isLoading={requestedClaim}
        disabled={requestedClaim}
        onClick={() => handleClaim()}
      >
        Claim Rewards
      </Button>
    </Stack>
  );
};
