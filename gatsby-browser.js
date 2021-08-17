import React from "react"
import "firebase/auth"
import AuthProvider from "./src/context/auth"

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)
