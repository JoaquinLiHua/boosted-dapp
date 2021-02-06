import React from 'react';
import styled from 'styled-components';
import { useModal } from 'context/ModalContext';

import { PrimaryButton } from 'styles/common';
import Initialiser from 'context/Initialiser';

export const SettingsMenus = () => {
	const { connectWallet, walletAddress } = Initialiser.useContainer();
	return (
		<>
			{walletAddress ? (
				<></>
			) : (
				<ConnectWalletButton onClick={connectWallet}>Connect Wallet</ConnectWalletButton>
			)}
		</>
	);
};

const ConnectWalletButton = styled(PrimaryButton)`
	margin-left: 24px;
`;
