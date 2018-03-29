import React from "react";
import PropTypes from "prop-types";

import Menu from "../../components/Menu";
import { HomePageTemplate } from "../../templates/home-page";

const LayoutPreview = ({ entry, widgetsFor }) => {
  return (
    <div>
      <Menu menuBackgroundPic={entry.getIn(["data", "menuBackgroundPic"])} />
      <HomePageTemplate />
    </div>
  );
};

LayoutPreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  widgetFor: PropTypes.func
};

export default LayoutPreview;
