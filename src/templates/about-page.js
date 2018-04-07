import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";

export const AboutPageTemplate = ({ title, content, contentComponent, transition }) => {
  const PageContent = contentComponent || Content;
  return (
    <section className="section section--gradient" style={transition && transition.style}>
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
    const { data, transition } = this.props;
    const { markdownRemark: post } = data;
    return (
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        transition={transition}
        content={post.html}
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
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
