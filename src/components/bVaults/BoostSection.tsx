import { Box, Flex, Button, Text } from "@chakra-ui/core";
import BN from "bignumber.js";
import React, { useCallback, useEffect, useState } from "react";
import { boostToken } from "src/constants/bfAddresses";
import { IVault } from "src/constants/bVaults";
import { usePriceFeedContext } from "src/context/PriceFeedContext";
import { useApprove } from "src/hooks/erc20/useApprove";
import { useTokenBalance } from "src/hooks/erc20/useTokenBalance";
import { useGetBoostedBalances } from "src/hooks/vaults/useBoostedBalances";
import { useGetNextBoosterAvailable } from "src/hooks/vaults/useNextBoosterAvailable";
import { useBoost } from "src/hooks/vaults/useBooster";
import { useGetBoosterPrice } from "src/hooks/vaults/useGetBoosterPrice";
import { getDisplayBalance } from "src/utils/formatBalance";
import { formatTimestamp } from "src/utils/formatTimestamp";
import { useGetBoosterBalance } from "src/hooks/vaults/useBoosterCount";
import formatCurrency from "format-currency";
import { useAllowance } from "src/hooks/erc20/useAllowance";

interface BoostSectionProps {
  vault: IVault;
}

export const BoostSection: React.FC<BoostSectionProps> = ({ vault }) => {
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedBoost, setRequestedBoost] = useState<boolean>(false);
  const [currentBoostedBalance, nextBoostedBalance] = useGetBoostedBalances(
    vault.vaultRewardAddress
  );
  const boostBalance: BN = useTokenBalance(boostToken);
  const boosterBalance: BN = useGetBoosterBalance(vault.vaultRewardAddress);
  const boosterPrice: BN = useGetBoosterPrice(vault.vaultRewardAddress);
  const nextBoostAvailable: BN = useGetNextBoosterAvailable(
    vault.vaultRewardAddress
  );
  const { coinGecko }: { coinGecko: any } = usePriceFeedContext();
  const [usdBoosterPrice, setUSDBoosterPrice] = useState<number>(0);
  const { onApprove } = useApprove(boostToken, vault.vaultRewardAddress);
  const { onBoost } = useBoost(vault.vaultRewardAddress);
  const allowance = useAllowance(boostToken, vault.vaultRewardAddress);

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

  useEffect(() => {
    const getUSDValueOfBoosting = async () => {
      const { data } = await coinGecko.simple.fetchTokenPrice({
        contract_addresses: [boostToken],
        vs_currencies: "usd",
      });
      const priceInUSD = new BN(data[boostToken.toLowerCase()].usd);

      setUSDBoosterPrice(
        boosterPrice
          ? boosterPrice.dividedBy(1e18).multipliedBy(priceInUSD).toNumber()
          : 0
      );
    };
    getUSDValueOfBoosting();
  }, [coinGecko, boosterPrice]);
  return (
    <>
      <Box t={4} fontWeight="bold" fontSize="lg">
        BOOSTERS
      </Box>

      <Flex justifyContent="space-between">
        <Text fontWeight="bold">BOOST Balance</Text>
        <Text textAlign="right">{getDisplayBalance(boostBalance)} BOOST</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Cost of BOOSTER</Text>
        <Text textAlign="right">{getDisplayBalance(boosterPrice)}</Text>
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
          {currentBoostedBalance.div(Math.pow(10, vault.decimals)).toNumber()}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Staked value after next BOOSTER</Text>
        <Text textAlign="right">
          {nextBoostedBalance.div(Math.pow(10, vault.decimals)).toNumber()}{" "}
          {vault.vaultTokenTicker.toUpperCase()}
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
          colorScheme="blue"
          isLoading={requestedApproval}
          disabled={requestedApproval}
          onClick={() => handleApprove()}
        >
          {requestedApproval ? "Approving..." : "Approve BOOST"}
        </Button>
      ) : (
        <Button
          colorScheme="blue"
          isLoading={requestedBoost}
          disabled={
            boostBalance.toNumber() < (boosterPrice.toNumber() ?? 99999) ||
            new Date() <= new Date(nextBoostAvailable.toNumber() * 1000) ||
            requestedBoost
          }
          onClick={() => handleBoost()}
        >
          {boostBalance.toNumber() < (boosterPrice.toNumber() ?? 99999)
            ? "Insufficient Balance"
            : requestedBoost
            ? "Boosting..."
            : "Buy BOOSTER"}
        </Button>
      )}
    </>
  );
};
