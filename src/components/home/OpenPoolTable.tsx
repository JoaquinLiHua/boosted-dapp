import {
  Button,
  Text,
  Image,
  Flex,
  useColorMode,
  BoxProps,
  Box,
} from "@chakra-ui/core";
import React, { useState } from "react";
import { usePoolContext, IPool } from "src/context/PoolContext";
import { getDisplayBalance } from "src/utils/formatBalance";
import { formatTimestamp } from "src/utils/formatTimestamp";
import { useWallet } from "use-wallet";
import formatCurrency from "format-currency";
import BN from "bignumber.js";
import { TransactionModal } from "./TransactionModal";

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

export const OpenPoolTable: React.FC = () => {
  const [showTransactionModal, setShowTransactionModal] = useState<boolean>(
    false
  );
  const [pool, setPool] = useState<IPool | null>(null);
  const handleShowTransactionModal = (pool: IPool) => {
    setShowTransactionModal(true);
    setPool(pool);
  };
  const { account } = useWallet();
  const { openPools } = usePoolContext();
  const { colorMode } = useColorMode();
  return (
    <>
      {showTransactionModal && (
        <TransactionModal pool={pool} onClose={setShowTransactionModal} />
      )}
      <Table boxShadow="md" p={5} borderWidth="1px" mt="4">
        <TableHead>
          <TableRow>
            <TableHeader>POOL</TableHeader>
            <TableHeader>POOL SIZE</TableHeader>
            <TableHeader>BOOSTER COST</TableHeader>
            <TableHeader>EST. APY</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {openPools.map((e, i) => (
            <TableRow key={i}>
              <TableCell>
                <Flex alignItems="center">
                  <Flex
                    w="30px"
                    h="30px"
                    borderRadius="15px"
                    background={colorMode === "dark" ? "white" : "transparent"}
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
                  {`Pool ends: ${
                    e.periodFinish
                      ? formatTimestamp(new BN(e.periodFinish).toNumber())
                      : 0
                  }`}
                </Text>
              </TableCell>
              <TableCell>
                <Text fontSize="sm">
                  {" "}
                  {e.poolSize ? getDisplayBalance(e.poolSize) : 0} &nbsp;
                  {e.tokenTicker.toUpperCase()}
                </Text>
                <Text sub={"true"} fontSize="xs">
                  ${e.poolPriceInUSD ? formatCurrency(e.poolPriceInUSD) : 0}
                </Text>
              </TableCell>
              <TableCell>
                <Text fontSize="sm">
                  {e.boosterPrice ? getDisplayBalance(e.boosterPrice) : 0} BOOST
                </Text>
              </TableCell>
              <TableCell>
                <Text fontSize="sm">{`${e.apy ? e.apy : 0}%`}</Text>
              </TableCell>
              <TableCell textAlign="right">
                {!!account && (
                  <Button
                    onClick={() => handleShowTransactionModal(e)}
                    size="sm"
                    fontSize="sm"
                    fontWeight="medium"
                    colorScheme="green"
                  >
                    Stake/Boost
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};