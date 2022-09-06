import * as React from "react";
import cx from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import Stars from "./Stars";

type Props = {
  //Insert Props Here
  className?: string;
  name: string;
  label: string;

  //   onChange?: (RadioCardItem) => void;
  defaultValue?: number;
  required?: boolean;
};

const StarInput = ({
  className,
  name,
  label,
  required,
  defaultValue,
}: Props) => {
  const { control } = useFormContext();
  return (
    <div className={cx(className)}>
      <div className="group flex w-full flex-col">
        {label && (
          <label className="text-xs uppercase tracking-wider text-gray-500">
            {label}
          </label>
        )}
        <div className="relative mt-1 font-mono">
          <Controller
            name={name}
            rules={{ required }}
            control={control}
            defaultValue={defaultValue}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div>
                <Stars stars={value} onChange={onChange} />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default StarInput;
