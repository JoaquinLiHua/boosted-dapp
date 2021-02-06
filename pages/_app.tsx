import React from 'react';

import theme from 'styles/theme';

// @TODO: Remove use-wallet
// import { UseWalletProvider } from 'use-wallet';
import { ModalContext } from 'context/ModalContext';
import { PriceFeedProvider } from 'context/PriceFeedContext';
import { VaultProvider } from 'context/VaultContext';
import { NotifyProvider } from 'context/NotifyContext';
import { ThemeProvider } from 'styled-components';
import Layout from 'components/general/Layout';

import Initialiser from 'context/Initialiser';

import 'styles/sanitize.css';
import 'styles/main.css';
import Notify from 'context/Notify';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Initialiser.Provider>
				<Notify.Provider>
					<PriceFeedProvider>
						<ModalContext>
							<VaultProvider>
								<Layout children={<Component {...pageProps} />}></Layout>
							</VaultProvider>
						</ModalContext>
					</PriceFeedProvider>
				</Notify.Provider>
			</Initialiser.Provider>
		</ThemeProvider>
	);
}

export default MyApp;
