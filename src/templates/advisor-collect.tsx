import * as React from "react";
import { renderToString } from "react-dom/server";
import Layout from "../components/Layout";
import ReviewGenForm from "../components/ReviewGenForm";
import "../index.css";
import { reactWrapper } from "../wrapper";
import { Data } from "../types/data";

export const config = {
  name: "advisor-collect",
  hydrate: true,
  streamId: "advisor-collect",
  stream: {
    $id: "advisor-collect",
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
      "c_reviewCollectionSlug",
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
  return data.document.streamOutput.c_reviewCollectionSlug;
};

const AdvisorCollectPage = (data: Data) => {
  const { document } = data;
  const { streamOutput } = document;
  const {
    id,
    name,
    address,
    c_advisorName,
    c_testimonials,
    slug,
    c_reviewCollectionPage,
  } = streamOutput;

  return (
    <>
      <Layout title={`Write Review for ${c_advisorName}`}>
        <div className="">
          <h1 className="text-2xl font-medium mb-8">
            Leave a review for {c_advisorName}
          </h1>
          <ReviewGenForm advisorId={id} defaultExpanded />
        </div>
      </Layout>
    </>
  );
};

export const render = (data: Data) =>
  reactWrapper(
    data,
    "advisor-collect.tsx",
    renderToString(<AdvisorCollectPage {...data} />),
    true
  );

export default AdvisorCollectPage;
