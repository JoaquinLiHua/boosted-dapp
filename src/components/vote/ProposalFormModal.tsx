import React, { useState, useCallback } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Button,
  FormControl,
  Text,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { FormInput } from "./FormInput";
import useSubmitProposal from "src/hooks/useSubmitProposal";
import { ModalProps } from "src/context/ModalContext";
import { useGovernanceStakedBalance } from "src/hooks/useGovernanceStakedBalance";
import useGovernanceStake from "src/hooks/useGovernanceStake";
import { boostToken, governanceContract } from "src/constants/tokenAddresses";
import { useApprove } from "src/hooks/useApprove";
import { useTokenBalance } from "src/hooks/useTokenBalance";
import { useAllowance } from "src/hooks/useAllowance";

export const ProposalFormModal: React.FC<ModalProps> = () => {
  const [step, setStep] = useState<number>(0);
  const { onSubmitProposal } = useSubmitProposal();
  const stakedBalance = useGovernanceStakedBalance();
  const { onStake } = useGovernanceStake();
  const boostBalance = useTokenBalance(boostToken);
  const { onApprove } = useApprove(boostToken, governanceContract);
  const [requestedApproval, setRequestedApproval] = useState<boolean>(false);

  const allowance = useAllowance(boostToken, governanceContract);

  const validateStakeAmount = (value: string) => {
    let error;
    if (!value) {
      error = `Stake amount is required`;
      return error;
    } else if (parseFloat(value) < 13.37) {
      error = `You must stake at least 13.37 Boost`;
      return error;
    }
  };

  const handleProceed = () => {
    if (stakedBalance.toNumber() >= 13.37) {
      setStep(1);
    } else {
      console.log("user's minimum stake not reached");
    }
  };

  const handleNext = async (values, actions) => {
    try {
      const tx = await onStake(values.stakeAmount);
      if (!tx) {
        throw "Transaction error";
      } else {
        actions.setSubmitting(false);
      }
    } catch (e) {
      actions.setSubmitting(false);
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      const tx = onSubmitProposal(values);
      if (!tx) {
        throw "Error in transaction";
      } else {
        actions.setSubmitting(false);
      }
    } catch (e) {
      console.log(e);
      actions.setSubmitting(false);
    }
  };

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (!txHash) {
        throw "Transactions error";
      } else {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
      setRequestedApproval(false);
    }
  }, [onApprove, setRequestedApproval]);

  const firstStep = () => {
    return (
      <Stack>
        <Text fontSize="md">Proposal Stake</Text>
        <Text fontSize="sm">
          You must stake a minimum of 13.37 Boost to submit a proposal
        </Text>
        {parseFloat(boostBalance.toString()) < 13.37 ? (
          <Text>You do not have enough Boost</Text>
        ) : (
          <Formik
            initialValues={{
              stakeAmount: "",
            }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              handleNext(values, actions);
            }}
          >
            {({ handleSubmit, isSubmitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Field name={"stakeAmount"} validate={validateStakeAmount}>
                    {({ field, form }) => {
                      return (
                        <FormControl
                          my={2}
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
                  <Flex my={4}>
                    {!allowance.toNumber() ? (
                      <Button
                        my={2}
                        mr={2}
                        isLoading={requestedApproval}
                        disabled={requestedApproval}
                        onClick={() => handleApprove()}
                      >
                        Approve BOOST
                      </Button>
                    ) : (
                      <Button
                        my={2}
                        mr={2}
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                        type="submit"
                        w="50%"
                      >
                        Stake
                      </Button>
                    )}

                    <Button
                      my={2}
                      ml={2}
                      disabled={stakedBalance.toNumber() < 13.37}
                      colorScheme="green"
                      onClick={() => handleProceed()}
                      w="50%"
                    >
                      Proceed
                    </Button>
                  </Flex>
                </form>
              );
            }}
          </Formik>
        )}
      </Stack>
    );
  };
  const secondStep = () => {
    return (
      <Stack>
        <Formik
          initialValues={{
            url: "",
            withdrawAmount: "",
            withdrawAddress: "",
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            handleSubmit(values, actions);
          }}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput fieldName={"Proposal URL"} name={"url"} />
                <FormInput
                  fieldName={"Withdraw Amount"}
                  name={"withdrawAmount"}
                />
                <FormInput
                  fieldName={"Withdraw Address"}
                  name={"withdrawAddress"}
                />
                <Button
                  my={4}
                  colorScheme="green"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                  w="100%"
                >
                  Submit
                </Button>
              </form>
            );
          }}
        </Formik>
      </Stack>
    );
  };

  return (
    <ModalContent>
      <ModalHeader>Submit Proposal</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{step === 0 ? firstStep() : secondStep()}</ModalBody>
    </ModalContent>
  );
};
