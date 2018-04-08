import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import WebFont from "webfontloader";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import Menu from "../components/Menu";
import info from "../utils/info";
import "../layouts/main.scss";

export const LayoutTemplate = ({
  url,
  title,
  artPost,
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
    <Meta image={`${url}/android-chrome-384x384.png`} {...{ description, title, url }} />
    <Menu {...{ toggleMenu, socialLinks, menuVisible, menuBackgroundPic }} />
    <div className="columns last">
      <div className="column is-one-third bio">
        <Header {...{ profilePic, socialLinks, backgroundPic, artPost }} />
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
    this.setArtPost = this.setArtPost.bind(this);
  }

  closeMenu() {
    if (this.state.menuVisible) this.toggleMenu();
  }

  toggleMenu() {
    this.setState({ menuVisible: !this.state.menuVisible });
  }

  setArtPost(val) {
    this.setState({ artPost: val });
  }

  componentDidMount() {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    let webfont = this.props.data.layout.frontmatter.font;
    info();
    WebFont.load({ google: { families: [webfont] } });
    webfont = webfont ? webfont + "," : "";
    html.setAttribute("lang", "en");
    body.style.fontFamily = `
      ${webfont} BlinkMacSystemFont, -apple-system, 
      "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", 
      "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif
    `;
  }

  render() {
    const { children, data } = this.props;
    const { toggleMenu, state: { menuVisible, artPost } } = this;
    const { title, homepage: url, description } = data.site.siteMetadata;
    const { socialLinks } = data.layout.frontmatter;
    const menuBackgroundPic = data.menuBackgroundPic.resolutions;
    const backgroundPic = data.backgroundPic.resolutions;
    const profilePic = data.profilePic.sizes;
    return (
      <LayoutTemplate
        {...{
          url,
          title,
          artPost,
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
          setArtPost: this.setArtPost
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
