import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { ethers } from 'ethers';
import Onboard from 'bnc-onboard';
import notify from 'bnc-notify';

const useInitialiser = () => {
	const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);
	const [signer, setSigner] = useState<ethers.Signer | null>(null);
	const [onboard, setOnboard] = useState<any>(null);
	const [network, setNetwork] = useState<number>(1);
	const [isAppReady, setIsAppReady] = useState<boolean>(false);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [bncNotify, setBNCNotify] = useState<any>(null);

	useEffect(() => {
		const init = async () => {
			// @ts-ignore
			const provider = new ethers.providers.InfuraProvider(
				network,
				process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
			);
			setProvider(provider);
			setIsAppReady(true);
		};

		init();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isAppReady) {
			const onboard = Onboard({
				dappId: process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY,
				networkId: 1,
				subscriptions: {
					wallet: (wallet) => {
						const provider = new ethers.providers.Web3Provider(wallet.provider);
						const signer = provider.getSigner();
						setProvider(provider);
						setSigner(signer);
					},
					address: setWalletAddress,
				},
			});

			const bncNotify = notify({
				darkMode: true,
				dappId: process.env.NEXT_PUBLIC_BN_NOTIFY_API_KEY!,
				networkId: 1,
				desktopPosition: 'bottomRight',
			});

			setBNCNotify(bncNotify);
			setOnboard(onboard);
		}
	}, [isAppReady]);

	const connectWallet = async () => {
		try {
			onboard.walletReset();
			const success = await onboard.walletSelect();
			if (success) {
				await onboard.walletCheck();
			}
		} catch (e) {
			console.log(e);
		}
	};

	const disconnectWallet = () => {
		onboard.walletReset();
	};

	return {
		provider,
		signer,
		walletAddress,
		connectWallet,
		disconnectWallet,
		onboard,
		bncNotify,
	};
};

const Initialiser = createContainer(useInitialiser);

export default Initialiser;
