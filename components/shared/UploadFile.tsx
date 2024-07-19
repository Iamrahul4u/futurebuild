import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

const UploadFile = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <h3 className="dark:text-white text-black">Resume</h3>
          <FormLabel>Upload Your Resume Seperately?</FormLabel>
          <br />
          <FormControl>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  field.onChange(file);
                  setFile(file);
                }
              }}
            />
          </FormControl>
          <br />
          <FormMessage className="pt-2" />
        </FormItem>
      )}
    />
  );
};

export default UploadFile;
