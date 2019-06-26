// import React, { useState, useEffect } from "react";
import React from "react";

const PageHead = () => {
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => setLoaded(true), []);

  return (
    <div className="header">
      <div className="ctrIntro">
        <h1>Hello, Mattermost!</h1>
        <h1>I’m Zac.</h1>
        <p className="p1">
          I’m looking to join a team of smart, passionate individuals doing
          high-end work and Mattermost looks like a great fit!
        </p>
      </div>
      <div className="headerBg"></div>
    </div>
  );
};

export default PageHead;
