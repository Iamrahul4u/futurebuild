import React, { useCallback } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

interface InputTextProps {
  name: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  isNumeric?: boolean;
}

const InputText: React.FC<InputTextProps> = React.memo(
  ({ name, placeholder, label, disabled, isNumeric }) => {
    const { control } = useFormContext();

    const handleChange = useCallback(
      (fieldOnChange: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = isNumeric ? Number(e.target.value) : e.target.value;
        fieldOnChange(value); // Update the form state
      },
      [isNumeric]
    );

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
                onChange={handleChange(field.onChange)}
              />
            </FormControl>
            <FormMessage className="pt-2" />
          </FormItem>
        )}
      />
    );
  }
);

export default InputText;
