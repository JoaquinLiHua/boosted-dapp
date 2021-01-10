import React from "react";
import theme from "src/styles/theme";
import { UseWalletProvider } from "use-wallet";
import { ModalContext } from "src/context/ModalContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import { VaultProvider } from "src/context/VaultContext";
import { NotifyProvider } from "src/context/NotifyContext";
import { ThemeProvider } from "styled-components";
import Layout from "src/components/general/Layout";

import "src/styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <PriceFeedProvider>
        <UseWalletProvider
          chainId={1}
          connectors={{
            walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
          }}
        >
          <NotifyProvider>
            <ModalContext>
              <VaultProvider>
                <Layout children={<Component {...pageProps} />}></Layout>
              </VaultProvider>
            </ModalContext>
          </NotifyProvider>
        </UseWalletProvider>
      </PriceFeedProvider>
    </ThemeProvider>
  );
}

export default MyApp;
