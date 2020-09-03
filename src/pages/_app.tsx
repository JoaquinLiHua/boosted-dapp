import React from "react";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/core";
import theme from "../theme";
import { MarqueeComponent } from "src/components/Marquee";
import { Header } from "src/components/Header";
import { NewsBlock } from "src/components/NewsBlock";
import { Footer } from "src/components/Footer";
import { CTA } from "src/components/CTA";
import { Container } from "src/components/Container";
import { UseWalletProvider } from "use-wallet";
import { ModalContext } from "src/context/ModalContext";
import { PoolProvider } from "src/context/PoolContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import { Socials } from "src/components/Socials";

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
                <Container>
                  <Header />
                  <Socials />
                  <NewsBlock />
                  <Component {...pageProps} />
                  <Footer />
                  <CTA />
                </Container>
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
