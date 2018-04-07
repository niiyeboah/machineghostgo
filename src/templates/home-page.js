import React from "react";
import Link from "gatsby-link";
import PropTypes from "prop-types";

import Image from "../components/Image";

export const HomePageTemplate = ({ artwork, images, closeMenu, transition }) => {
  const artworkSizes = {};
  images.map(image => {
    const regex = /\/img\/.*\.jpg/;
    const path = regex.exec(image.node.id);
    const key = path && path[0];
    artworkSizes[key] = image.node.sizes;
  });
  console.log(artwork, artworkSizes);
  return (
    <section className="section home-page" style={transition && transition.style}>
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
                      <Image src={artworkSizes[image]} className="art" />
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

class HomePage extends React.Component {
  componentDidMount() {
    this.props.setArtPost(false);
  }

  render() {
    const { data, closeMenu, transition } = this.props;
    return (
      <HomePageTemplate
        {...{ transition, closeMenu }}
        artwork={data.artwork.edges}
        images={data.images.edges}
      />
    );
  }
}

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
    images: allImageSharp {
      edges {
        node {
          id
          sizes(maxWidth: 640) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }
  }
`;
