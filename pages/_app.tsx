import React from 'react';

import theme from 'styles/theme';
import { UseWalletProvider } from 'use-wallet';
import { ModalContext } from 'context/ModalContext';
import { PriceFeedProvider } from 'context/PriceFeedContext';
import { VaultProvider } from 'context/VaultContext';
import { NotifyProvider } from 'context/NotifyContext';
import { ThemeProvider } from 'styled-components';
import Layout from 'components/general/Layout';

import 'styles/sanitize.css';
import 'styles/main.css';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<PriceFeedProvider>
				<UseWalletProvider
					chainId={1}
					connectors={{
						walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
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
