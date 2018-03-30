import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Meta from "../components/Meta";
import Menu from "../components/Menu";
import Info from "./info";
import "./all.scss";

export const LayoutTemplate = ({
  url,
  title,
  children,
  toggleMenu,
  profilePic,
  description,
  socialLinks,
  menuVisible,
  backgroundPic,
  menuBackgroundPic
}) => (
  <div className="section is-paddingless">
    <Meta title={title} url={url} image={`${url}/img/profile.jpg`} description={description} />
    <Menu
      toggleMenu={toggleMenu}
      socialLinks={socialLinks}
      menuVisible={menuVisible}
      menuBackgroundPic={menuBackgroundPic}
    />
    <div className="columns">
      <div className="column is-one-third bio">
        <Header profilePic={profilePic} socialLinks={socialLinks} backgroundPic={backgroundPic} />
      </div>
      <div className="column is-offset-one-third">
        <main>{children}</main>
      </div>
    </div>
  </div>
);

LayoutTemplate.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  toggleMenu: PropTypes.func,
  children: PropTypes.object,
  menuVisible: PropTypes.bool,
  socialLinks: PropTypes.array,
  profilePic: PropTypes.string,
  description: PropTypes.string,
  backgroundPic: PropTypes.string,
  menuBackgroundPic: PropTypes.string
};

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  closeMenu() {
    if (this.state.menuVisible) this.toggleMenu();
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
      <LayoutTemplate
        url={url}
        title={title}
        profilePic={profilePic}
        description={description}
        socialLinks={socialLinks}
        toggleMenu={this.toggleMenu}
        backgroundPic={backgroundPic}
        menuVisible={this.state.menuVisible}
        menuBackgroundPic={menuBackgroundPic}
      >
        {children({
          ...this.props,
          layout: false,
          closeMenu: this.closeMenu
        })}
      </LayoutTemplate>
    );
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object
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
