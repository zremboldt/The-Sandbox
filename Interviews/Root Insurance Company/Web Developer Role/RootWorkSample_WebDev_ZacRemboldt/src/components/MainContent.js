import React from "react";
import trophy from "../images/trophy.svg";
import caret from "../images/caret.svg";

const SplashScreen = ({ handleClick }) => (
  <main className="main">
    {/* Left Container */}
    <div className="ctr-left">
      <div className="cta-getYourQuote">
        <img className="icon-trophy" src={trophy} alt="Trophy Icon" />
        <h4>Good drivers save with Root.</h4>
        <p className="p1">You could save 52% on car insurance.</p>
        <button className="btn-primary" onClick={handleClick}>
          Get your Quote
        </button>
        <img
          className="icon-caret"
          src={caret}
          alt="Arrow pointing up to button"
        />
      </div>
    </div>
    {/* Right Container */}
    <figure className="ctr-right" role="img" aria-label="Accent illustration" />
  </main>
);

export default SplashScreen;
