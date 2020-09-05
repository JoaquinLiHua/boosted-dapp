import React from "react";
import { Flex, Text } from "@chakra-ui/core";

export const Footer = (props) => (
  <Flex as="footer" py="8rem" {...props}>
    <Text
      as="a"
      mx="2"
      fontSize="xs"
      color="gray.400"
      target="_blank"
      href="https://etherscan.io/address/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78"
    >
      Official Boost Token
    </Text>
    <Text
      as="a"
      mx="2"
      fontSize="xs"
      color="gray.400"
      target="_blank"
      href="https://coinmarketcap.com/currencies/boosted-finance/"
    >
      CoinMarketCap
    </Text>
    <Text
      as="a"
      mx="2"
      fontSize="xs"
      target="_blank"
      color="gray.400"
      href="https://www.coingecko.com/en/coins/boosted-finance"
    >
      CoinGecko
    </Text>
    <Text
      fontSize="xs"
      color="gray.400"
      target="_blank"
      as="a"
      mx="2"
      href="https://uniswap.info/pair/0x6b4a0bd2eee3ca06652f758844937daf91ea8422"
    >
      Uniswap BOOST-ETH
    </Text>
    <Text mx="2" as="a" fontSize="xs" color="gray.400" target="_blank">
      Audit (coming soon)
    </Text>
  </Flex>
);
