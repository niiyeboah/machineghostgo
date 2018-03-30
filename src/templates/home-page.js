import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

export const HomePageTemplate = ({ artwork, closeMenu }) => {
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {!artwork
            ? null
            : artwork.map(({ node: art }) => (
                <article
                  className="art-gallery column is-6 is-4-fullhd"
                  key={art.id}
                  onClick={closeMenu}
                >
                  <Link to={art.fields.slug}>
                    <figure className="art image is-square">
                      <img src={art.frontmatter.image} />
                    </figure>
                  </Link>
                  <div className="info">
                    <small>{art.frontmatter.date}</small>
                    <br />
                    <Link className="has-text-primary" to={art.fields.slug}>
                      {art.frontmatter.title}
                    </Link>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
};

HomePageTemplate.propTypes = {
  artwork: PropTypes.array
};

const HomePage = ({ data, closeMenu }) => {
  return <HomePageTemplate artwork={data.artwork.edges} closeMenu={closeMenu} />;
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
