import * as React from "react";
import { Data } from "../types/data";

import { renderToString } from "react-dom/server";
import Layout from "../components/Layout";
import ReviewGenForm from "../components/ReviewGenForm";
import "../index.css";
import { reactWrapper } from "../wrapper";

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
      "c_relatedATM.name"
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

const AdvisorCollectionPage = (data: Data) => {
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
    c_relatedAtm.name
  } = streamOutput;

  return (
    <>
      <Layout title={`Write Review for ${c_advisorName}`}>
        <div className="">
          <h1 className="text-2xl font-medium mb-8">
            Leave a review for {c_relatedATM.name}
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
    renderToString(<AdvisorCollectionPage {...data} />),
    true
  );

export default AdvisorCollectionPage;
