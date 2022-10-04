import * as React from "react";
import cx from "classnames";
import { useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import sendTestimonialToFunction from "../utils/sendTestimonialToFunction";
import Form from "./Form";
import Input from "./Input";
import RadioInput from "./RadioInput";
import StarInput from "./StarInput";
import Stars from "./Stars";
import TextArea from "./TextArea";
import RadioText from "./RadioText";

type Props = {
  //Insert Props Here
  className?: string;
  advisorId: string;
  defaultExpanded?: boolean;
};

const ReviewGenForm = ({
  className,
  advisorId,
  defaultExpanded = false,
}: Props) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Get URL query param with key 'invitationUid'
  let invitationUid: string | undefined = undefined;

  if (typeof window !== "undefined" && window.location) {
    // Client-side-only code
    invitationUid =
      new URLSearchParams(window?.location?.search).get("invitationUid") ??
      undefined;
  }

  return (
    <div className={cx(className)}>
      {!reviewSubmitted && (
        <div className="border bg-gray-100 rounded-sm flex flex-col gap-4">
          <button
            onClick={() => setExpanded((t) => !t)}
            className="flex justify-between items-center hover:bg-gray-200 p-4"
            type="button"
          >
            <h3 className=" font-medium">Write a Review</h3>
            <div className="flex gap-2 items-center">
              {!expanded && <Stars stars={5} />}
              <FaChevronRight
                className={cx("transition-all", {
                  "rotate-90": expanded,
                  "rotate-0": !expanded,
                })}
              />
            </div>
          </button>
          <div
            className={cx("px-4 pb-4 pt-1", {
              hidden: !expanded,
              block: expanded,
            })}
          >
            <Form
              successMessage="Review submitted successfully"
              onSubmit={async ({
                relationship,
                conflictOfInterest,
                compensation,
                ...rest
              }) => {
                let label1 = "";
                let label2 = "";
                let label3 = "";
                let currentClient = "";

                if (conflictOfInterest === "YES") {
                  label1 = "Conflict of Interest";
                  currentClient = "Yes";
                }
                else {
                  currentClient = "No";
                }
                if (compensation === "YES") {
                  label2 = "Compensated";
                }
                if (relationship === "YES") {
                  label3 = "Current Client";
                }

                console.log(label1, label2, label3);

                await sendTestimonialToFunction({
                  ...rest,
                  entity: {
                    id: advisorId,
                  },
                  label1,
                  label2,
                  label3,
                  currentClient,
                  invitationUid,
                });
                setReviewSubmitted(true);
              }}
              saveButtonLabel="Submit Review"
              disclosure={
                <div className="text-gray-500 text-sm">
                  <p>
                    By clicking submit, you agree to our review policy, privacy
                    policy and terms and conditions
                  </p>
                  <p className="mt-2">
                    This is not a place for filling formal complaints, please
                    call 800-888-8888 if you would like to file a compliant.
                    Reviews are considered social media content
                  </p>
                </div>
              }
            >
              <StarInput name="rating" label="Stars" />
              <TextArea
                name="content"
                label="Your review"
                placeholder="Be specific. Share useful information about your relationship with this finacial advisor to help other people learn more about them."
              />
              <RadioInput
                name="relationship"
                label="Are you a current client?"
                options={[
                  { label: "Yes, I am a current client", value: "YES" },
                  {
                    label: "Not, I am not a Client",
                    value: "NO",
                  },
                ]}
              />
              <RadioText
                radioInputName="conflictOfInterest"
                radioInputLabel="Do you have a conflict of interest? (e.g. business relationship or lead sharing agreement)"
                radioInputOptions={[
                  { label: "Yes, I have a conflict of interest", value: "YES" },
                  {
                    label: "No, I don’t have a conflict of interest",
                    value: "NO",
                  },
                ]}
                textAreaName="conflictDetails"
                textAreaLabel="Conflict of Interest Details"
                textAreaPlaceholder="Please provide a brief statement describing any material conflicts of interest resulting from your relationship with this investment advisor."
                textAreaOpenValue="YES"
              />
              <RadioText
                radioInputName="compensation"
                radioInputLabel="Have you been compensated?"
                radioInputOptions={[
                  { label: "Yes, I was compensated", value: "YES" },
                  {
                    label: "No, I have not been compensated",
                    value: "NO",
                  },
                ]}
                textAreaName="compensationDetails"
                textAreaLabel="Compensation Details"
                textAreaPlaceholder="Please provide a description of the compensation provided or to be provided."
                textAreaOpenValue="YES"
              />
              <Input
                name="authorEmail"
                label="Your email (never shared publicly)"
                placeholder="Used only to contact you and confirm your relationship to this financial advisor"
                required
              />
              <Input
                name="authorName"
                label="Your Name (publicaly displayed with your review)"
                placeholder="Summarize your review or highlight an interesting detail"
                required
              />
            </Form>
          </div>
        </div>
      )}
      {reviewSubmitted && (
        <div className="text-center text-gray-500 text-sm p-4 block border bg-gray-100">
          <p>
            Thank you for your review. It will be reviewed and published
            shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewGenForm;
