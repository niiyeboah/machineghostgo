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

  render() {
    const { entry, widgetsFor } = this.props;
    return (
      <LayoutTemplate
        toggleMenu={this.toggleMenu}
        menuVisible={this.state.menuVisible}
        profilePic={entry.getIn(["data", "profilePic"])}
        backgroundPic={entry.getIn(["data", "backgroundPic"])}
        menuBackgroundPic={entry.getIn(["data", "menuBackgroundPic"])}
      />
    );
  }
}

LayoutPreview.propTypes = {
  entry: PropTypes.shape({ getIn: PropTypes.func }),
  widgetFor: PropTypes.func
};

export default LayoutPreview;
