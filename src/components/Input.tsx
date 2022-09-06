import cx from "classnames";
import * as React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  //Insert Props Here
  className?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  name: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  pricePrefix?: "$" | "€" | "£";
  helpText?: string;
};

export const Input = ({
  className,
  label,
  type = "text",
  disabled,
  placeholder,
  name,
  required,
  autoFocus,
  defaultValue,
  onChange,
  pricePrefix,
  helpText,
}: Props) => {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div className={cx(className)}>
      <div className="group flex w-full flex-col">
        {label && (
          <label className="text-xs uppercase tracking-wider text-gray-500">
            {label}
          </label>
        )}
        <div className="relative mt-1 ">
          {pricePrefix && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {pricePrefix}
            </div>
          )}
          <input
            disabled={disabled}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            {...register(name, {
              required: required,
              valueAsNumber: type === "number",
            })}
            type={type}
            className={cx(
              pricePrefix && "px-7",
              "w-full rounded-md border border-gray-300  py-2 px-4   focus:border-blue-500 focus:outline-none focus:ring-blue-400 group-hover:border-blue-500 group-hover:ring-1 group-hover:ring-blue-500"
            )}
            placeholder={placeholder}
            onChange={onChange}
          ></input>
          {helpText && (
            <div className="text-xs mt-1 opacity-50 font-sans">{helpText}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
