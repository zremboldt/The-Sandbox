import React from "react";
// import jestLogo from "../images/jestLogo.svg";
import IconQuote from "../images/IconQuote";
// import IconCode from "../images/IconCode";
// import IconResume from "../images/IconResume";
// import IconPersonalSite from "../images/IconPersonalSite";

const Main = () => (
  <main className="main">
    <section className="sectionBio">
      <div className="card">
        <div className="avatar"></div>
        <h2>Bio</h2>
        <p>
          I am a self-taught Front end web developer with a 10 year background
          in visual design. Over the past 4 years I’ve gone from zero
          programming experience to designing, developing &amp; deploying
          production web apps for my current employer, one of which recently
          generated over 3/4 of a million dollars in just its first year!
        </p>
      </div>
    </section>

    <section className="sectionWorkWithMe">
      <div className="card">
        <h2>What’s it like to work with me?</h2>
        <p>
          I am a driven self starter. God has blessed me with talent and ideas.
          I work hard and have a history of excelling wherever I put my focus.
          I’ve been acknowledged by senior leadership for successfully
          influencing/ leading technical and visual direction, inspiring
          forward-thinking, ideas and fostering growth/ unity among teams. Below
          are a few quotes from my performance reviews over the past couple of
          years.
        </p>
      </div>
      <div className="card quoteCard">
        <IconQuote />
        <p className="quoteText marBot2">
          Zac produces excellent results. <br />
          It doesn’t matter if it’s a design project or a new area such as
          video. He continually blows expectations away.
        </p>
        <p>Andrew Braun - Director of Marketing</p>
      </div>
      <div className="card quoteCard">
        <IconQuote />
        <p className="quoteText marBot2">
          Responsive, helpful, thinks about and researches relevant details.
          Gathers data before making decisions. Zac is always positive and
          enthusiastic.
        </p>
        <p>Jackie Lopez – Marketing Manager</p>
      </div>
      <div className="card quoteCard">
        <IconQuote />
        <p className="quoteText marBot2">
          Critical judgement is a strong point – able to process complex info
          and suggests improvement to current approaches. Seeks information to
          make decisions. I love Zac’s initiative and willingness to take on and
          learn new things.
        </p>
        <p>Jackie Lopez – Marketing Manager</p>
      </div>
    </section>

    <section className="sectionTools">
      <div className="card">
        <h2>Preferred tools</h2>
        <ul>
          <li className="line">
            <p>ES6/7+</p>
            <p>Express</p>
          </li>
          <li className="line">
            <p>React</p>
            <p>Sass</p>
          </li>
          <li className="line">
            <p>Gatsby.js</p>
            <p>GraphQL (Apollo client)</p>
          </li>
          <li className="line">
            <p>Jest</p>
            <p>Netlify</p>
          </li>
          <li className="line">
            <p>Node.js</p>
            <p>MongoDB</p>
          </li>
        </ul>
      </div>
    </section>

    <section className="sectionExperience">
      <div className="card">
        <h2>Other experience</h2>
        <ul>
          <li className="line">
            Animation using GSAP, React Spring, or pure CSS
          </li>
          <li className="line">
            CMS data modeling using Contentful, GraphCMS, and Sanity.io
          </li>
          <li className="line">
            Strong skills with the Adobe suite (e.g. Photoshop/ Illustrator/ XD/
            AfterEffects), Figma, and working with SVG
          </li>
          <li className="line">
            Visual design, layout, prototyping, user testing, etc. (UI, UX)
          </li>
          <li className="line">
            Currently exploring some of the amazing possibilities afforded by
            WebGL using three.js
          </li>
        </ul>
      </div>
    </section>

    <section className="sectionWhatNext">
      <div className="card">
        <h2>What’s next?</h2>
        <ol>
          <li>
            Take a look at www.zacremboldt.com (links to my resume, GitHub,
            CodePen, etc.)
          </li>
          <li>Like what you see? Give me a call: (620) 266-6987</li>
        </ol>
      </div>
    </section>
  </main>
);

export default Main;
