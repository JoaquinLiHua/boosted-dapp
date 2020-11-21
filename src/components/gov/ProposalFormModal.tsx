import React from "react";
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FormInput } from "./FormInput";
import useSubmitProposal from "src/hooks/gov/useSubmitProposal";
import { ModalProps } from "src/context/ModalContext";
import { useGovernanceStakedBalance } from "src/hooks/gov/useGovernanceStakedBalance";

export const ProposalFormModal: React.FC<ModalProps> = () => {
  const { onSubmitProposal } = useSubmitProposal();
  const stakedBalance = useGovernanceStakedBalance();

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
        <Stack pb={8}>
          {parseFloat(stakedBalance.toString()) < 13.37 ? (
            <Text textAlign="center" fontWeight="bold">
              You must stake at least 13.37 BOOST to submit a proposal.
            </Text>
          ) : (
            <>
              <Text fontSize="sm">
                View BFIP template{" "}
                <Text
                  as="a"
                  href="https://github.com/Boosted-Finance/BFIPs"
                  target="_blank"
                  textDecoration="underline"
                >
                  here
                </Text>
              </Text>
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
                      <Stack spacing={4}>
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
                          colorScheme="green"
                          isLoading={isSubmitting}
                          disabled={isSubmitting}
                          type="submit"
                          w="100%"
                        >
                          Submit
                        </Button>
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
