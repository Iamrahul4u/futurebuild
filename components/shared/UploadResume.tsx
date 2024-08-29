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
import { Card } from "../ui/card";
import Link from "next/link";
import { FileIcon } from "lucide-react";

const UploadResume = ({
  name,
  resume,
}: {
  name: string;
  resume: string | null;
}) => {
  const { control } = useFormContext();
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <h3 className="text-black dark:text-white">Resume</h3>

          {resume ? (
            <Card className="flex h-12 max-w-xs items-center justify-center">
              <Link
                href={resume}
                target="_blank"
                className="flex items-center text-lg text-blue-500"
              >
                <FileIcon className="mr-2" />
                Your Resume
              </Link>
            </Card>
          ) : (
            <Card className="flex h-12 max-w-xs items-center justify-center">
              <FileIcon className="mr-2" />
              No Resume Uploaded
            </Card>
          )}
          {resume && <h1 className="text-black dark:text-white">OR</h1>}
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

export default UploadResume;
