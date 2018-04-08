import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Content, { HTMLContent } from "../components/Content";

export const AboutPageTemplate = ({ title, content, contentComponent, transition, helmet }) => {
  const PageContent = contentComponent || Content;
  return (
    <section className="section section--gradient" style={transition && transition.style}>
      {helmet || ""}
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">{title}</h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

class AboutPage extends React.Component {
  componentDidMount() {
    this.props.setArtPost(false);
  }

  render() {
    const { data, transition, location } = this.props;
    const { markdownRemark: post } = data;
    console.log(data);
    const { title: siteTitle, homepage: siteUrl } = data.site.siteMetadata;
    return (
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        transition={transition}
        content={post.html}
        helmet={
          <Helmet
            title={`${siteTitle} • About`}
            link={[{ rel: "canonical", href: siteUrl + location.pathname }]}
            meta={[{ property: "og:title", content: `${siteTitle} • About` }]}
          />
        }
      />
    );
  }
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    site {
      siteMetadata {
        title
        homepage
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
