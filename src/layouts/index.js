import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Meta from "../components/Meta";
import Menu from "../components/Menu";
import Info from "./info";
import "./all.scss";

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  componentDidMount() {
    Info();
  }
  render() {
    const { children, data } = this.props;
    const title = data.site.siteMetadata.title;
    const description = data.site.siteMetadata.description;
    const url = data.site.siteMetadata.homepage;
    const menuBackgroundPic = data.allMarkdownRemark.edges[0].node.frontmatter.menuBackgroundPic;
    const socialLinks = data.allMarkdownRemark.edges[0].node.frontmatter.socialLinks;
    return (
      <div className="section is-paddingless">
        <Meta title={title} url={url} image={`${url}/img/profile.jpg`} description={description} />
        <Menu menuBackgroundPic={menuBackgroundPic} socialLinks={socialLinks} />
        <main>{children()}</main>
      </div>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
        homepage
      }
    }
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            menuBackgroundPic
            socialLinks {
              name
              icon
              url
            }
          }
        }
      }
    }
  }
`;
