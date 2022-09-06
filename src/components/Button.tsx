import cx from "classnames";
import * as React from "react";
import { FaSpinner } from "react-icons/fa";

export type ButtonProps = {
  //Insert Props Here
  className?: string;
  buttonStyle?: "PRIMARY" | "SECONDARY" | "LINK" | "WARNING";
  size?: "SM" | "MD" | "LG";
  children?: React.ReactNode;
  label?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  href?: string;
  block?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  iconRight?: boolean;
};

export const Button = ({
  className,
  buttonStyle = "PRIMARY",
  size = "MD",
  children,
  label,
  loading,
  onClick,
  icon,
  href,
  block,
  type = "button",
  disabled,
  iconRight,
}: ButtonProps) => {
  const btnClassName = cx(
    className,
    "group md:w-default w-full tracking-wide shadow-xl  block transition-colors duration-200  ease-in-out",
    " ",
    "  duration-300 ease-in-out ",
    {
      "border bg-blue-800 text-white": buttonStyle === "PRIMARY",
      "border border-blue-900 text-gray-300 bg-black bg-opacity-50":
        buttonStyle === "SECONDARY",
      "text-gray-300 ": buttonStyle === "LINK",
      "border border-red-900 text-gray-300": buttonStyle === "WARNING",
    },
    {
      "hover:bg-blue-900": buttonStyle === "PRIMARY" && !disabled,
      "hover:border-blue-400 hover:text-white ":
        buttonStyle === "SECONDARY" && !disabled,
      "hover:underline": buttonStyle === "LINK" && !disabled,
      "hover:border-red-600 hover:text-white": buttonStyle === "WARNING",
    },
    {
      "px-3 py-2 text-xs rounded-md": size === "SM",
      "px-5 py-3 text-sm font-medium rounded-md": size === "MD",
      "px-8 py-4 font-medium rounded-lg": size === "LG",
    },
    {
      "md:w-full": block,
      "md:w-fit": !block,
    },
    {
      "opacity-50": disabled,
    }
  );

  const iconDiv = (
    <div
      className={cx(" transition-colors duration-300 ease-in-out ", {
        "text-blue-300 opacity-50 group-hover:text-blue-100 group-hover:opacity-80":
          buttonStyle === "PRIMARY",
        "text-blue-600 group-hover:text-blue-300": buttonStyle === "SECONDARY",
      })}
    >
      {icon}
    </div>
  );
  const inner = (
    <>
      <div className="flex  items-center justify-center gap-4">
        {icon && !iconRight && iconDiv}
        <div>{children ?? label}</div>
        {loading && <FaSpinner className="animate-spin" />}
        {icon && iconRight && iconDiv}
      </div>
    </>
  );

  if (href) {
    return (
      <div>
        <a className={btnClassName} href={href}>
          {inner}
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <button
          disabled={loading || disabled}
          onClick={onClick}
          className={btnClassName}
          type={type}
        >
          {inner}
        </button>
      </div>
    );
  }
};

export default Button;
