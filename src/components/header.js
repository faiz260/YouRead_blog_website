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
  menu_item,
  menu,
  icon_button,
} from "./header.module.css"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { RiMenu3Fill } from "@react-icons/all-files/ri/RiMenu3Fill"

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
const ITEM_HEIGHT = 48

const Header = ({ siteTitle }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
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
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
            {window.innerWidth < 700 ? (
              <span>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <RiMenu3Fill className={menu_icon} />
                </IconButton>
                <Menu
                  className={menu}
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "20ch",
                      backgroundColor: "#ffd369",
                    },
                  }}
                >
                  {options.map(option => (
                    <Link to={option.link} className={link}>
                      <MenuItem
                        key={option.name}
                        selected={option.name === "Pyxis"}
                        onClick={handleClose}
                        className={menu_item}
                      >
                        {option.name}
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </span>
            ) : (
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
            )}
          </span>
        ) : (
          <span>
            {window.innerWidth < 700 ? (
              <span>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={icon_button}
                >
                  <RiMenu3Fill className={menu_icon} />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "20ch",
                      backgroundColor: "#ffd369",
                    },
                  }}
                  className={menu}
                >
                  {options2.map(option => (
                    <Link
                      to={option.link}
                      onClick={option.handler}
                      className={link}
                    >
                      <MenuItem
                        key={option.name}
                        selected={option.name === "Pyxis"}
                        onClick={handleClose}
                        className={menu_item}
                      >
                        {option.name}
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </span>
            ) : (
              <span>
                <Link to="/" className={link}>
                  Home
                </Link>
                <Link to="/blogs" className={link}>
                  Blogs
                </Link>
                <span onClick={handleLogout}>
                  <Link to="/login" className={link}>
                    Logout
                  </Link>
                </span>
              </span>
            )}
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
