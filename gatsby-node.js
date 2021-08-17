const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const response = await graphql(`
    {
      allContentfulBlogPost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  console.log(response)
  response.data.allContentfulBlogPost.edges.forEach(data => {
    createPage({
      path: `/blogs/${data.node.slug}`,
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        slug: data.node.slug,
      },
    })
  })
}
