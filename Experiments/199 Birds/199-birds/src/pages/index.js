import React from "react"
import "../styles/index.sass"
import { birdData } from "../content/birdData"
import Card from "../components/Card"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <div className="header">
        <h1 className="titleText">199</h1>
        <h2 className="titleText">Birds</h2>
      </div>
      <main className="main">
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
