import React from "react";
import { Text, Stack, Flex, Box, Image } from "@chakra-ui/react";

export const Footer = (props) => (
  <Box as="footer" borderTopWidth={1} {...props} py={8}>
    <Flex
      pb={8}
      maxWidth="1200px"
      margin="auto"
      justifyContent="space-between"
      flexDirection={["column", "column", "row"]}
      px={[4, 8, 16]}
    >
      <Flex justifyContent={["center", "center", "flex-start"]} mb={4}>
        <Image h={50} src="/images/boost-icon.png" />
      </Flex>
      <Stack
        spacing={[4, 4, 16]}
        direction={["column", "column", "row"]}
        textAlign={["center", "center", "left"]}
      >
        <Stack>
          <Text fontWeight="bold">Links</Text>
          <Text
            as="a"
            fontSize="xs"
            target="_blank"
            href="https://etherscan.io/address/0x3e780920601D61cEdb860fe9c4a90c9EA6A35E78"
          >
            Official Boost Token
          </Text>
          <Text
            as="a"
            fontSize="xs"
            target="_blank"
            href="https://coinmarketcap.com/currencies/boosted-finance/"
          >
            CoinMarketCap
          </Text>
          <Text
            as="a"
            fontSize="xs"
            target="_blank"
            href="https://www.coingecko.com/en/coins/boosted-finance"
          >
            CoinGecko
          </Text>
          <Text
            fontSize="xs"
            target="_blank"
            as="a"
            href="https://uniswap.info/pair/0x6b4a0bd2eee3ca06652f758844937daf91ea8422"
          >
            Uniswap BOOST-ETH
          </Text>
          <Text as="a" fontSize="xs" target="_blank">
            Audit (coming soon)
          </Text>
        </Stack>
        <Stack>
          <Text fontWeight="bold">Socials</Text>
          <Text
            fontSize="xs"
            target="_blank"
            as="a"
            href="https://medium.com/@BoostedFinance/"
          >
            Medium
          </Text>
          <Text
            fontSize="xs"
            target="_blank"
            as="a"
            href="https://twitter.com/BoostedFinance"
          >
            Twitter
          </Text>
          <Text
            fontSize="xs"
            target="_blank"
            as="a"
            href="https://discord.gg/gp9bsaQ"
          >
            Discord
          </Text>
          <Text
            fontSize="xs"
            target="_blank"
            as="a"
            href="https://github.com/Boosted-Finance"
          >
            Github
          </Text>
        </Stack>
      </Stack>
    </Flex>
  </Box>
);
