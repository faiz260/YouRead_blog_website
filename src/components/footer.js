import React from "react"
import {
  footer,
  section,
  title,
  social_icon,
  links,
  links_span,
  contact_info,
  contact_icons,
  contact_span,
  info_section,
} from "./footer.module.css"
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF"
import { AiOutlineInstagram } from "@react-icons/all-files/ai/AiOutlineInstagram"
import { GrTwitter } from "@react-icons/all-files/gr/GrTwitter"
import { MdLocationOn } from "@react-icons/all-files/md/MdLocationOn"
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt"
import { MdEmail } from "@react-icons/all-files/md/MdEmail"
import { Link } from "gatsby"

function Footer() {
  return (
    <div className={footer}>
      <div className={section}>
        <h1 className={title}>
          You<span>Read</span>.
        </h1>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts.
        </p>
        <span>
          <FaFacebookF className={social_icon} />
          <AiOutlineInstagram className={social_icon} />
          <GrTwitter className={social_icon} />
        </span>
      </div>
      <div className={section}></div>
      <div className={info_section}>
        <h3>Information</h3>
        <span className={links_span}>
          <Link className={links} to="/">
            {">"}
            <span>Home </span>
          </Link>
          <Link className={links} to="/">
            {">"}
            <span>Blogs</span>
          </Link>
          <Link className={links} to="/">
            {">"}
            <span>Register</span>
          </Link>
          <Link className={links} to="/">
            {">"}
            <span>Login</span>
          </Link>
        </span>
      </div>
      <div className={section}>
        <h3>Have a Question?</h3>
        <span className={contact_span}>
          <MdLocationOn className={contact_icons} />
          <p className={contact_info}>
            {" "}
            203 Fake St. Mountain View, San Francisco, California, USA
          </p>
        </span>
        <span className={contact_span}>
          <FaPhoneAlt className={contact_icons} />
          <p className={contact_info}> 123-456-789</p>
        </span>
        <span className={contact_span}>
          <MdEmail className={contact_icons} />
          <p className={contact_info}> youreadhelp@gmail.com</p>
        </span>
      </div>
    </div>
  )
}

export default Footer
