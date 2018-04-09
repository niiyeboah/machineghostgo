import React from "react";
import Link from "gatsby-link";
import info from "../utils/info";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import webfont from "../utils/webfont";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import Menu from "../components/Menu";

import "../layouts/main.scss";

export const LayoutTemplate = ({
  url,
  title,
  artPost,
  navSlugs,
  children,
  toggleMenu,
  profilePic,
  description,
  socialLinks,
  menuVisible,
  backgroundPic,
  menuBackgroundPic
}) => {
  let previous = "hidden";
  let next = "hidden";
  if (navSlugs) {
    if (navSlugs.previous) previous = "";
    if (navSlugs.next) next = "";
  }
  return (
    <div className="section is-paddingless">
      <Meta image={`${url}/android-chrome-384x384.png`} {...{ description, title, url }} />
      <Menu {...{ toggleMenu, socialLinks, menuVisible, menuBackgroundPic }} />
      <div className="columns last">
        <div className="column is-one-third bio">
          <Header {...{ profilePic, socialLinks, backgroundPic, artPost }} />
        </div>
        <div className="column template is-offset-one-third">
          <main>
            <div className="bg gradient" />
            <div className="nav-links container is-fluid">
              <div className={`columns is-mobile ${navSlugs ? "" : "hidden"}`}>
                <Link to={navSlugs && navSlugs.previous} className={`column ${previous}`}>
                  <i className="fas fa-angle-left" />
                </Link>
                <Link to="/" className="column">
                  <i className="fas fa-th" />
                </Link>
                <Link to={navSlugs && navSlugs.next} className={`column ${next}`}>
                  <i className="fas fa-angle-right" />
                </Link>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

LayoutTemplate.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  artPost: PropTypes.bool,
  toggleMenu: PropTypes.func,
  children: PropTypes.object,
  menuVisible: PropTypes.bool,
  socialLinks: PropTypes.array,
  description: PropTypes.string,
  profilePic: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backgroundPic: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  menuBackgroundPic: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false };
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.isArtPost = this.isArtPost.bind(this);
    this.setNavSlugs = this.setNavSlugs.bind(this);
  }

  closeMenu() {
    if (this.state.menuVisible) this.toggleMenu();
  }

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  isArtPost(val) {
    this.setState({ artPost: val });
  }

  setNavSlugs(val) {
    this.setState({ navSlugs: val });
  }

  componentDidMount() {
    document.querySelector("html").setAttribute("lang", "en");
    webfont(this.props.data.layout.frontmatter.font);
    info();
  }

  render() {
    const { children, data } = this.props;
    const { socialLinks } = data.layout.frontmatter;
    const { toggleMenu, state: { menuVisible, artPost, navSlugs } } = this;
    const { title, homepage: url, description } = data.site.siteMetadata;
    const menuBackgroundPic = data.menuBackgroundPic.resolutions;
    const backgroundPic = data.backgroundPic.resolutions;
    const profilePic = data.profilePic.sizes;
    return (
      <LayoutTemplate
        {...{
          url,
          title,
          artPost,
          navSlugs,
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
          closeMenu: this.closeMenu,
          isArtPost: this.isArtPost,
          setNavSlugs: this.setNavSlugs
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
  query CustomLayoutQuery(
    $profilePic: String!
    $backgroundPic: String!
    $menuBackgroundPic: String!
  ) {
    site {
      siteMetadata {
        title
        description
        homepage
      }
    }
    layout: markdownRemark(frontmatter: { layout: { eq: true } }) {
      frontmatter {
        font
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
    profilePic: imageSharp(id: { regex: $profilePic }) {
      sizes(maxWidth: 500) {
        ...GatsbyImageSharpSizes
      }
    }
    backgroundPic: imageSharp(id: { regex: $backgroundPic }) {
      resolutions(width: 530) {
        ...GatsbyImageSharpResolutions
      }
    }
    menuBackgroundPic: imageSharp(id: { regex: $menuBackgroundPic }) {
      resolutions(width: 630) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`;
