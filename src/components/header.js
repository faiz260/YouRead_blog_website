import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import { AuthContext } from "../context/auth"
import firebase from "gatsby-plugin-firebase"
import { header_div, title, link } from "./header.module.css"

const Header = ({ siteTitle }) => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      firebase.auth().onAuthStateChanged(user => {
        console.log("USER >>>> ", user.email)
      })
    } else {
      return null
    }
  }, [])

  const handleLogout = async () => {
    await firebase.auth().signOut()
    navigate("/login")
  }
  return (
    <header>
      <div className={header_div}>
        <h1 style={{ margin: 0 }}>
          <Link to="/" className={title}>
            You<span>Read</span>.
          </Link>
        </h1>

        {!user ? (
          <span>
            <Link to="/" className={link}>
              Home
            </Link>
            <Link to="/blogs" className={link}>
              Blogs
            </Link>
            <Link to="/register" className={link}>
              Register
            </Link>
            <Link to="/login" className={link}>
              Login
            </Link>
          </span>
        ) : (
          <span>
            <Link to="/blogs" className={link}>
              Blogs
            </Link>
            <p onClick={handleLogout}>
              <Link to="#!" className={link}>
                Logout
              </Link>
            </p>
          </span>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
