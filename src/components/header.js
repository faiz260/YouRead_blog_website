import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"
import { AuthContext } from "../context/auth"
import firebase from "gatsby-plugin-firebase"
import {
  header_div,
  title,
  link,
  menu_icon,
  navbar,
  nav,
  navCollapse,
} from "./header.module.css"
import { RiMenu3Fill } from "@react-icons/all-files/ri/RiMenu3Fill"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav } from "react-bootstrap"

const options = [
  { name: "Home", link: "/" },
  { name: "Blogs", link: "/blogs" },
  { name: "Login", link: "/login" },
  { name: "Register", link: "/register" },
]
var handleSimpleClick = event => {
  return null
}
const handleLogout = async () => {
  await firebase.auth().signOut()
  navigate("/login")
}

const options2 = [
  { name: "Home", link: "/", handler: handleSimpleClick },
  { name: "Blogs", link: "/blogs", handler: handleSimpleClick },
  { name: "Logout", link: "/login", handler: handleLogout },
]

const Header = ({ siteTitle }) => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      firebase.auth().onAuthStateChanged(user => {
        // console.log("USER >>>> ", user.email)
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
          <Navbar className={navbar} expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className={navCollapse} id="basic-navbar-nav">
              <Nav className={nav}>
                {options.map(option => (
                  <Link to={option.link} className={link}>
                    {option.name}
                  </Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <Navbar className={navbar} expand="md">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className={navCollapse} id="basic-navbar-nav">
              <Nav className={nav}>
                {options2.map(option => (
                  <Link
                    to={option.link}
                    className={link}
                    onClick={option.handler}
                  >
                    {option.name}
                  </Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
