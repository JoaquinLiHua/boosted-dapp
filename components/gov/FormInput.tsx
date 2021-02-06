import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface FormInputProps {
  fieldName: string;
  name: string;
}

export const FormInput: React.FC<FormInputProps> = ({ fieldName, name }) => {
  const validateInput = (value: string) => {
    let error;
    if (!value) {
      error = `${fieldName} is required`;
      return error;
    }
  };
  return (
    <Field name={name} validate={validateInput}>
      {({ field, form }) => {
        return (
          <FormControl
            my={2}
            isInvalid={form.errors[name] && form.touched[name]}
          >
            <FormLabel fontWeight="bold" htmlFor={fieldName}>
              {fieldName}
            </FormLabel>
            <Input {...field} id={name} placeholder={fieldName} />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};
