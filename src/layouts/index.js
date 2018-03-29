import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Meta from "../components/Meta";
import Menu from "../components/Menu";
import Header from "../components/Header";
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
    const url = data.site.siteMetadata.homepage;
    const description = data.site.siteMetadata.description;
    const {
      socialLinks,
      menuBackgroundPic,
      profilePic,
      backgroundPic
    } = data.allMarkdownRemark.edges[0].node.frontmatter;
    return (
      <div className="section is-paddingless">
        <Meta title={title} url={url} image={`${url}/img/profile.jpg`} description={description} />
        <Menu menuBackgroundPic={menuBackgroundPic} socialLinks={socialLinks} />
        <div className="columns">
          <div className="column is-one-third bio">
            <Header
              profilePic={profilePic}
              socialLinks={socialLinks}
              backgroundPic={backgroundPic}
              artPost={this.state.artPost}
            />
          </div>
          <div className="column is-offset-one-third">
            <main>
              {children({
                ...this.props,
                layout: false
              })}
            </main>
          </div>
        </div>
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
    allMarkdownRemark(filter: { frontmatter: { layout: { eq: true } } }) {
      edges {
        node {
          frontmatter {
            profilePic
            backgroundPic
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
