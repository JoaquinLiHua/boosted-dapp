import React, { useState, useCallback, useEffect } from "react";
import { Stack, Flex, Button, Text } from "@chakra-ui/react";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useTokenBalance } from "src/hooks/erc20/useTokenBalance";
import { boostToken } from "src/constants/bfAddresses";
import { useAllowance } from "src/hooks/erc20/useAllowance";
import { useApprove } from "src/hooks/erc20/useApprove";
import { useBoost } from "src/hooks/pools/useBooster";
import { useGetBoosterBalance } from "src/hooks/pools/useBoosterCount";
import BN from "bignumber.js";
import { useGetNextBoosterAvailable } from "src/hooks/pools/useNextBoosterAvailable";
import { formatTimestamp } from "src/utils/formatTimestamp";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import formatCurrency from "format-currency";
import { useGetBoostedBalances } from "src/hooks/pools/useBoostedBalances";
import { IPool } from "src/constants/pools";

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
  const nextBoostAvailable: BN = useGetNextBoosterAvailable(pool.address);
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
  const [usdBoosterPrice, setUSDBoosterPrice] = useState<number>(0);
  const [currentBoostedBalance, nextBoostedBalance] = useGetBoostedBalances(
    pool.address
  );

  useEffect(() => {
    const getUSDValueOfBoosting = async () => {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [boostToken],
        vs_currencies: "usd",
      });
      const priceInUSD = new BN(data[boostToken.toLowerCase()].usd);

      setUSDBoosterPrice(
        pool.boosterPrice
          ? pool.boosterPrice.div(1e18).multipliedBy(priceInUSD).toNumber()
          : 0
      );
    };
    getUSDValueOfBoosting();
  }, [coinGecko, pool]);

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
        setRequestedBoost(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedBoost(false);
    }
  }, [setRequestedBoost, onBoost]);

  return (
    <Stack spacing={12} py={8}>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">BOOST Balance</Text>
        <Text textAlign="right">{getDisplayBalance(boostBalance)} BOOST</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Cost of BOOSTER</Text>
        <Text textAlign="right">
          {pool.boosterPrice ? getDisplayBalance(pool.boosterPrice) : 0} BOOST
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Cost of BOOSTER (USD)</Text>
        <Text textAlign="right">${formatCurrency(usdBoosterPrice)}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">BOOSTERS currently active</Text>
        <Text textAlign="right">{boosterBalance.toNumber()}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Current BOOSTED stake value</Text>
        <Text textAlign="right">
          {currentBoostedBalance.div(1e18).toNumber()}{" "}
          {pool.tokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Staked value after next BOOSTER</Text>
        <Text textAlign="right">
          {nextBoostedBalance.div(1e18).toNumber()}{" "}
          {pool.tokenTicker.toUpperCase()}
        </Text>
      </Flex>
      {nextBoostAvailable.toNumber() !== 0 && (
        <Flex justifyContent="space-between">
          <Text fontWeight="bold">BOOSTING unlocked after</Text>
          <Text textAlign="right">
            {formatTimestamp(nextBoostAvailable.toNumber())}
          </Text>
        </Flex>
      )}
      <Text fontSize="sm" my={2} textAlign="center">
        BOOSTING will automatically claim your available rewards.
      </Text>
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
              (pool.boosterPrice?.toNumber() ?? 99999) ||
            new Date() <= new Date(nextBoostAvailable.toNumber() * 1000) ||
            requestedBoost
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
