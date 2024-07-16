import React from "react";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const InputText = ({
  form,
  name,
  placeholder,
}: {
  form: any;
  name: string;
  placeholder: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex  flex-col justify-start space-x-3 space-y-0">
          <Input
            placeholder={placeholder}
            {...field}
            className="bg-gray-50 border w-72 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputText;
