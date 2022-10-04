import * as React from "react";
import { useFormContext } from "react-hook-form";
import RadioInput from "./RadioInput";
import TextAreaMedium from "./TextAreaMedium";

interface RadioTextProps {
  radioInputName: string;
  radioInputLabel: string;
  radioInputOptions: {
    label: string;
    value: string;
  }[];
  textAreaName: string;
  textAreaLabel: string;
  textAreaPlaceholder: string;
  textAreaOpenValue?: string;
}

const RadioText = ({
  radioInputName,
  radioInputLabel,
  radioInputOptions,
  textAreaName,
  textAreaLabel,
  textAreaPlaceholder,
  textAreaOpenValue,
}: RadioTextProps) => {
  const currentValue = useFormContext().watch(radioInputName);

  return (
    <>
      <RadioInput
        name={radioInputName}
        label={radioInputLabel}
        options={radioInputOptions}
      />
      {currentValue === textAreaOpenValue && (
        <TextAreaMedium
          name={textAreaName}
          label={textAreaLabel}
          placeholder={textAreaPlaceholder}
        />
      )}
    </>
  );
};

export default RadioText;
