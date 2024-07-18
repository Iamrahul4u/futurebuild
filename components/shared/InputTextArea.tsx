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
}: {
  name: string;
  placeholder: string;
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <h3 className="text-black dark:text-white">Cover Letter</h3>
          <FormLabel className="text-black dark:text-white">
            Why should you be hired for this role?
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              className="bg-gray-50 border border-gray-300 text-black dark:text-white  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </FormControl>
          <br />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
