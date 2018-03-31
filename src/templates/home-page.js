import React from "react";
import Link from "gatsby-link";
// import Img from "gatsby-image";
import PropTypes from "prop-types";

export const HomePageTemplate = ({ artwork, closeMenu }) => {
  return (
    <section className="section">
      <div className="container is-fluid">
        <div className="columns is-multiline">
          {!artwork
            ? null
            : artwork.map(({ node: art }) => {
                const { id, fields: { slug }, frontmatter: { image, date, title } } = art;
                return (
                  <article
                    className="art-gallery column is-6 is-4-fullhd"
                    key={id}
                    onClick={closeMenu}
                  >
                    <Link to={slug}>
                      <figure className="art image is-square">
                        <img src={image} />
                      </figure>
                    </Link>
                    <div className="info">
                      <Link className="has-text-primary" to={slug}>
                        {title}
                      </Link>
                      <br />
                      <small>{date}</small>
                    </div>
                  </article>
                );
              })}
        </div>
      </div>
    </section>
  );
};

HomePageTemplate.propTypes = {
  artwork: PropTypes.array
};

const HomePage = ({ data, closeMenu, transition }) => {
  console.log(transition);
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
