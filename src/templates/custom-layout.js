import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import Menu from "../components/Menu";
import Info from "../utils/info";
import "../layouts/main.scss";

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
    <Meta image={`${url}/img/profile.jpg`} {...{ description, title, url }} />
    <Menu {...{ toggleMenu, socialLinks, menuVisible, menuBackgroundPic }} />
    <div className="columns last">
      <div className="column is-one-third bio">
        <Header {...{ profilePic, socialLinks, backgroundPic }} />
      </div>
      <div className="column template is-offset-one-third">
        <main>
          <div className="bg gradient" />
          {children}
        </main>
      </div>
    </div>
    <Footer />
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
    const { toggleMenu, state: { menuVisible } } = this;
    const { title, homepage: url, description } = data.site.siteMetadata;
    const { socialLinks, menuBackgroundPic, profilePic, backgroundPic } = data.layout.frontmatter;
    return (
      <LayoutTemplate
        {...{
          url,
          title,
          profilePic,
          toggleMenu,
          description,
          socialLinks,
          menuVisible,
          backgroundPic,
          menuBackgroundPic
        }}
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
  query CustomLayoutQuery {
    site {
      siteMetadata {
        title
        description
        homepage
      }
    }
    layout: markdownRemark(frontmatter: { layout: { eq: true } }) {
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
`;
