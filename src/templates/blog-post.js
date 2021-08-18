import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  blog_post,
  content,
  published_date,
  title,
  content_body,
  content_image,
} from "./blog-post.module.css"

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
      <div className={blog_post}>
        <div className={content}>
          <h1 className={title}>{props.data.contentfulBlogPost.title}</h1>
          <span className={published_date}>
            Posted on {props.data.contentfulBlogPost.publishedDate}
          </span>

          <GatsbyImage
            image={image}
            alt={props.data.contentfulBlogPost.title}
            className={content_image}
          />

          <p className={content_body}>
            {props.data.contentfulBlogPost.body.body}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
