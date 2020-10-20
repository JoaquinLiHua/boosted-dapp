import {
  Button,
  Text,
  Image,
  Flex,
  useColorMode,
  BoxProps,
  Box,
  Center,
  Heading,
} from "@chakra-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { usePoolContext } from "src/context/PoolContext";
import { getDisplayBalance } from "src/utils/formatBalance";
import { useWallet } from "use-wallet";
import { useExit } from "src/hooks/pools/useExit";
import { stakedAmount } from "src/utils/pool";
import BN from "bignumber.js";
import { provider } from "web3-core";

/**
 * Represents tabular data - that is, information presented in a
 * two-dimensional table comprised of rows and columns of cells containing
 * data. It renders a `<table>` HTML element.
 */
function Table(props: BoxProps) {
  return (
    <Box shadow="sm" rounded="lg" overflow="scroll">
      <Box as="table" width="full" {...props} />
    </Box>
  );
}

/**
 * Defines a set of rows defining the head of the columns of the table. It
 * renders a `<thead>` HTML element.
 */
function TableHead(props: BoxProps) {
  return <Box as="thead" {...props} />;
}

/**
 * Defines a row of cells in a table. The row's cells can then be established
 * using a mix of `TableCell` and `TableHeader` elements. It renders a `<tr>`
 * HTML element.
 */
function TableRow(props: BoxProps) {
  return <Box as="tr" {...props} />;
}

/**
 * Defines a cell as header of a group of table cells. It renders a `<th>` HTML
 * element.
 */
function TableHeader(props: BoxProps) {
  return (
    <Box
      as="th"
      px="6"
      py="3"
      borderBottomWidth="1px"
      textAlign="left"
      fontSize="xs"
      textTransform="uppercase"
      letterSpacing="wider"
      lineHeight="1rem"
      fontWeight="medium"
      {...props}
    />
  );
}

/**
 * Encapsulates a set of table rows, indicating that they comprise the body of
 * the table. It renders a `<tbody>` HTML element.
 */
function TableBody(props: BoxProps) {
  return <Box as="tbody" {...props} />;
}

/**
 * Defines a cell of a table that contains data. It renders a `<td>` HTML
 * element.
 */
function TableCell(props: BoxProps) {
  return (
    <Box
      as="td"
      px="6"
      py="4"
      lineHeight="1.25rem"
      whiteSpace="nowrap"
      {...props}
    />
  );
}

export const ClosedPoolTable: React.FC = () => {
  const [poolsWithBalances, setPoolsWithBalances] = useState<any[] | null>(
    null
  );
  const { onExit } = useExit();
  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();
  const { closedPools } = usePoolContext();
  const { colorMode } = useColorMode();

  const handleExit = useCallback(
    async (poolContract) => {
      try {
        const txHash = await onExit(poolContract);
        if (!txHash) {
          throw "Transaction error";
        }
      } catch (e) {
        console.log(e);
      }
    },
    [onExit]
  );

  const fetchStakedAmount = useCallback(
    async (poolAddress) => {
      if (account) {
        const amount = new BN(
          await stakedAmount(ethereum, poolAddress, account)
        );
        return amount;
      } else {
        return new BN("0");
      }
    },
    [account, ethereum]
  );

  useEffect(() => {
    const fetchAllStakedBalances = async () => {
      const mappedPools = closedPools.map(async (e) => {
        return {
          ...e,
          stakedBalance: await fetchStakedAmount(e.address),
        };
      });
      const resolvedPromises = await Promise.all(mappedPools);
      setPoolsWithBalances(resolvedPromises);
    };
    fetchAllStakedBalances();
  }, [account, closedPools, fetchStakedAmount]);

  if (account) {
    return (
      <>
        {poolsWithBalances && poolsWithBalances.length > 0 ? (
          <Table boxShadow="md" p={5} borderWidth="1px" mt="4">
            <TableHead>
              <TableRow>
                <TableHeader>POOL</TableHeader>
                <TableHeader>YOUR STAKED BALANCE</TableHeader>
                <TableHeader />
              </TableRow>
            </TableHead>
            <TableBody>
              {poolsWithBalances.map((e, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Flex alignItems="center">
                      <Flex
                        w="30px"
                        h="30px"
                        borderRadius="15px"
                        background={
                          colorMode === "dark" ? "white" : "transparent"
                        }
                        borderWidth={colorMode !== "dark" ? "1px" : 0}
                        borderColor={
                          colorMode !== "dark" ? "grey.100" : "transparent"
                        }
                        alignItems="center"
                        justifyContent="center"
                        mr="2"
                        mb="2"
                      >
                        <Image src={e.icon} width="5" height="5" />
                      </Flex>
                      <Text fontWeight="bold" fontSize="sm">
                        {e.name}
                      </Text>
                    </Flex>
                    <Text sub={"true"} fontSize="xs">
                      POOL ENDED - WITHDRAW FUNDS
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text fontSize="sm">
                      {e.stakedBalance ? getDisplayBalance(e.stakedBalance) : 0}{" "}
                      {e.tokenTicker.toUpperCase()}
                    </Text>
                  </TableCell>
                  <TableCell textAlign="right">
                    <Button
                      onClick={() => handleExit(e.address)}
                      size="sm"
                      colorScheme="red"
                    >
                      Exit & Claim
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Center p={8}>
            <Heading my={8} textAlign="center" size="md">
              There are no closed pools.
            </Heading>
          </Center>
        )}
      </>
    );
  } else {
    return (
      <Center p={8}>
        <Heading my={8} textAlign="center" size="md">
          Unlock your wallet to view pools.
        </Heading>
      </Center>
    );
  }
};
