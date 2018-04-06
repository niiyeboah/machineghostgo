import React from "react";
import PropTypes from "prop-types";
import { ArtPostTemplate } from "../../templates/art-post";

const ArtPostPreview = ({ entry, widgetsFor }) => {
  const dimensions = widgetsFor("dimensions");
  return (
    <ArtPostTemplate
      description={entry.getIn(["data", "description"])}
      title={entry.getIn(["data", "title"])}
      date={entry.getIn(["data", "date"]).toLocaleDateString()}
      image={entry.getIn(["data", "image"])}
      dimensions={{
        width: dimensions.getIn(["data", "width"]),
        height: dimensions.getIn(["data", "height"]),
        unit: dimensions.getIn(["data", "unit"])
      }}
    />
  );
};

ArtPostPreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  widgetsFor: PropTypes.func
};

export default ArtPostPreview;
