import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { AuthContext } from "../context/auth"

const Blog = () => {
  const { user } = useContext(AuthContext)

  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: publishedDate, order: DESC }) {
          edges {
            node {
              title
              id
              slug
              publishedDate(formatString: "DD MMMM, YYYY")
              featuredImage {
                fluid(maxWidth: 750) {
                  ...GatsbyContentfulFluid
                }
                gatsbyImageData(width: 300, placeholder: BLURRED, formats: AUTO)
              }
              excerpt {
                excerpt
              }
            }
          }
        }
      }
    `
  )
  console.log(data)
  // .slice(0, 3)

  return (
    <Layout>
      <Seo title="Blog" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>

      {!user ? (
        <ul>
          {data.allContentfulBlogPost.edges.slice(0, 1).map(data => {
            return (
              <li key={data.node.id}>
                <h2>
                  <Link to={`/blogs/${data.node.slug}`}>{data.node.title}</Link>
                </h2>
                <div>
                  <span>Posted on {data.node.publishedDate}</span>
                </div>
                {data.node.featuredImage && (
                  <GatsbyImage
                    image={getImage(data.node.featuredImage)}
                    alt={data.node.title}
                  />
                )}

                <p>{data.node.excerpt.excerpt}</p>
                <div className="button">
                  <Link to={`/blogs/${data.node.slug}/`}>Read More</Link>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <ul>
          {data.allContentfulBlogPost.edges.map(data => {
            return (
              <li key={data.node.id}>
                <h2>
                  <Link to={`/blogs/${data.node.slug}`}>{data.node.title}</Link>
                </h2>
                <div>
                  <span>Posted on {data.node.publishedDate}</span>
                </div>
                {data.node.featuredImage && (
                  <GatsbyImage
                    image={getImage(data.node.featuredImage)}
                    alt={data.node.title}
                  />
                )}

                <p>{data.node.excerpt.excerpt}</p>
                <div className="button">
                  <Link to={`/blogs/${data.node.slug}/`}>Read More</Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default Blog
