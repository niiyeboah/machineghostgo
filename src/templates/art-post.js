import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Image from "../components/Image";

export const ArtPostTemplate = ({
  date,
  title,
  image,
  helmet,
  navSlugs,
  dimensions,
  transition,
  description
}) => {
  const { width, height, unit } = dimensions;
  return (
    <article style={transition && transition.style}>
      {helmet || ""}
      <section className="section">
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
  helmet: PropTypes.object,
  dimensions: PropTypes.object,
  transition: PropTypes.object,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

class ArtPost extends React.Component {
  componentDidMount() {
    let navSlugs = {};
    const slug = this.props.data.art.fields.slug;
    const slugs = this.props.data.slugs.edges;
    slugs.map(s => {
      navSlugs[s.node.fields.slug] = {
        next: s.next && s.next.fields.slug,
        previous: s.previous && s.previous.fields.slug
      };
    });
    this.props.isArtPost(true);
    this.props.setNavSlugs(navSlugs[slug]);
  }

  render() {
    const { data, transition, location } = this.props;
    const { title: siteTitle, homepage: siteUrl } = data.site.siteMetadata;
    const {
      image: { sizes: image },
      art: { frontmatter: { date, title, description, dimensions } }
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
              { property: "og:image", content: siteUrl + image.src }
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
    art: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
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
    slugs: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "art-post" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
        next {
          fields {
            slug
          }
        }
        previous {
          fields {
            slug
          }
        }
      }
    }
  }
`;
