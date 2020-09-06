import React from "react";
import { Text, Stack } from "@chakra-ui/core";

export const Footer = (props) => (
  <Stack
    as="footer"
    pt={["2rem", "2rem", "8rem"]}
    pb={"8rem"}
    direction={["column", "column", "row"]}
    alignItems={["center", "flex-start", "flex-start"]}
    spacing={4}
    {...props}
  >
    <Text
      as="a"
      fontSize="xs"
      color="gray.400"
      target="_blank"
      href="https://etherscan.io/address/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78"
    >
      Official Boost Token
    </Text>
    <Text
      as="a"
      fontSize="xs"
      color="gray.400"
      target="_blank"
      href="https://coinmarketcap.com/currencies/boosted-finance/"
    >
      CoinMarketCap
    </Text>
    <Text
      as="a"
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
      href="https://uniswap.info/pair/0x6b4a0bd2eee3ca06652f758844937daf91ea8422"
    >
      Uniswap BOOST-ETH
    </Text>
    <Text as="a" fontSize="xs" color="gray.400" target="_blank">
      Audit (coming soon)
    </Text>
  </Stack>
);
