import { Button, Text, Image, Flex, useColorMode } from "@chakra-ui/core";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
import { usePoolContext } from "src/context/PoolContext";
import { getDisplayBalance } from "src/utils/formatBalance";
import { getNumber } from "src/utils/formatBigNumber";
import { formatTimestamp } from "src/utils/formatTimestamp";
import { useWallet } from "use-wallet";
import formatCurrency from "format-currency";

interface TableUIProps {
  setShowTransactionModal: Function;
}

export const TableUI: React.FC<TableUIProps> = ({
  setShowTransactionModal,
}) => {
  const { account } = useWallet();
  const { pools } = usePoolContext();
  const { colorMode } = useColorMode();
  return (
    <Table boxShadow="md" p={5} borderWidth="1px" mt="4">
      <TableHead>
        <TableRow>
          <TableHeader>POOL</TableHeader>
          <TableHeader>SIZE</TableHeader>
          <TableHeader>BOOST PRICE</TableHeader>
          <TableHeader>APY (USD)</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {pools.map((e, i) => (
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
                Pool ends on:{" "}
                {e.periodFinish
                  ? formatTimestamp(parseInt(getNumber(e.periodFinish)))
                  : 0}
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
              <Text fontSize="">{"-"}%</Text>
            </TableCell>
            <TableCell textAlign="right">
              {!!account && (
                <Button
                  onClick={() => setShowTransactionModal(e)}
                  size="sm"
                  fontSize="sm"
                  fontWeight="medium"
                >
                  Stake/Boost
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
