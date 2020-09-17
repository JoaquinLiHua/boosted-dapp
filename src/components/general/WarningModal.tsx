import React from "react";

import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/core";

export const WarningDialog = ({ open, setOpen }) => {
  const cancelRef: any = React.useRef();

  return (
    <>
      <AlertDialog
        isOpen={open}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Withdraw Stake
            </AlertDialogHeader>

            <AlertDialogBody>
              If you withdraw your staked funds, your BOOSTER effect will reset
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button colorScheme="red" onClick={() => setOpen(false)} ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
