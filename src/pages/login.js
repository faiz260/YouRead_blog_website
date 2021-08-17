import React, { useState, useContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import firebase from "gatsby-plugin-firebase"
import { AuthContext } from "../context/auth"
import { navigate } from "gatsby"

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
        .signInWithEmailAndPassword(data.email, data.password)
      setUser(result)
      navigate("/")
    } catch (error) {
      console.log(error)
      setData({ ...data, error: error.message })
    }
  }
  console.log("DATA >>> ", data)
  return (
    <Layout>
      <SEO title="Register" />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        {data.error ? <p style={{ color: "red" }}>{data.error}</p> : null}
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    </Layout>
  )
}

export default Register
