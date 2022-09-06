import * as React from "react";
import { renderToString } from "react-dom/server";
import AdvisorReviews from "../components/AdvisorReviews";
import Layout from "../components/Layout";
import ReviewGenForm from "../components/ReviewGenForm";
import Stars from "../components/Stars";
import "../index.css";
import { reactWrapper } from "../wrapper";
import { Data } from "../types/data";

export const config = {
  name: "advisors",
  hydrate: true,
  streamId: "advisors",
  stream: {
    $id: "advisors",
    source: "knowledgeGraph",
    destination: "pages",
    fields: [
      "id",
      "uid",
      "name",
      "address",
      "c_advisorName",
      "c_testimonials",
      "slug",
      "description",
      "ref_reviewsAgg.averageRating",
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return data.document.streamOutput.slug;
};

const AdvisorPage = (data: Data) => {
  const { document } = data;
  const { streamOutput } = document;
  const {
    id,
    name,
    address,
    c_advisorName,
    c_testimonials,
    slug,
    description,
    c_reviewCollectionPage,
    ref_reviewsAgg,
  } = streamOutput;

  const AdditionDetails = (
    <div>
      <p>{description}</p>
      <a className="text-gray-600 text-sm underline" href="#review-gen">
        Rate this Advsior
      </a>
    </div>
  );
  return (
    <>
      <Layout title={c_advisorName}>
        <div className="flex gap-5">
          <div className="h-32 w-32 md:w-64 md:h-64 flex-none bg-gray-200"></div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">{c_advisorName}</h1>
            <div>
              {address?.city}, {address?.region}
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
              <Stars stars={5} />
              <div>31 Certified Advisor Reviews</div>
            </div>
            <div className="hidden md:block">{AdditionDetails}</div>
          </div>
        </div>
        <div className="block md:hidden">{AdditionDetails}</div>

        <div id="review-gen">
          <h2 className="text-lg font-medium mb-2">
            Reviews about {c_advisorName}
          </h2>
          <ReviewGenForm advisorId={id} />
          <AdvisorReviews advisorName={c_advisorName} className="mt-8" />
        </div>
      </Layout>
    </>
  );
};

export const render = (data: Data) =>
  reactWrapper(
    data,
    "advisors.tsx",
    renderToString(<AdvisorPage {...data} />),
    true
  );

export default AdvisorPage;
