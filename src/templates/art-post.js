import React from "react";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const ArtPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  image,
  helmet
}) => {
  const PostContent = contentComponent || Content;
  return (
    <article>
      {helmet || ""}
      <div className="container is-fluid content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default props => {
  const { markdownRemark: post } = props.data;
  const siteTitle = props.data.site.siteMetadata.title;
  return (
    <ArtPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${siteTitle} | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
    />
  );
};

export const pageQuery = graphql`
  query ArtPostByID($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image
      }
    }
  }
`;
