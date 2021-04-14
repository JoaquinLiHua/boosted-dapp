import React from 'react';

import theme from 'styles/theme';

import { ThemeProvider } from 'styled-components';
import Layout from 'components/general/Layout';

import Initialiser from 'context/Initialiser';
import Notify from 'context/Notify';
import CoinGecko from 'context/CoinGecko';

import { QueryClient, QueryClientProvider } from 'react-query';

import 'styles/sanitize.css';
import '@reach/dialog/styles.css';
import 'styles/main.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 30000,
		},
	},
});

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
	return (
		<ThemeProvider theme={theme}>
			<Initialiser.Provider>
				<QueryClientProvider client={queryClient}>
					<Notify.Provider>
						<CoinGecko.Provider>
							<Layout children={<Component {...pageProps} />}></Layout>
						</CoinGecko.Provider>
					</Notify.Provider>
				</QueryClientProvider>
			</Initialiser.Provider>
		</ThemeProvider>
	);
}

export default MyApp;
