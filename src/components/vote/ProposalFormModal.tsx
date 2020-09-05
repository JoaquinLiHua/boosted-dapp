import React from "react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import { FormInput } from "./FormInput";
import useSubmitProposal from "src/hooks/useSubmitProposal";
import { ModalProps } from "src/context/ModalContext";

export const ProposalFormModal: React.FC<ModalProps> = () => {
  const { onSubmitProposal } = useSubmitProposal();

  const validateStakeAmount = (value: string) => {
    let error;
    if (!value) {
      error = `Stake amount is required`;
      return error;
    } else if (parseInt(value) <= 13.77) {
      error = `You must stake atleast 13.77 Boost`;
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
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

  return (
    <ModalContent>
      <ModalHeader>Submit Proposal</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>
          <Formik
            initialValues={{
              stakeAmount: "",
              url: "",
              withdrawAmount: "",
              withdrawAddress: "",
            }}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
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
                    my={2}
                    colorScheme="green"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              );
            }}
          </Formik>
        </Stack>
      </ModalBody>
    </ModalContent>
  );
};
