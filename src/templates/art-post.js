import React from "react";
import Helmet from "react-helmet";

export const ArtPostTemplate = ({ date, title, description, image, dimensions, helmet }) => {
  const { width, height, unit } = dimensions;
  return (
    <article>
      {helmet || null}
      <section className="section">
        <div className="art-post container is-fluid content">
          <div className="info">
            <div className="title">{title}</div>
            <small>{date}</small>
            <br />
            <small>{`${width} × ${height} ${unit}`}</small>
          </div>
          <figure className="image is-square">
            <img src={image} />
          </figure>
          <div className="info description">{description}</div>
        </div>
      </section>
    </article>
  );
};

export default ({ data, transition, location }) => {
  const { title: siteTitle, homepage: siteUrl } = data.site.siteMetadata;
  const { markdownRemark: { frontmatter: { date, title, description, image, dimensions } } } = data;
  return (
    <ArtPostTemplate
      {...{ date, title, description, image, dimensions }}
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
};

export const pageQuery = graphql`
  query ArtPostByID($id: String!) {
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
        image
        dimensions {
          width
          height
          unit
        }
      }
    }
  }
`;
