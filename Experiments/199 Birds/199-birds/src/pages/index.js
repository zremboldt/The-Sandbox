import React, { useState, useEffect } from "react";
import "../styles/index.sass";
import { useInView } from "react-intersection-observer";
import { birdData } from "../content/birdData";
import ImgLeaves from "../images/ImgLeaves";
import Card from "../components/Card";
import SEO from "../components/seo";

const IndexPage = () => {
  // This list gets populated by birdsSelected and is then mapped over to display the birds.
  const [displayBirds, setDisplayBirds] = useState([]);

  //////////////////////////////////
  // Bird type selection (buttons)
  //////////////////////////////////
  const [birdsSelected, setBirdsSelected] = useState("rainforest");

  useEffect(() => {
    setDisplayBirds(
      birdData.filter(data => {
        return data.type.includes(birdsSelected);
      })
    );
  }, [birdsSelected]);

  const filterCategory = e => {
    if (e.target.nodeName === "BUTTON") setBirdsSelected(e.target.id);
  };

  //////////////////////////////////
  // Search
  //////////////////////////////////
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // If query is blank reset list to whatever category has been most recently selected.
    // Otherwise set it to birds whose names match the search query.
    searchQuery === ""
      ? setDisplayBirds(
          birdData.filter(data => {
            return data.type.includes(birdsSelected);
          })
        )
      : setDisplayBirds(
          birdData.filter(data => {
            const birdToLowerCase = data.name.toLowerCase();
            return birdToLowerCase.includes(searchQuery.toLowerCase());
          })
        );
  }, [searchQuery]);

  //////////////////////////////////
  // Triggers the search bar background to fade on/off
  //////////////////////////////////
  const [ref, atTop] = useInView({
    /* Optional options */
    root: null, // 'null' sets it to default value: viewport
    rootMargin: "0px 0px -99.8%", // This makes the root a very tiny sliver across the top of the page.
    threshold: 0.01, // atTop triggers when at least .01% of the observed object is visible.
  });

  //////////////////////////////////
  // ↓ Markup begins ↓
  //////////////////////////////////

  return (
    <div className="pageWrap">
      <SEO title="Home" />

      <picture className="imgLeaves imgLeavesTop">
        <ImgLeaves />
      </picture>

      <header className="heroText">
        <h1>199</h1>
        <h1>Birds</h1>
      </header>

      <fieldset
        className={`searchBar ${atTop ? "barActive" : ""}`}
        ref={ref}
        role="search"
      >
        <input
          className="searchInput"
          type="text"
          placeholder="Search all birds"
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="searchBG" ref={ref}></div>
      </fieldset>

      <nav onClick={filterCategory}>
        <button id="meadows">Gardens &amp; meadows</button>
        <button id="rivers">Rivers &amp; lakes</button>
        <button id="sea">Sea birds</button>
        <button id="desert">Desert birds</button>
        <button id="aussie">Australian birds</button>
        <button id="savanna">Savanna birds</button>
        <button id="snow">Ice &amp; snow</button>
        <button id="rainforest">Rainforest birds</button>
        <button id="woodlands">Forest &amp; woodlands</button>
        <button id="farm">Farm birds</button>
        <button id="pet">Pet birds</button>
        <button id="birdOfPrey">Birds of prey</button>
        <button id="night">Night birds</button>
      </nav>

      <main>
        {displayBirds.length === 0 && (
          <div className="noMatchMessage">
            <h1>No Matches</h1>
            <p>
              There aren't any birds that match your search.{" "}
              <span role="img" aria-label="sad face">
                😢
              </span>
            </p>
          </div>
        )}

        {displayBirds.length > 0 && (
          <picture className="imgLeaves imgLeavesBottom">
            <ImgLeaves />
          </picture>
        )}

        <section id="sectionRainforest">
          <div className="grid">
            {displayBirds.map((bird, i) => (
              <Card {...bird} key={i} />
            ))}
          </div>
        </section>
      </main>

      {displayBirds.length > 0 && <footer></footer>}
    </div>
  );
};

export default IndexPage;
