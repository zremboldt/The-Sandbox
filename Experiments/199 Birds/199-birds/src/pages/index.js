import React from "react"
import "../styles/index.sass"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
import Card from "../components/Card"
// import Image from "../components/image"
import SEO from "../components/seo"

const birds = [
  {
    name: "Mandarin Duck",
    img: "IMG_8278.JPG",
    video: "https://youtu.be/3oYbCpxwECQ",
  },
  {
    name: "Flamingo",
    img: "IMG_8275.JPG",
    video: "https://youtu.be/3oYbCpxwECQ",
  },
  {
    name: "Eurasian Kingfisher",
    img: "IMG_8276.JPG",
    video: "https://youtu.be/3oYbCpxwECQ",
  },
  {
    name: "Mallard Duck",
    img: "IMG_8277.JPG",
    video: "https://youtu.be/3oYbCpxwECQ",
  },
]

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <main className="main">
      <h1 style={{ margin: "1rem 0" }}>199 Birds</h1>
      <div className="grid">
        {birds.map((bird, i) => (
          <Card {...bird} key={i} />
        ))}
      </div>
    </main>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </>
)

export default IndexPage
