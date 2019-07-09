import React, { useState, useEffect } from "react"
import "../styles/index.sass"
import { useInView } from "react-intersection-observer"
import { birdData } from "../content/birdData"
import leaves from "../images/leaves.svg"
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
            return birdToLowerCase.includes(searchQuery.toLowerCase())
          })
        )
  }, [searchQuery])

  const [ref, atTop] = useInView({
    /* Optional options */
    root: null, // 'null' sets it to default value: viewport
    rootMargin: "0px 0px -99.8%", // I'm adding 600px to the top of the bounds, 0 to sides and 0 to bottom.
    threshold: 0.01, // isIntersecting triggers when 90% of observed object is visible.
  })

  return (
    <>
      <SEO title="Home" />
      <div className="header">
        <div className="heroText">
          <h1>199</h1>
          <h2>Birds</h2>
        </div>
      </div>
      <div className={`searchBar ${atTop ? "barActive" : ""}`} ref={ref}>
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <main className="main">
        {birdsList.length > 0 && (
          <img className="imgLeaves" src={leaves} alt="" />
        )}
        {birdsList.length === 0 && (
          <div className="noMatchMessage">
            <h1>No Matches</h1>
            <p>There aren't any birds that match your search.</p>
          </div>
        )}
        <section id="sectionRainforest">
          <div className="grid">
            {birdsList.map((bird, i) => (
              <Card {...bird} key={i} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default IndexPage
