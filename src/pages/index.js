import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {
  header_hero,
  home_body,
  content_card,
  card_image,
  blog_title,
  publish_date,
  excerpt,
  desc,
  explore_button,
} from "./index.module.css"
import { AuthContext } from "../context/auth"

const IndexPage = () => {
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

  return (
    <Layout>
      <Seo title="Home" />
      <div className={header_hero}>
        <p>Hello Welcome To</p>
        <h1>YouRead Blog</h1>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
        </p>
      </div>

      <div className={home_body}>
        <ul>
          {data.allContentfulBlogPost.edges.map(data => {
            return (
              <li key={data.node.id} className={content_card}>
                <Link to={`/blogs/${data.node.slug}/`}>
                  <span>
                    {data.node.featuredImage && (
                      <GatsbyImage
                        image={getImage(data.node.featuredImage)}
                        alt={data.node.title}
                        className={card_image}
                      />
                    )}
                  </span>
                  <span className={desc}>
                    <h2>
                      <Link
                        to={`/blogs/${data.node.slug}`}
                        className={blog_title}
                      >
                        {data.node.title}
                      </Link>
                    </h2>

                    <div>
                      <span className={publish_date}>
                        Posted on {data.node.publishedDate}
                      </span>
                    </div>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        <div>
          <Link to="/blogs">
            <button className={explore_button}>Explore More</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
