import * as React from "react";
import { useState } from "react";
import cx from "classnames";
import { FaChevronRight, FaFilter } from "react-icons/fa";

type Props = {
  //Insert Props Here
  className?: string;
  children?: React.ReactNode;
};

const ExpandableFilter = ({ className, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={cx(className)}>
      <button
        onClick={() => setIsExpanded((e) => !e)}
        className={cx(
          "text-gray-700 flex gap-2 items-center text-xs px-2 py-1 rounded-full border",
          {
            "bg-gray-100  border-gray-300  mb-3 hover:bg-gray-200": isExpanded,
            "hover:bg-gray-100 mb-1": !isExpanded,
          }
        )}
      >
        <FaFilter className="opacity-70" /> Filter
        <FaChevronRight
          className={cx("transition-all", {
            "rotate-90": isExpanded,
          })}
        />
      </button>

      <div
        className={cx("mb-0 flex flex-col gap-4", {
          hidden: !isExpanded,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandableFilter;
