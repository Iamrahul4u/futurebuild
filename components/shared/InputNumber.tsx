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

const InputNumber = ({
  name,
  placeholder,
  label,
  max,
}: {
  name: string;
  placeholder: string;
  label?: string;
  max?: number;
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
              className="mt-4 mb-2 text-black dark:text-white font-semibold text-base"
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type="number"
              min={0}
              max={max}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage className="pt-2" />
        </FormItem>
      )}
    />
  );
};

export default InputNumber;
