import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Heading, Image, Text, Flex } from "@chakra-ui/react";
import theme from "src/styles/theme";
import { Header } from "src/components/general/Header";
import { Footer } from "src/components/general/Footer";
import { Container } from "src/components/general/Container";
import { UseWalletProvider } from "use-wallet";
import { ModalContext } from "src/context/ModalContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import Router from "next/router";
import { VaultProvider } from "src/context/VaultContext";
// import { NotifyProvider } from "src/context/NotifyContext";
import { ThemeProvider } from "styled-components";

function MyApp({ Component, pageProps }) {
  const [changingRoute, setChangingRoute] = useState<boolean>(false);

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
    <>
      <ThemeProvider theme={theme}>
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
                <Header changingRoute={changingRoute} />
                <Component {...pageProps} />
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

          div {
            text-decoration: none;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
