import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useModal } from 'context/ModalContext';
import { WalletSelectModal } from 'components/general/WalletSelectModal';
import { useWallet } from 'use-wallet';
import { formatAddress } from 'utils/formatAddress';

import { PrimaryButton } from 'styles/common';

export const SettingsMenus = () => {
	const { account, reset } = useWallet();

	const [onPresentWalletProviderModal] = useModal(<WalletSelectModal />, 'provider');

	const handleUnlockClick = useCallback(() => {
		onPresentWalletProviderModal();
	}, [onPresentWalletProviderModal]);

	return (
		<>{account ? <></> : <ConnectWalletButton href="#">Connect Wallet</ConnectWalletButton>}</>
	);
};

const ConnectWalletButton = styled(PrimaryButton)`
	margin-left: 24px;
`;
