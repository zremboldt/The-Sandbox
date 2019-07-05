import React, { useState, useEffect } from "react"
import "../styles/index.sass"
import { birdData } from "../content/birdData"
import Card from "../components/Card"
import SEO from "../components/seo"

const IndexPage = () => {
  const [birdsList, setBirdsList] = useState(birdData)
  const [searchQuery, setSearchQuery] = useState("uck")

  useEffect(() => {
    searchQuery && // if searchQuery isn't falsy, set birdsList to whatever gets filtered.
      setBirdsList(
        birdData.filter(data => {
          return data.name.includes(searchQuery)
        })
      )
  }, [])

  return (
    <>
      <input type="text" onChange={e => setSearchQuery(e.target.value)} />
      <SEO title="Home" />
      <div className="header">
        <h1 className="titleText">199</h1>
        <h2 className="titleText">Birds</h2>
      </div>
      <main className="main">
        <div className="grid">
          {birdsList.map((bird, i) => (
            <Card {...bird} key={i} />
          ))}
        </div>
      </main>
    </>
  )
}

export default IndexPage
