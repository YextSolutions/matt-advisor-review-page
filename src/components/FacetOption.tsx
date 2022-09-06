import * as React from "react";
import cx from "classnames";
import { Filters } from "@yext/answers-react-components";
import { DisplayableFacetOption, Matcher } from "@yext/answers-headless-react";

const FacetOption = ({
  option,
  fieldId,
  children,
  className,
}: {
  option: DisplayableFacetOption;
  fieldId: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { applyFilters, filters, selectFilter } = Filters.useFiltersContext();
  const { searchValue } = Filters.useFilterGroupContext();

  return (
    <button
      className={className}
      onClick={() => {
        console.log(option);
        selectFilter({
          matcher: option.matcher,
          fieldId: fieldId ?? "",
          value: option.value,
          displayName: option.displayName,
          selected: !option.selected,
        });
        applyFilters();
      }}
    >
      {children}
    </button>
  );
};

export default FacetOption;
