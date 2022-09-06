import {
  AnswersHeadlessProvider,
  Matcher,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import {
  ResultsCount,
  SearchBar,
  VerticalResults,
} from "@yext/answers-react-components";
import cx from "classnames";
import * as React from "react";
import { useEffect } from "react";
import AdvisorReviewsFacets from "./AdvisorReviewsFacets";
import ExpandableFilter from "./ExpandableFilter";

import TestimonialCard from "./TestimonialCard";

type Props = {
  //Insert Props Here
  advisorName: string;
  className?: string;
};

const config = {
  apiKey: "3d02be42d3d4a3c8d7bb405ef5824c70",
  experienceKey: "advisor-testimonials",
  locale: "en",
  experienceVersion: "PRODUCTION",
};

const AdvisorReviews = ({ className, advisorName }: Props) => {
  // Create array of length 10
  const actions = useAnswersActions();
  const vertical = useAnswersState((state) => state.vertical);
  const loading = useAnswersState((state) => state.searchStatus?.isLoading);

  useEffect(() => {
    actions.setVertical("testimonial");

    actions.setStaticFilters([
      {
        fieldId: "c_location.c_advisorName",
        value: advisorName,
        selected: true,
        matcher: Matcher.Equals,
      },
    ]);
    actions.executeVerticalQuery();
  }, []);
  return (
    <div>
      <div className={cx(className, "flex flex-col")}>
        <ExpandableFilter>
          <AdvisorReviewsFacets />
          <SearchBar placeholder="Search Reviews" />
        </ExpandableFilter>
        <div
          className={cx("text-gray-700 mb-2 mt-4 text-xs", {
            "opacity-50": loading,
          })}
        >
          Showing {vertical.results?.length} of {vertical.resultsCount} reviews
        </div>

        <VerticalResults
          CardComponent={TestimonialCard}
          customCssClasses={{
            results: "flex flex-col gap-4",
          }}
        />
      </div>
    </div>
  );
};

export default ({
  advisorName,
  className,
}: {
  advisorName: string;
  className?: string;
}) => (
  <AnswersHeadlessProvider {...config}>
    <AdvisorReviews advisorName={advisorName} className={className} />
  </AnswersHeadlessProvider>
);
