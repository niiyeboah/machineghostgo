import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

export const HomePageTemplate = ({ artwork }) => {
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {!artwork
            ? null
            : artwork.map(({ node: { frontmatter: { id, image, date, title } } }, i) => (
                <div className="art-gallery column is-6 is-4-fullhd" key={id}>
                  <p>
                    <Link /*to={art.fields.slug}*/>
                      <figure className="art image is-square">
                        <img src={image} />
                      </figure>
                    </Link>
                  </p>
                  <p className="info">
                    <small>{date}</small>
                    <br />
                    <Link className="has-text-primary" /*to={art.fields.slug}*/>{title}</Link>
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

HomePageTemplate.propTypes = {
  artwork: PropTypes.array
};

const HomePage = ({ data }) => {
  const artwork = data.artwork.edges;
  return <HomePageTemplate artwork={artwork} />;
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default HomePage;

export const homePageQuery = graphql`
  query HomePage {
    artwork: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "art-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            image
          }
        }
      }
    }
  }
`;
