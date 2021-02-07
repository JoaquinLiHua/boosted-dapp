import React, { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from 'styles/common';
import Initialiser from 'context/Initialiser';
import { formatAddress } from 'utils/formatAddress';
import BaseModal from 'components/general/Modal';

export const WalletMenu = () => {
	const { connectWallet, walletAddress, disconnectWallet } = Initialiser.useContainer();
	const [open, setOpen] = useState<boolean>(true);
	return (
		<>
			{walletAddress ? (
				<WalletAddress onClick={() => setOpen(true)}>{formatAddress(walletAddress)}</WalletAddress>
			) : (
				<ConnectWalletButton onClick={connectWallet}>Connect Wallet</ConnectWalletButton>
			)}
			<StyledBaseModal title={'Wallet Options'} onDismiss={() => setOpen(false)} isOpen={open}>
				<ConnectWalletButton onClick={disconnectWallet}>Disconnect</ConnectWalletButton>
			</StyledBaseModal>
		</>
	);
};

const WalletAddress = styled(SecondaryButton)`
	font-size: 14px;
	cursor: pointer;
`;

const ConnectWalletButton = styled(PrimaryButton)`
	margin-left: 24px;
	cursor: pointer;
`;

const StyledBaseModal = styled(BaseModal)``;
