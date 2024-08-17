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
import { Textarea } from "../ui/textarea";

export const InputTextArea = ({
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
        <FormItem>
          {label && (
            <FormLabel
              htmlFor={name}
              className="mb-2 mt-4 text-base font-semibold text-black dark:text-white"
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Textarea id={name} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="pt-2" />
        </FormItem>
      )}
    />
  );
};
