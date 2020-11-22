import React, { useState } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useGovernanceStakedBalance } from "src/hooks/gov/useGovernanceStakedBalance";
import { useGovernanceStake } from "src/hooks/gov/useGovernanceStake";
import { useVoteLockedPeriod } from "src/hooks/gov/useVoteLockedPeriod";
import { Formik, Field } from "formik";
import { formatTimestamp } from "src/utils/formatTimestamp";
import { getDisplayBalance } from "src/utils/formatBalance";

export const UnstakeModal: React.FC = () => {
  const stakedBalance = useGovernanceStakedBalance();
  const lockedPeriod = useVoteLockedPeriod();
  const { onUnstake } = useGovernanceStake();
  const [requestedUnstakeAll, setRequestedUnstakeAll] = useState<boolean>(
    false
  );
  const [unstakeAllError, setUnstakeAllError] = useState<string>("");

  const validateStakeAmount = (value: string) => {
    let error;
    if (!value) {
      error = `Unstake amount is required`;
      return error;
    } else if (
      lockedPeriod.toNumber() !== 0 &&
      new Date(lockedPeriod.toNumber() * 1000) > new Date()
    ) {
      error = `Stake amount still locked until ${formatTimestamp(
        lockedPeriod.toNumber()
      )}`;
      return error;
    }
  };

  const isUnlocked = () => {
    let error;
    if (
      lockedPeriod.toNumber() !== 0 &&
      new Date(lockedPeriod.toNumber() * 1000) > new Date()
    ) {
      error = `Withdraw all error: Stake amount still locked until ${formatTimestamp(
        lockedPeriod.toNumber()
      )}`;
      setUnstakeAllError(error);
      return false;
    }
    return true;
  };

  const handleUnstakeAmount = async (values, actions) => {
    try {
      const tx = await onUnstake(values.stakeAmount);
      if (!tx) {
        throw "Transaction error";
      } else {
        actions.setSubmitting(false);
      }
    } catch (e) {
      actions.setSubmitting(false);
    }
  };

  const handleUnstakeAll = async () => {
    if (isUnlocked()) {
      try {
        setRequestedUnstakeAll(true);
        const tx = await onUnstake(stakedBalance.toString());
        if (!tx) {
          throw "Transaction error";
        } else {
          setRequestedUnstakeAll(false);
        }
      } catch (e) {
        setRequestedUnstakeAll(false);
      }
    } else {
      console.log("Error: Tokens are still locked");
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Withdraw Staked</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack pb={8} spacing={4}>
          {parseFloat(stakedBalance.toString()) === 0 ? (
            <Text textAlign="center" fontWeight="bold">
              You have not staked any BOOST yet.
            </Text>
          ) : (
            <>
              <Text fontSize="sm">
                You have staked: {getDisplayBalance(stakedBalance)} BOOST
              </Text>
              <Formik
                initialValues={{
                  stakeAmount: "",
                }}
                onSubmit={(values, actions) => {
                  actions.setSubmitting(true);
                  handleUnstakeAmount(values, actions);
                }}
              >
                {({ handleSubmit, isSubmitting }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={4}>
                        <Field
                          name={"stakeAmount"}
                          validate={validateStakeAmount}
                        >
                          {({ field, form }) => {
                            return (
                              <FormControl
                                isInvalid={
                                  form.errors["stakeAmount"] &&
                                  form.touched["stakeAmount"]
                                }
                              >
                                <FormLabel htmlFor={"Stake Amount"}>
                                  Stake Amount
                                </FormLabel>
                                <Input
                                  type="number"
                                  {...field}
                                  id={"stakeAmount"}
                                  placeholder={"Stake Amount"}
                                />
                                <FormErrorMessage>
                                  {form.errors["stakeAmount"]}
                                </FormErrorMessage>
                              </FormControl>
                            );
                          }}
                        </Field>
                        <Button
                          w="100%"
                          colorScheme="green"
                          isLoading={isSubmitting}
                          disabled={isSubmitting}
                          type="submit"
                        >
                          Unstake
                        </Button>
                        <Button
                          colorScheme="red"
                          isLoading={requestedUnstakeAll}
                          disabled={requestedUnstakeAll}
                          w="100%"
                          onClick={() => handleUnstakeAll()}
                        >
                          Withdraw All
                        </Button>
                        <Text fontSize="xs" color="red.300">
                          {unstakeAllError}
                        </Text>
                      </Stack>
                    </form>
                  );
                }}
              </Formik>
            </>
          )}
        </Stack>
      </ModalBody>
    </ModalContent>
  );
};
