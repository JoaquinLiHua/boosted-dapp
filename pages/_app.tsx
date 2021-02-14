import React from 'react';

import theme from 'styles/theme';

import { ModalContext } from 'context/ModalContext';
import { PriceFeedProvider } from 'context/PriceFeedContext';
import { VaultProvider } from 'context/VaultContext';
import { ThemeProvider } from 'styled-components';
import Layout from 'components/general/Layout';

import Initialiser from 'context/Initialiser';

import { QueryClient, QueryClientProvider } from 'react-query';

import 'styles/sanitize.css';
import '@reach/dialog/styles.css';
import 'styles/main.css';
import Notify from 'context/Notify';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
	const queryClient = new QueryClient();

	return (
		<ThemeProvider theme={theme}>
			<Initialiser.Provider>
				<QueryClientProvider client={queryClient}>
					<Notify.Provider>
						<PriceFeedProvider>
							<ModalContext>
								<VaultProvider>
									<Layout children={<Component {...pageProps} />}></Layout>
								</VaultProvider>
							</ModalContext>
						</PriceFeedProvider>
					</Notify.Provider>
				</QueryClientProvider>
			</Initialiser.Provider>
		</ThemeProvider>
	);
}

export default MyApp;
