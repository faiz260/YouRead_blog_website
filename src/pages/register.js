import React, { useState, useContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import firebase from "gatsby-plugin-firebase"
import { AuthContext } from "../context/auth"
import { navigate } from "gatsby"
import {
  register_body,
  register_card,
  form,
  submit_button,
  input_field,
  title,
  register_content,
} from "./register.module.css"

function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
  })

  const { setUser } = useContext(AuthContext)

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setData({ ...data, error: null })
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
      setUser(result)
      navigate("/")
    } catch (error) {
      console.log(error)
      setData({ ...data, error: error.message })
    }
  }

  return (
    <Layout>
      <SEO title="Register" />
      <div className={register_body}>
        <div className={register_content}>
          <h1>
            You<span>Read</span>. Blog
          </h1>
          <p>
            By submitting your information, you agreed to our terms of services and
            conditions.
          </p>
        </div>
        <div className={register_card}>
          <h1 className={title}>Register</h1>
          <form onSubmit={handleSubmit} className={form}>
            <div>
              <span>Email:</span>
              <br />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className={input_field}
              />
            </div>
            <div>
              <span>Password:</span>
              <br />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className={input_field}
              />
            </div>
            {data.error ? <p style={{ color: "red" }}>{data.error}</p> : null}
            <div>
              <input type="submit" value="Register" className={submit_button} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
