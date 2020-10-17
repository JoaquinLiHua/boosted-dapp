import React, { useCallback } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Icon,
} from "@chakra-ui/core";
import { useModal } from "src/context/ModalContext";
import { WalletSelectModal } from "src/components/general/WalletSelectModal";
import { useWallet } from "use-wallet";
import { FaChevronDown, FaSignOutAlt, FaWallet } from "react-icons/fa";
import { formatAddress } from "src/utils/formatAddress";

export const SettingsMenus = () => {
  const { account, reset } = useWallet();

  const [onPresentWalletProviderModal] = useModal(
    <WalletSelectModal />,
    "provider"
  );

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal();
  }, [onPresentWalletProviderModal]);

  return (
    <Menu>
      {account ? (
        <MenuButton
          size="sm"
          as={Button}
          rightIcon={<Icon as={FaChevronDown} />}
        >
          {formatAddress(account)}
        </MenuButton>
      ) : (
        <Button
          size="sm"
          as={Button}
          rightIcon={<Icon as={FaWallet} />}
          onClick={() => handleUnlockClick()}
        >
          Connect Wallet
        </Button>
      )}
      <MenuList>
        <MenuItem onClick={() => reset()}>
          <Icon mr={4} as={FaSignOutAlt} />
          <Text fontSize="sm">Disconnect</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
