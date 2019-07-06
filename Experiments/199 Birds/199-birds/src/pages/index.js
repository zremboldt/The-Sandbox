import React, { useState, useEffect } from "react"
import "../styles/index.sass"
import { birdData } from "../content/birdData"
import Card from "../components/Card"
import SEO from "../components/seo"

const IndexPage = () => {
  const [birdsList, setBirdsList] = useState(birdData)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    searchQuery === ""
      ? setBirdsList(birdData)
      : setBirdsList(
          birdData.filter(data => {
            const birdToLowerCase = data.name.toLowerCase()
            return birdToLowerCase.includes(searchQuery)
          })
        )
  }, [searchQuery])

  return (
    <>
      <input
        className="searchInput"
        type="text"
        onChange={e => setSearchQuery(e.target.value)}
      />
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
