import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Image from "../components/Image";

export const ArtPostTemplate = ({
  date,
  title,
  image,
  helmet,
  dimensions,
  transition,
  description
}) => {
  const { width, height, unit } = dimensions;
  return (
    <article>
      {helmet || null}
      <section className="section" style={transition && transition.style}>
        <div className="art-post container is-fluid content">
          <div className="info">
            <div className="title">{title}</div>
            <small>{date}</small>
            <br />
            <small>{`${width} × ${height} ${unit}`}</small>
          </div>
          <Image src={image} />
          <div className="info description">{description}</div>
        </div>
      </section>
    </article>
  );
};

ArtPostTemplate.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  helmet: PropTypes.object,
  dimensions: PropTypes.object,
  transition: PropTypes.object,
  description: PropTypes.string
};

class ArtPost extends React.Component {
  componentDidMount() {
    this.props.setArtPost(true);
  }

  render() {
    const { data, transition, location } = this.props;
    const { title: siteTitle, homepage: siteUrl } = data.site.siteMetadata;
    const {
      image: { sizes: image },
      markdownRemark: { frontmatter: { date, title, description, dimensions } }
    } = data;
    return (
      <ArtPostTemplate
        {...{ date, title, description, image, dimensions, transition }}
        helmet={
          <Helmet
            title={`${siteTitle} • ${title}`}
            link={[{ rel: "canonical", href: siteUrl + location.pathname }]}
            meta={[
              { property: "og:title", content: `${siteTitle} • ${title}` },
              { property: "og:description", content: description },
              { property: "og:image", content: siteUrl + image }
            ]}
          />
        }
      />
    );
  }
}

ArtPost.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  transition: PropTypes.object
};

export default ArtPost;

export const pageQuery = graphql`
  query ArtPostByID($id: String!, $image: String!) {
    site {
      siteMetadata {
        title
        homepage
      }
    }
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        dimensions {
          width
          height
          unit
        }
      }
    }
    image: imageSharp(id: { regex: $image }) {
      sizes(maxWidth: 1000) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
