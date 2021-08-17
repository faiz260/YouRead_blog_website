import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "Do MMMM, YYYY")
      featuredImage {
        fluid(maxWidth: 750) {
          ...GatsbyContentfulFluid
        }
        gatsbyImageData(width: 300, placeholder: BLURRED, formats: AUTO)
      }
      body {
        body
      }
    }
  }
`

const BlogPost = props => {
  console.log("PROPS >>>>>>>>> ", props)
  const image = getImage(props.data.contentfulBlogPost.featuredImage)

  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} />
      <Link to="/blogs/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulBlogPost.publishedDate}
        </span>

        <GatsbyImage image={image} alt={props.data.contentfulBlogPost.title} />

        {props.data.contentfulBlogPost.body.body}
      </div>
    </Layout>
  )
}

export default BlogPost
