import cx from "classnames";
import * as React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "./Button";

type Props = {
  //Insert Props Here
  className?: string;
  onSubmit?: (data: any) => any;
  onCancel?: () => any;
  successMessage?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  defaultValues?: any;
  showCancelButton?: boolean;
  hideSaveButton?: boolean;
  saveButtonLabel?: string;
  disableDirtyValidation?: boolean;
  disableToast?: boolean;
  disclosure?: React.ReactNode;
};

export const Form = ({
  className,
  onSubmit,
  onCancel,
  children,
  defaultValues,
  showCancelButton = false,
  hideSaveButton = false,
  saveButtonLabel = "Save",
  successMessage = "Successfully Saved",
  errorMessage = "Error Saving",
  disableDirtyValidation = false,
  disableToast = false,
  disclosure,
}: Props) => {
  const methods = useForm({
    defaultValues,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submitHandler = async (data: any) => {
    setError(undefined);

    if (onSubmit) {
      setSaving(true);
      try {
        // Santize data by removing any properties thare are nan
        const sanitizedData = Object.keys(data).reduce(
          (acc, key) => ({
            ...acc,
            [key]: Number.isNaN(data[key]) ? undefined : data[key],
          }),
          {}
        );
        await onSubmit(sanitizedData);
        if (!disableToast) {
          toast(successMessage ?? "Successfully Saved", {
            type: "success",
          });
        }
      } catch (e: any) {
        // get error details

        const error = e.response?.data?.message ?? e.message;
        toast(error, {
          type: "error",
        });
        setError(error);
      } finally {
        setSaving(false);
      }
    } else {
      console.warn("Set the onSubmit property of the form");
      alert(JSON.stringify(data));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)} className="w-full ">
        <div className={cx(className, "flex flex-col gap-6")}>{children}</div>
        {(showCancelButton || !hideSaveButton) && (
          <div className="mt-4 flex gap-4">
            {showCancelButton && (
              <Button
                buttonStyle="SECONDARY"
                onClick={() => {
                  methods.reset();
                  onCancel?.();
                }}
                disabled={
                  (!methods.formState.isDirty && !disableDirtyValidation) ||
                  saving
                }
              >
                Cancel
              </Button>
            )}

            {!hideSaveButton && (
              <Button
                type="submit"
                disabled={!methods.formState.isDirty && !disableDirtyValidation}
                loading={saving}
              >
                {saveButtonLabel}
              </Button>
            )}
          </div>
        )}
        {disclosure && <div className="mt-4">{disclosure}</div>}
      </form>
    </FormProvider>
  );
};

export default Form;
