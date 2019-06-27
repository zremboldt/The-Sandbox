import React from "react";
import { useInView } from "react-intersection-observer";
import IconQuote from "../images/IconQuote";
import accentLg from "../images/accent-big-square.svg";
import accentSm from "../images/accent-small-square.svg";

const Main = () => {
  const [ref1, inView1] = useInView({
    /* Optional options */
    root: null, // 'null' sets it to default value: viewport
    rootMargin: "600px 0px 0px", // I'm adding 600px to the top of the bounds, 0 to sides and 0 to bottom.
    threshold: 0.4, // isIntersecting triggers when 90% of observed object is visible.
  });
  const [ref2, inView2] = useInView({
    rootMargin: "600px 0px 0px",
    threshold: 0.4,
  });
  const [ref3, inView3] = useInView({
    rootMargin: "600px 0px 0px",
    threshold: 0.4,
  });
  const [ref4, inView4] = useInView({
    rootMargin: "600px 0px 0px",
    threshold: 0.4,
  });
  const [ref5, inView5] = useInView({
    rootMargin: "600px 0px 0px",
    threshold: 0.3,
  });
  const [ref6, inView6] = useInView({
    rootMargin: "600px 0px 0px",
    threshold: 0.3,
  });
  const [ref7, inView7] = useInView({
    rootMargin: "600px 0px 0px",
    threshold: 0,
  });

  return (
    <main className="main">
      <section className="sectionBio">
        <div className="card">
          <div className="avatar" />
          <h2>Bio</h2>
          <p>
            I am a self-taught Front end web developer with a 10 year background
            in visual design. Over the past 4 years I’ve gone from zero
            programming experience to designing, developing &amp; deploying
            production web apps for my current employer, one of which recently
            generated nearly one million dollars in just its first year!
          </p>
        </div>
      </section>

      <section className="sectionWorkWithMe">
        <img className="accentSquare" src={accentLg} alt="" />
        <div ref={ref1} className={`card ${inView1 ? "" : "hide"}`}>
          <h2>What’s it like to work with me?</h2>
          <p>
            I am a driven self starter. God has blessed me with talent and
            ideas. I work hard and have a history of excelling wherever I put my
            focus. I’ve been acknowledged by senior leadership for successfully
            influencing/ leading technical and visual direction, inspiring
            forward-thinking, ideas and fostering growth/ unity among teams.
            Below are a few quotes from my performance reviews over the past
            couple of years.
          </p>
        </div>

        <div ref={ref2} className={`card quoteCard ${inView2 ? "" : "hide"}`}>
          <IconQuote />
          <p className="quoteText marBot2">
            Zac produces excellent results. <br />
            It doesn’t matter if it’s a design project or a new area such as
            video. He continually blows expectations away.
          </p>
          <p>Andrew Braun - Director of Marketing</p>
        </div>

        <div ref={ref3} className={`card quoteCard ${inView3 ? "" : "hide"}`}>
          <IconQuote />
          <p className="quoteText marBot2">
            Responsive, helpful, thinks about and researches relevant details.
            Gathers data before making decisions. Zac is always positive and
            enthusiastic.
          </p>
          <p>Jackie Lopez – Marketing Manager</p>
        </div>

        <div ref={ref4} className={`card quoteCard ${inView4 ? "" : "hide"}`}>
          <IconQuote />
          <p className="quoteText marBot2">
            Critical judgement is a strong point – able to process complex info
            and suggests improvement to current approaches. Seeks information to
            make decisions. I love Zac’s initiative and willingness to take on
            and learn new things.
          </p>
          <p>Jackie Lopez – Marketing Manager</p>
        </div>
      </section>

      <section className="sectionTools">
        <img className="accentSquare" src={accentSm} alt="" />
        <div ref={ref5} className={`card ${inView5 ? "" : "hide"}`}>
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
        <img className="accentSquare" src={accentLg} alt="" />
        <div ref={ref6} className={`card ${inView6 ? "" : "hide"}`}>
          <h2>Other experience</h2>
          <ul>
            <li className="line">
              Animation using GSAP, React Spring, or pure CSS
            </li>
            <li className="line">
              CMS data modeling using Contentful, GraphCMS, and Sanity.io
            </li>
            <li className="line">
              Strong skills with the Adobe suite (e.g. Photoshop/ Illustrator/
              XD/ AfterEffects), Figma, and working with SVG
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
        <div ref={ref7} className={`card ${inView7 ? "" : "hide"}`}>
          <h2>What’s next?</h2>
          <ol>
            <li>
              Take a look at{" "}
              <a href="https://www.zacremboldt.com/">www.zacremboldt.com</a>
              <p className="caption">
                (links to my resume, GitHub, CodePen, etc.)
              </p>
            </li>
            <li>
              Like what you see? Give me a call.{" "}
              <strong style={{ whiteSpace: "nowrap" }}>(620) 266-6987</strong>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
};

export default Main;
