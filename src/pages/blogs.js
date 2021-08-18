import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { AuthContext } from "../context/auth"
import {
  header_hero,
  hero_desc,
  blogs_body,
  card,
  blog_title,
  card_image,
  excerpt,
  published_date,
  link,
  link_icon,
  button_div,
  login_button,
} from "./blogs.module.css"
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight"
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

  return (
    <Layout>
      <Seo title="Blog" />
      <div className={header_hero}>
        <h1>YouRead Blog</h1>
        <p className={hero_desc}>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.
        </p>
      </div>
      <div className={blogs_body}>
        {!user ? (
          <div>
            <ul>
              {data.allContentfulBlogPost.edges.slice(0, 3).map(data => {
                return (
                  <li key={data.node.id} className={card}>
                    {data.node.featuredImage && (
                      <GatsbyImage
                        image={getImage(data.node.featuredImage)}
                        alt={data.node.title}
                        className={card_image}
                      />
                    )}
                    <span>
                      <h2>
                        <Link
                          to={`/blogs/${data.node.slug}`}
                          className={blog_title}
                        >
                          {data.node.title}
                        </Link>
                      </h2>
                      <p className={excerpt}>{data.node.excerpt.excerpt}</p>
                      <div>
                        <span className={published_date}>
                          Posted on {data.node.publishedDate}
                        </span>
                      </div>
                      <div className="button">
                        <Link to={`/blogs/${data.node.slug}/`} className={link}>
                          <AiOutlineArrowRight className={link_icon} /> Read
                          More
                        </Link>
                      </div>
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className={button_div}>
              <Link to="/login">
                <button className={login_button}>Login to continue</button>
              </Link>
            </div>
          </div>
        ) : (
          <ul>
            {data.allContentfulBlogPost.edges.map(data => {
              return (
                <li key={data.node.id} className={card}>
                  {data.node.featuredImage && (
                    <GatsbyImage
                      image={getImage(data.node.featuredImage)}
                      alt={data.node.title}
                      className={card_image}
                    />
                  )}
                  <span>
                    <h2>
                      <Link
                        to={`/blogs/${data.node.slug}`}
                        className={blog_title}
                      >
                        {data.node.title}
                      </Link>
                    </h2>
                    <p className={excerpt}>{data.node.excerpt.excerpt}</p>
                    <div>
                      <span className={published_date}>
                        Posted on {data.node.publishedDate}
                      </span>
                    </div>
                    <div className="button">
                      <Link to={`/blogs/${data.node.slug}/`} className={link}>
                        <AiOutlineArrowRight className={link_icon} /> Read More
                      </Link>
                    </div>
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Layout>
  )
}

export default Blog
