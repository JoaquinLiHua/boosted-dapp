import React from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Flex,
} from "@chakra-ui/core";
import theme from "../theme";
import { MarqueeComponent } from "src/components/general/Marquee";
import { Header } from "src/components/general/Header";
import { NewsBlock } from "src/components/general/NewsBlock";
import { Footer } from "src/components/general/Footer";
import { CTA } from "src/components/general/CTA";
import { Container } from "src/components/general/Container";
import { UseWalletProvider } from "use-wallet";
import { ModalContext } from "src/context/ModalContext";
import { PoolProvider } from "src/context/PoolContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import { Socials } from "src/components/general/Socials";
import { isMobile } from "react-device-detect";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <PriceFeedProvider>
        <UseWalletProvider
          chainId={1}
          connectors={{
            walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
          }}
        >
          <PoolProvider>
            <ModalContext>
              <Box>
                <MarqueeComponent />
                {isMobile ? (
                  <HStack>
                    <Flex pt={8} flexDirection="column" justifyContent="center">
                      <Center>
                        <Image py={4} src="/images/boost-icon.png" w="32" />
                      </Center>
                      <Heading py={4} px={4} textAlign="center" fontSize="md">
                        It looks like you&apos;re using a mobile device.
                      </Heading>
                      <Heading py={4} px={4} textAlign="center" fontSize="md">
                        Please switch to a desktop device to use Boosted.Finance
                      </Heading>
                    </Flex>
                  </HStack>
                ) : (
                  <Container>
                    <Header />
                    <Socials />
                    <NewsBlock />
                    <Component {...pageProps} />
                    <Footer />
                    <CTA />
                  </Container>
                )}
              </Box>
            </ModalContext>
          </PoolProvider>
        </UseWalletProvider>
      </PriceFeedProvider>
      <title>Boosted Finance</title>
      <style jsx global>{`
        @font-face {
          font-family: "Formular-Mono";
          src: url("/fonts/Formular-Mono.ttf");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </ChakraProvider>
  );
}

export default MyApp;
