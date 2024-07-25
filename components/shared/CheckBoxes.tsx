import React from "react";
import { useFormContext } from "react-hook-form";
const CheckBoxes = ({ options }: { options: string[] }) => {
  const { register } = useFormContext();

  return (
    <ul className="flex gap-2">
      {options.map((option: any) => (
        <span className="flex gap-1" key={option}>
          <label>
            <input type="checkbox" {...register("modeOfWork")} value={option} />
            {option}
          </label>
        </span>
      ))}
    </ul>
  );
};
export default CheckBoxes;
