import React, { useState, useEffect } from "react";
import "../styles/index.sass";
import { useInView } from "react-intersection-observer";
import { birdData } from "../content/birdData";
import ImgLeaves from "../images/ImgLeaves";
import Card from "../components/Card";
import SEO from "../components/seo";

const IndexPage = () => {
  const [birdsList, setBirdsList] = useState(birdData);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    searchQuery === ""
      ? setBirdsList(birdData)
      : setBirdsList(
          birdData.filter(data => {
            const birdToLowerCase = data.name.toLowerCase();
            return birdToLowerCase.includes(searchQuery.toLowerCase());
          })
        );
  }, [searchQuery]);

  const [ref, atTop] = useInView({
    /* Optional options */
    root: null, // 'null' sets it to default value: viewport
    rootMargin: "0px 0px -99.8%", // This makes the root a very tiny sliver across the top of the page.
    threshold: 0.01, // atTop triggers when at least .01% of the observed object is visible.
  });

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
          placeholder="Search"
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="searchBG" ref={ref}></div>
      </fieldset>

      <nav>
        <button classname="btnMeadows">Gardens &amp; meadows</button>
        <button classname="btnRivers">Rivers &amp; lakes</button>
        <button classname="btnSea">Sea birds</button>
        <button classname="btnDesert">Desert birds</button>
        <button classname="btnAustralia">Australian birds</button>
        <button classname="btnSavanna">Savanna birds</button>
        <button classname="btnIce">Ice &amp; snow</button>
        <button classname="btnRainforest">Rainforest birds</button>
        <button classname="btnForest">Forest &amp; woodlands</button>
        <button classname="btnFarm">Farm birds</button>
        <button classname="btnPets">Pet birds</button>
        <button classname="btnBirdsOfPrey">Birds of prey</button>
        <button classname="btnNight">Night birds</button>
      </nav>

      <main>
        {birdsList.length === 0 && (
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

        {birdsList.length > 0 && (
          <picture className="imgLeaves imgLeavesBottom">
            <ImgLeaves />
          </picture>
        )}

        <section id="sectionRainforest">
          <div className="grid">
            {birdsList.map((bird, i) => (
              <Card {...bird} key={i} />
            ))}
          </div>
        </section>
      </main>

      {birdsList.length > 0 && <footer></footer>}
    </div>
  );
};

export default IndexPage;
