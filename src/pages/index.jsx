import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import TransitionImage from "../components/TransitionImage/TransitionImage"

import "../styles/index.scss"

const IndexPage = ({ data }) => {
  return (
    <main className="index">
      <SEO title="Catch a Donk!" />
      <section className="index__message">
        <h1>Catch a donkey!</h1>
        <h1>
          By:{" "}
          <a
            target="__blank"
            noopener="true"
            noreferrer="true"
            href="https://github.com/camvaz"
          >
            Victor Campos
          </a>{" "}
          👨‍💻
        </h1>
      </section>
      <section className="index__transition-container">
        {data?.allFile?.edges?.map(({ node }, index) => (
          <TransitionImage
            key={index}
            image={node?.childImageSharp?.fluid}
            index={index}
          />
        ))}
      </section>
    </main>
  )
}

export const query = graphql`
  query IndexPageQuery {
    allFile {
      edges {
        node {
          childImageSharp {
            fluid(maxHeight: 180, maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
