import React from "react";
import PropTypes from "prop-types";

import Menu from "../../components/Menu";
import { HomePageTemplate } from "../../templates/home-page";

const HomePagePreview = ({ entry, widgetsFor }) => {
  return (
    <div>
      <Menu menuBackgroundPic={entry.getIn(["data", "menuBackgroundPic"])} />
      <HomePageTemplate
        profilePic={entry.getIn(["data", "profilePic"])}
        backgroundPic={entry.getIn(["data", "backgroundPic"])}
      />
    </div>
  );
};

HomePagePreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  widgetFor: PropTypes.func
};

export default HomePagePreview;
