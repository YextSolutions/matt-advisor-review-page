import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import Layout from "../components/Layout";
import ReviewGenForm from "../components/ReviewGenForm";
import "../index.css";

export const config = {
  stream: {
    $id: "advisor-collect",
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

export const getPath: GetPath<TemplateProps> = (props) => {
  return props.document.c_reviewCollectionSlug;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  props
): HeadConfig => {
  return {
    title: props.document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const AdvisorCollectPage: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const {
    id,
    name,
    address,
    c_advisorName,
    c_testimonials,
    slug,
    c_reviewCollectionPage,
  } = document;

  return (
    <>
      <Layout title={`Write a Testimonial for ${c_advisorName}`}>
        <div className="">
          <h1 className="text-2xl font-medium mb-8">
            Leave a testimonial for {c_advisorName}
          </h1>
          <ReviewGenForm advisorId={id} defaultExpanded />
        </div>
      </Layout>
    </>
  );
};
export default AdvisorCollectPage;
