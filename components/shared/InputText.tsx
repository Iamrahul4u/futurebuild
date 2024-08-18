import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

const InputText = ({
  name,
  placeholder,
  label,
  disabled,
  isNumeric,
}: {
  name: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  isNumeric?: boolean;
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col justify-start space-y-0">
          {label && (
            <FormLabel
              htmlFor={name}
              className="mb-2 mt-4 text-base font-semibold text-black dark:text-white"
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              id={name}
              disabled={disabled}
              {...field}
              onChange={(e) => {
                // Convert value to number if isNumeric is true
                const value = isNumeric
                  ? Number(e.target.value)
                  : e.target.value;
                field.onChange(value); // Update the form state
              }}
            />
          </FormControl>
          <FormMessage className="pt-2" />
        </FormItem>
      )}
    />
  );
};

export default InputText;
