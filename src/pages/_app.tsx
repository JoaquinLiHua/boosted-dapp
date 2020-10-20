import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  CSSReset,
  Heading,
  Image,
  Text,
  Flex,
} from "@chakra-ui/core";
import theme from "../theme";
import { MarqueeComponent } from "src/components/general/Marquee";
import { Header } from "src/components/general/Header";
import { Footer } from "src/components/general/Footer";
import { Container } from "src/components/general/Container";
import { UseWalletProvider } from "use-wallet";
import { ModalContext } from "src/context/ModalContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import { useWeb3Presence } from "src/hooks/general/useWeb3Presence";
import Router from "next/router";
import { VaultProvider } from "src/context/VaultContext";
// import { NotifyProvider } from "src/context/NotifyContext";

function MyApp({ Component, pageProps }) {
  const [changingRoute, setChangingRoute] = useState<boolean>(false);
  const web3Present = useWeb3Presence();

  useEffect(() => {
    const changeStart = () =>
      Router.events.on("routeChangeStart", () => setChangingRoute(true));
    const changeComplete = () =>
      Router.events.on("routeChangeComplete", () => setChangingRoute(false));
    const changeError = () =>
      Router.events.on("routeChangeError", () => setChangingRoute(false));
    changeStart();
    changeComplete();
    changeError();
    return () => {
      changeStart();
      changeComplete();
      changeError();
    };
  }, []);

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
          {/* <NotifyProvider> */}
          <ModalContext>
            <VaultProvider>
              <MarqueeComponent />
              <Header changingRoute={changingRoute} />
              {!web3Present ? (
                <Flex
                  direction="column"
                  alignItems="center"
                  margin="auto"
                  px={8}
                  py={8}
                >
                  <Image
                    py={4}
                    src="/images/boost-icon.png"
                    w="32"
                    align="center"
                  />
                  <Heading py={2} px={2} textAlign="center" fontSize="md">
                    It looks like you&apos;re using device without a valid web3
                    provider.
                  </Heading>
                  <Text py={2} px={2} textAlign="center" fontSize="md">
                    Please switch to a web3 compatible browser to use
                    Boosted.Finance
                  </Text>
                </Flex>
              ) : (
                <Container>
                  <Component {...pageProps} />
                </Container>
              )}
              <Footer />
            </VaultProvider>
          </ModalContext>
          {/* </NotifyProvider> */}
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
