"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface SelectOptions {
  options: string[];
  label?: string;
  name: string;
}
export function SelectForm({ label, options, name }: SelectOptions) {
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
              className="mb-2 mt-4 w-full text-base font-semibold text-black dark:text-white"
            >
              {label}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a Value" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.split("_").join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="pt-2" />
        </FormItem>
      )}
    />
  );
}
