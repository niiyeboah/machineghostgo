import React from "react";
import { ArtPostTemplate } from "../../templates/art-post";

const ArtPostPreview = ({ entry, widgetFor }) => (
  <ArtPostTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    title={entry.getIn(["data", "title"])}
  />
);

export default ArtPostPreview;
