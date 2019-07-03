import React from "react"
import "../styles/index.sass"
import { birdData } from "../content/birdData"
import Card from "../components/Card"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <main className="main">
        <h1 style={{ margin: "1rem 0" }}>...</h1>

        <div className="grid">
          {birdData.map((bird, i) => (
            <Card {...bird} key={i} />
          ))}
        </div>
      </main>
    </>
  )
}

export default IndexPage
