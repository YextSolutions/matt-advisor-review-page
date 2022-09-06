import * as React from "react";
import cx from "classnames";
import { useFormContext } from "react-hook-form";

type Props = {
  //Insert Props Here
  className?: string;
  name: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
};

const RadioInput = ({ className, name, label, options }: Props) => {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div className={cx(className)}>
      {label && (
        <label className="text-xs uppercase tracking-wider text-gray-500">
          {label}
        </label>
      )}
      {options.map((o) => (
        <div className="flex gap-2 items-center" key={o.value}>
          <input
            {...register(name, { required: true })}
            type="radio"
            value={o.value}
          />
          <label htmlFor={o.value}>{o.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
