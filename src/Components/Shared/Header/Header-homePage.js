import React from 'react';

import classes from './Header.scss';

const Header = () => (
  <section className={classes.Header}>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        ScanR_Icon
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              A propos
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Recherche
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Focus
            </a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Gestion des cookies
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Partage
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              FR|EN
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </section>
);

export default Header;
