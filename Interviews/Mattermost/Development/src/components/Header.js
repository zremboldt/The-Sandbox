// import React, { useState, useEffect } from "react";
import React from "react";
// import ImgStar from "../images/ImgStar";
// import plate from "../images/plate.svg";

const PageHead = () => {
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => setLoaded(true), []);

  return (
    <div className="header">
      <div className="headerBg"></div>
      {/* <span>header</span> */}
    </div>
  );

  // return (
  //   <header className="header">
  //     <div className="ctrTop">
  //       <div className="starsWrapTop">
  //         <div className="starSVG starLg top1">
  //           <ImgStar />
  //         </div>
  //         <div className="starSVG starLg top2">
  //           <ImgStar />
  //         </div>
  //         <div className="starSVG starSm top3">
  //           <ImgStar />
  //         </div>
  //       </div>
  //     </div>

  //     <img
  //       className={`plateSVG ${loaded ? "flipPlate" : null}`}
  //       src={plate}
  //       alt="License plate - says, I heart Root"
  //     />

  //     <div className="ctrBottom">
  //       <div className="starsWrapBottom">
  //         <div className="starSVG starLg bottom1">
  //           <ImgStar />
  //         </div>
  //         <div className="starSVG starSm bottom2">
  //           <ImgStar />
  //         </div>
  //       </div>
  //     </div>
  //   </header>
  // );
};

export default PageHead;
