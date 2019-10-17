import React, { useState, Fragment } from "react";
import "../styles/index.sass";
import useKeyboardNavigation from "../components/useKeyboardNavigation";
import Nav from "../components/Nav";
import MainContent from "../components/MainContent";
import LoadingScreen from "../components/LoadingScreen";
import SEO from "../components/seo";

const LandingPage = () => {
  useKeyboardNavigation(); // Accessibility functionality
  const [mountLoadingScreen, setMountLoadingScreen] = useState(false);

  return (
    <Fragment>
      <SEO title="@joinroot" />
      <Nav />
      <MainContent handleClick={() => setMountLoadingScreen(true)} />
      {mountLoadingScreen && <LoadingScreen />}
    </Fragment>
  );
};

export default LandingPage;
