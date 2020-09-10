import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  Text,
  Stack,
  Heading,
  Flex,
  Button,
  FormLabel,
  Input,
  Divider,
  Progress,
} from "@chakra-ui/core";
import { useSingleProposal } from "src/hooks/useSingleProposal";
import BN from "bignumber.js";
import {
  getFullDisplayBalance,
  getDisplayBalance,
} from "src/utils/formatBalance";
import { useVoteAgainst } from "src/hooks/useVoteAgainst";
import { useVoteFor } from "src/hooks/useVoteFor";
import { useGovernanceStakedBalance } from "src/hooks/useGovernanceStakedBalance";
import useGovernanceStake from "src/hooks/useGovernanceStake";
// import { useTokenBalance } from "src/hooks/useTokenBalance";
import { boostToken, governanceContract } from "src/constants/tokenAddresses";
import { useApprove } from "src/hooks/useApprove";
import { useAllowance } from "src/hooks/useAllowance";
import { useGetTotalGovernanceStaked } from "src/hooks/useGetTotalGovernanceStaked";

const Proposal: React.FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  const proposal = useSingleProposal(pid);
  const { onVoteFor } = useVoteFor(pid);
  const { onVoteAgainst } = useVoteAgainst(pid);
  const [requestedFor, setRequestedFor] = useState<boolean>(false);
  const [requestedAgainst, setRequestedAgainst] = useState<boolean>(false);
  const stakedBalance = useGovernanceStakedBalance();
  const { onStake } = useGovernanceStake();
  // const boostBalance = useTokenBalance(boostToken);
  const { onApprove } = useApprove(boostToken, governanceContract);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);
  const [requestedStaking, setRequestedStaking] = useState<boolean>(false);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const allowance: BN = useAllowance(boostToken, governanceContract);
  const totalStaked: BN = useGetTotalGovernanceStaked();

  const handleVoteFor = async () => {
    try {
      setRequestedFor(true);
      const txHash = await onVoteFor();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedFor(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedFor(false);
    }
  };

  const handleVoteAgainst = async () => {
    try {
      setRequestedAgainst(true);
      const txHash = await onVoteAgainst();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedAgainst(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedAgainst(false);
    }
  };

  const handleStake = async () => {
    setRequestedStaking(true);
    try {
      const tx = await onStake(stakeAmount);
      if (!tx) {
        throw "Transaction error";
      } else {
        setRequestedStaking(false);
      }
    } catch (e) {
      setRequestedStaking(false);
    }
  };

  const handleStakeChange = (value: string) => setStakeAmount(value);

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

  const parseUrl = (url) => {
    let parsed;
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    url.replace(urlRegex, (link) => {
      parsed = link;
    });
    return parsed;
  };

  if (proposal && pid) {
    const getProposalUrl = parseUrl(proposal.url);
    const totalForVotes = new BN(proposal.totalForVotes);
    const totalAgainstVotes = new BN(proposal.totalAgainstVotes);
    const totalVotes = totalForVotes.plus(totalAgainstVotes);
    return (
      <Stack colorScheme="white" spacing={4} width="100%" mt={8}>
        <Heading>BFIP-{parseInt(pid?.toString()) + 2}</Heading>
        <Text as="a" href={getProposalUrl} target="_blank">
          {proposal.url}
        </Text>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold" fontSize="sm">
            Requested Amount:&nbsp;
          </Text>
          <Text>
            {getFullDisplayBalance(new BN(proposal.withdrawAmount))} yCRV
          </Text>
        </Flex>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold" fontSize="sm">
            Withdrawal Address:&nbsp;
          </Text>
          <Text>{proposal.withdrawAddress}</Text>
        </Flex>
        {parseInt(pid.toString()) === 0 && (
          <Flex flexDirection={"column"}>
            <Text fontWeight="bold" fontSize="sm">
              Simple Summary:&nbsp;
            </Text>
            <Text>
              The Boosted Finance team is requesting for funding of 60,000 yCRV
              to bootstrap an ecosystem fund for the payment of contract audits
              and fast-tracking the development resources required to construct
              BoostVaults (bVaults), optimize the existing booster mechanism, or
              other governance proposals to be passed by the community.
            </Text>
          </Flex>
        )}
        <Divider />
        <Stack>
          <FormLabel fontWeight="bold">Governance Proposal Stake</FormLabel>
          <Input
            type="number"
            id={"stakeAmount"}
            onChange={(e) => handleStakeChange(e.target.value)}
            placeholder={"Stake Amount"}
            mb={4}
          />
          {!allowance.toNumber() ? (
            <Button
              mt={4}
              colorScheme="green"
              isLoading={requestedApproval}
              disabled={requestedApproval}
              onClick={() => handleApprove()}
            >
              Approve BOOST
            </Button>
          ) : (
            <Button
              mt={4}
              colorScheme="green"
              isLoading={requestedStaking}
              disabled={requestedStaking}
              type="submit"
              onClick={() => handleStake()}
            >
              Stake
            </Button>
          )}
          <Text pt={4}>
            You must stake BOOST to vote, voting will lock your staked boost for
            the duration of the proposal.
          </Text>
        </Stack>

        <Flex w="100%" py={8}>
          <Stack w="50%" spacing={2}>
            <Button
              isLoading={requestedFor}
              onClick={() => handleVoteFor()}
              colorScheme="green"
              mr={4}
              isDisabled={requestedFor || stakedBalance.toNumber() === 0}
            >
              Vote For
            </Button>
          </Stack>
          <Stack w="50%" spacing={2}>
            <Button
              isLoading={requestedAgainst}
              onClick={() => handleVoteAgainst()}
              colorScheme="red"
              isDisabled={requestedAgainst || stakedBalance.toNumber() === 0}
              ml={4}
            >
              Vote Against
            </Button>
          </Stack>
        </Flex>
        <Stack
          w="100%"
          direction="column"
          spacing={4}
          boxShadow="md"
          p={6}
          borderWidth="1px"
        >
          <Text fontWeight="bold" fontSize="lg">
            Voting Stats
          </Text>
          M
          <Flex justifyContent="space-between">
            <Flex>
              <Text mr={4} fontWeight="bold">
                For
              </Text>
              <Text sub={true}>{getDisplayBalance(totalForVotes)} BOOST</Text>
            </Flex>
            <Text>
              {(totalForVotes.div(totalVotes).toNumber() * 100).toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalForVotes.div(totalVotes).toNumber() * 100}
            colorScheme="green"
          />
          <Flex justifyContent="space-between">
            <Flex>
              <Text mr={4} fontWeight="bold">
                Against
              </Text>
              <Text sub={true}>
                {getDisplayBalance(totalAgainstVotes)} BOOST
              </Text>
            </Flex>
            <Text>
              {(totalAgainstVotes.div(totalVotes).toNumber() * 100).toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalAgainstVotes.div(totalVotes).toNumber() * 100}
            colorScheme="green"
          />
          <Flex justifyContent="space-between">
            <Flex>
              <Text mr={4} fontWeight="bold">
                Quorum (minimum 30%)
              </Text>
              <Text sub={true}>
                {getDisplayBalance(totalVotes)} /{" "}
                {getDisplayBalance(totalStaked)} BOOST
              </Text>
            </Flex>
            <Text>
              {(totalVotes.div(totalStaked).toNumber() * 100).toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalVotes.div(totalStaked).toNumber() * 100}
            colorScheme="red"
          />
        </Stack>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Proposal;
