import React, { useCallback, useState } from "react";

import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/core";
import { useExit } from "src/hooks/useExit";
import { useStake } from "src/hooks/useStake";

export const WithdrawWarning = ({
  setShowExitModal,
  type,
  pool,
  unstakeAmount,
}) => {
  const cancelRef: any = React.useRef();
  const [requestedUnstake, setRequestedUnstake] = useState<boolean>(false);
  const [requestedExit, setRequestedExit] = useState<boolean>(false);
  const { onExit } = useExit();
  const { onUnstake } = useStake(pool.address);

  const handleUnstake = useCallback(async () => {
    try {
      setRequestedUnstake(true);
      const txHash = await onUnstake(unstakeAmount);
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedUnstake(false);
        setShowExitModal(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedUnstake(false);
    }
  }, [unstakeAmount, onUnstake, setRequestedUnstake, setShowExitModal]);

  const handleExit = useCallback(async () => {
    try {
      setRequestedExit(true);
      const txHash = await onExit(pool.address);
      if (!txHash) {
        throw "Transaction error";
      } else {
        setRequestedExit(false);
        setShowExitModal(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedExit(false);
    }
  }, [onExit, pool, setRequestedExit, setShowExitModal]);

  return (
    <>
      <AlertDialog
        isOpen={true}
        leastDestructiveRef={cancelRef}
        onClose={() => setShowExitModal(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Withdraw Stake
            </AlertDialogHeader>
            <AlertDialogBody>
              Withdrawing your funds will reset ALL existing booster effects.
              Are you sure you want to withdraw?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setShowExitModal(false)}>Cancel</Button>
              <Button
                disabled={requestedUnstake || requestedExit}
                colorScheme="red"
                onClick={() => {
                  type === "exit" ? handleExit() : handleUnstake();
                }}
                ml={3}
              >
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
