import * as React from "react";
import cx from "classnames";
import { Filters } from "@yext/answers-react-components";
import FacetOption from "./FacetOption";
import Stars from "./Stars";
import { FaFilter } from "react-icons/fa";

type Props = {
  //Insert Props Here
  className?: string;
};

const FacetPills = ({ className }: Props) => {
  return (
    <div className={cx(className)}>
      <Filters.Facets
        searchOnChange={true}
        className="w-full flex flex-col gap-4"
      >
        {(facets) => {
          return (
            <>
              {facets.map((f, i) => {
                return (
                  <div key={f.fieldId}>
                    <Filters.FilterGroup fieldId={f.fieldId}>
                      <div className=" text-sm font-medium text-gray-700 mb-1 w-full flex gap-1 items-center">
                        {f.displayName}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {f.options.map((o) => (
                          <FacetOption
                            fieldId={f.fieldId}
                            key={o.displayName}
                            option={o}
                            className={cx(
                              "flex pl-2 pr-1 py-1 rounded-full border text-xs gap-2 items-center",
                              {
                                "bg-white border-gray-300 hover:bg-gray-100":
                                  !o.selected,
                                "bg-gray-200 border-gray-500": o.selected,
                              }
                            )}
                          >
                            <div>
                              {f.fieldId === "c_rating" && (
                                <Stars
                                  small
                                  stars={parseInt(o.displayName)}
                                  hideEmpty
                                />
                              )}
                              {f.fieldId !== "c_rating" && (
                                <div>o.displayName</div>
                              )}
                            </div>
                            <div className="rounded-full bg-gray-200 text-xs px-1">
                              {o.count}
                            </div>
                          </FacetOption>
                        ))}
                      </div>
                    </Filters.FilterGroup>
                  </div>
                );
              })}
            </>
          );
        }}
      </Filters.Facets>
    </div>
  );
};

export default FacetPills;
