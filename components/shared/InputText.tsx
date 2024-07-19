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
}: {
  name: string;
  placeholder: string;
  label?: string;
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex  flex-col justify-start space-y-0">
          {label && (
            <FormLabel
              htmlFor={name}
              className="text-black mb-2 dark:text-white"
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputText;
