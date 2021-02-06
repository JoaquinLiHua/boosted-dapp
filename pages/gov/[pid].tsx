import React, { useState } from "react";
import { useRouter } from "next/router";
import { Text, Stack, Heading, Flex, Button, Progress } from "@chakra-ui/react";
import { useSingleProposal } from "src/hooks/gov/useSingleProposal";
import BN from "bignumber.js";
import {
  getFullDisplayBalance,
  getDisplayBalance,
} from "src/utils/formatBalance";
import { useVoteAgainst } from "src/hooks/gov/useVoteAgainst";
import { useVoteFor } from "src/hooks/gov/useVoteFor";
import { useGovernanceStakedBalance } from "src/hooks/gov/useGovernanceStakedBalance";
import { useGetTotalGovernanceStaked } from "src/hooks/gov/useGetTotalGovernanceStaked";

const Proposal: React.FC = () => {
  const router = useRouter();
  const { pid } = router.query;
  const proposal = useSingleProposal(pid);
  const { onVoteFor } = useVoteFor(pid);
  const { onVoteAgainst } = useVoteAgainst(pid);
  const [requestedFor, setRequestedFor] = useState<boolean>(false);
  const [requestedAgainst, setRequestedAgainst] = useState<boolean>(false);
  const stakedBalance = useGovernanceStakedBalance();
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

  const parseUrl = (url) => {
    let parsed;
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
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
        <Stack boxShadow="md" p={6} borderWidth="1px">
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
                The Boosted Finance team is requesting for funding of 60,000
                yCRV to bootstrap an ecosystem fund for the payment of contract
                audits and fast-tracking the development resources required to
                construct BoostVaults (bVaults), optimize the existing booster
                mechanism, or other governance proposals to be passed by the
                community.
              </Text>
            </Flex>
          )}
          {parseInt(pid.toString()) === 11 && (
            <Flex flexDirection={"column"}>
              <Text fontWeight="bold" fontSize="sm">
                Simple Summary:&nbsp;
              </Text>
              <Text>
                The Boosted Finance team is requesting funding of 15,000 yCRV to
                drive marketing developments for the next 4-6 months to support
                the launch of bVaults and growth post-audit results. This
                includes compensation for marketing resources, funding a
                strategist competition among others.
                https://snapshot.page/#/boosted-finance/proposal/QmNwUtqDZYZm2Ex6bLNSTVY4vRuHNp5JPgnYRc9RgNepBA
              </Text>
            </Flex>
          )}
          {parseInt(pid.toString()) === 12 && (
            <Flex flexDirection={"column"}>
              <Text fontWeight="bold" fontSize="sm">
                Simple Summary:&nbsp;
              </Text>
              <Text>
                The Boosted Finance team is requesting funding of 90,000 yCRV to
                fund ongoing development efforts for bVaults, new developers and
                designers, implementation of strategies, bug fixing, content
                creators, growth, and partnership developments..
              </Text>
            </Flex>
          )}
        </Stack>
        <Stack boxShadow="md" p={6} borderWidth="1px">
          <Text pt={4}>
            You must stake BOOST to vote, voting will lock your staked BOOST for
            72 hours after your latest vote.
          </Text>
          <Flex w="100%" py={4}>
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
        </Stack>

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
          <Flex justifyContent="space-between">
            <Flex flexDirection={["column", "column", "row"]}>
              <Text mr={4} fontWeight="bold">
                For
              </Text>
              <Text sub={true}>{getDisplayBalance(totalForVotes)} BOOST</Text>
            </Flex>
            <Text>
              {totalForVotes.div(totalVotes).toNumber()
                ? (totalForVotes.div(totalVotes).toNumber() * 100).toFixed(2)
                : 0}
              %
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalForVotes.div(totalVotes).toNumber() * 100}
            colorScheme="green"
          />
          <Flex justifyContent="space-between">
            <Flex flexDirection={["column", "column", "row"]}>
              <Text mr={4} fontWeight="bold">
                Against
              </Text>
              <Text sub={true}>
                {getDisplayBalance(totalAgainstVotes)} BOOST
              </Text>
            </Flex>
            <Text>
              {totalAgainstVotes.div(totalVotes).toNumber()
                ? (totalAgainstVotes.div(totalVotes).toNumber() * 100).toFixed(
                    2
                  )
                : 0}
              %
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalAgainstVotes.div(totalVotes).toNumber() * 100}
            colorScheme="red"
          />
          <Flex justifyContent="space-between">
            <Flex flexDirection={["column", "column", "row"]}>
              <Text mr={4} fontWeight="bold">
                Quorum (minimum 30%)
              </Text>
              <Text sub={true}>
                {getDisplayBalance(totalVotes)} Votes/{" "}
                {getDisplayBalance(totalStaked)} Total Staked
              </Text>
            </Flex>
            <Text>
              {(totalVotes.div(totalStaked).toNumber() * 100).toFixed(2)}%
            </Text>
          </Flex>
          <Progress
            hasStripe
            value={totalVotes.div(totalStaked).toNumber() * 100}
            colorScheme="yellow"
          />
        </Stack>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default Proposal;
