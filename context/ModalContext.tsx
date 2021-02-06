import React, { createContext, useCallback, useState, useContext } from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";

export interface ModalProps {
  onDismiss?: () => void;
}

interface ModalsContext {
  content?: React.ReactNode;
  isOpen?: boolean;
  onPresent: (content: React.ReactNode, key?: string) => void;
  onDismiss: () => void;
}

export const Context = createContext<ModalsContext>({
  onPresent: () => {},
  onDismiss: () => {},
});

export const ModalContext: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>();
  const [, setModalKey] = useState<string>();

  const handlePresent = useCallback(
    (modalContent: React.ReactNode, key?: string) => {
      setModalKey(key);
      setContent(modalContent);
      setIsOpen(true);
    },
    [setContent, setIsOpen, setModalKey]
  );

  const handleDismiss = useCallback(() => {
    setContent(undefined);
    setIsOpen(false);
  }, [setContent, setIsOpen]);

  return (
    <Context.Provider
      value={{
        content,
        isOpen,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      {children}
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} isCentered>
        <ModalOverlay>
          {React.isValidElement(content) &&
            React.cloneElement(content, {
              onDismiss: handleDismiss,
            })}
        </ModalOverlay>
      </Modal>
    </Context.Provider>
  );
};

export const useModal = (modal: React.ReactNode, key?: string) => {
  const { onDismiss, onPresent } = useContext(Context);

  const handlePresent = useCallback(() => {
    onPresent(modal, key);
  }, [key, modal, onPresent]);

  return [handlePresent, onDismiss];
};
