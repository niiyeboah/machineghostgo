const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const logErrors = errors => {
  if (errors) {
    errors.forEach(e => console.error(e.toString()));
    return Promise.reject(errors);
  }
};

exports.createLayouts = ({ boundActionCreators, graphql }) => {
  const { createLayout } = boundActionCreators;
  return graphql(`
    {
      layout: markdownRemark(frontmatter: { layout: { eq: true } }) {
        frontmatter {
          profilePic
          backgroundPic
          menuBackgroundPic
        }
      }
    }
  `).then(result => {
    const { profilePic, backgroundPic, menuBackgroundPic } = result.data.layout.frontmatter;
    const errors = logErrors(result.errors);
    if (errors) return errors;
    createLayout({
      component: path.resolve(`src/templates/custom-layout.js`),
      id: "custom",
      context: {
        profilePic: `/${profilePic}/`,
        backgroundPic: `/${backgroundPic}/`,
        menuBackgroundPic: `/${menuBackgroundPic}/`
      }
    });
  });
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  return graphql(`
    {
      pages: allMarkdownRemark(filter: { frontmatter: { layout: { ne: true } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              image
            }
          }
        }
      }
    }
  `).then(result => {
    const errors = logErrors(result.errors);
    if (errors) return errors;
    result.data.pages.edges.forEach(edge => {
      const { id, fields: { slug }, frontmatter: { templateKey, image } } = edge.node;
      createPage({
        path: slug,
        component: path.resolve(`src/templates/${String(templateKey)}.js`),
        context: { id, image: `/${image}/` },
        layout: "custom"
      });
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({ name: `slug`, node, value });
  }
};

exports.onCreatePage = async ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    page.layout = "custom";
    createPage(page);
    resolve();
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /webfontloader.js/,
      loader: "null-loader"
    });
  }
};
