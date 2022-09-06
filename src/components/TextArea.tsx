import cx from "classnames";
import * as React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  //Insert Props Here
  className?: string;
  label?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
};

export const TextArea = ({
  className,
  label,
  placeholder,
  name,
  required,
  defaultValue,
  disabled,
}: Props) => {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div className={cx(className)}>
      <div className="flex w-full flex-col group">
        {label && (
          <label className="text-xs uppercase tracking-wider text-gray-500">
            {label}
          </label>
        )}
        <textarea
          disabled={disabled}
          defaultValue={defaultValue}
          {...register(name, { required: required })}
          rows={10}
          className="mt-1 w-full rounded-md border border-gray-300 py-2 px-4   focus:ring-blue-500 focus:border-none group-hover:border-blue-500 group-hover:ring-1 group-hover:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextArea;
