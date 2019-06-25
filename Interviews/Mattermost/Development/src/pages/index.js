import React from "react";
import "../styles/index.sass";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SEO from "../components/seo";

const IndexPage = () => (
  <>
    <SEO title="Home" />

    <Header />
    <Main />
    <Footer />
  </>
);

export default IndexPage;
