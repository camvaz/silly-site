import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <main className="not-found">
    <SEO title="Not Found" />
    <h1 style={{ color: "#fff" }}>
      theres nothing here :({" "}
      <Link style={{ color: "#fff" }} to="/">
        Back to home :)
      </Link>
    </h1>
  </main>
)

export default NotFoundPage
