import * as React from "react";
import cx from "classnames";
import { CardComponent, CardProps } from "@yext/answers-react-components";
import Stars from "./Stars";

type Testimonial = {
  id: string;
  c_author: string;
  c_rating: number;
  c_location: string;
  c_status: string;
  c_authorEmail: string;
  c_content: string;
  c_reviewDate: number;
  name: string;
  c_additionalDisclosures: string;
  c_clientRelationshipDisclosure: string;
  c_compensationDisclosure: string;
};

const TestimonialCard: CardComponent = ({ result }) => {
  const t = result.rawData as Testimonial;

  //turn unix date with milliseconds into js date
  const date = new Date(t.c_reviewDate * 1000);

  // turn date into string like jan 3, 2020
  const dateString = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-2 border rounded-sm p-4">
      <div className="font-medium">{t.name}</div>
      <div className="flex gap-4">
        <div>
          <Stars stars={t.c_rating} />
        </div>
        <div>{dateString}</div>
      </div>
      <div>{t.c_content}</div>
      <div>
        <div className="text-gray-500 italic">{t.c_author}</div>
      </div>
      {(t.c_clientRelationshipDisclosure ||
        t.c_compensationDisclosure ||
        t.c_additionalDisclosures) && (
        <div className="text-sm border-t pt-4">
          {t.c_clientRelationshipDisclosure && (
            <div>
              <span className="font-medium text-gray-500">
                Client Relationship:{" "}
              </span>
              {t.c_clientRelationshipDisclosure}
            </div>
          )}
          {t.c_compensationDisclosure && (
            <div>
              <span className="font-medium text-gray-500">Compensation: </span>
              {t.c_compensationDisclosure}
            </div>
          )}
          {t.c_additionalDisclosures && (
            <div>
              <span className="font-medium text-gray-500">
                Additional Disclosure:{" "}
              </span>
              {t.c_additionalDisclosures}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
