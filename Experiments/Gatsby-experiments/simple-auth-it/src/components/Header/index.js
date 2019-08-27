import React from 'react';
import { Link } from 'gatsby';
import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles[`header__wrap`]}>
      <h1 className={styles[`header__heading`]}>
        <Link
          to="/"
          className={`${styles[`header__link`]} ${
            styles[`header__link--home`]
          }`}
        >
          LOGO
        </Link>
      </h1>
      <nav role="main" className={styles[`header__nav`]}>
        <Link to="/" className={styles[`header__link`]}>
          Login
        </Link>
        <Link to="/support" className={styles[`header__link`]}>
          Support
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
