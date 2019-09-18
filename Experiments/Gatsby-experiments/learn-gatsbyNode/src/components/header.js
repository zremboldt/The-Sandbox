import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import hustlerLogo from "../images/HustlerLogo_OnWhite.svg"

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="wrap ctr__header">
      <Link to="/">
        <img className="hustlerLogo" src={hustlerLogo} alt="" />
      </Link>
      <Link to="/products/">Products</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

