import React from "react";
import PropTypes from "prop-types";

import { LayoutTemplate } from "../../templates/custom-layout";

class LayoutPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  componentDidMount() {
    const font = this.props.entry.getIn(["data", "font"]);
    const previewPane = document.querySelector(".nc-previewPane-frame");
    const previewDocument = previewPane.contentWindow.document;
    const fontawesome = previewDocument.createElement("script");
    const googlefonts = previewDocument.createElement("link");
    fontawesome.src = "https://use.fontawesome.com/releases/v5.0.8/js/all.js";
    googlefonts.href = `https://fonts.googleapis.com/css?family=${font.replace(" ", "+")}`;
    googlefonts.rel = "stylesheet";
    googlefonts.media = "all";
    previewDocument.head.appendChild(fontawesome);
    previewDocument.head.appendChild(googlefonts);
    previewDocument.querySelector("body").style.fontFamily = `
      ${font ? font + "," : ""} BlinkMacSystemFont, -apple-system, 
      "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", 
      "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
    `;
  }

  render() {
    const { entry, widgetsFor } = this.props;
    return (
      <LayoutTemplate
        toggleMenu={this.toggleMenu}
        menuVisible={this.state.menuVisible}
        profilePic={entry.getIn(["data", "profilePic"])}
        backgroundPic={entry.getIn(["data", "backgroundPic"])}
        menuBackgroundPic={entry.getIn(["data", "menuBackgroundPic"])}
        socialLinks={widgetsFor("socialLinks").map(socialLink => ({
          name: socialLink.getIn(["data", "name"]),
          icon: socialLink.getIn(["data", "icon"]),
          url: socialLink.getIn(["data", "url"])
        }))}
      />
    );
  }
}

LayoutPreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  widgetFor: PropTypes.func
};

export default LayoutPreview;
