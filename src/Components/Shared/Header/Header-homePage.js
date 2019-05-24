import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Header.scss';

import LogoScanrWhiteSVG from '../../Shared/svg/logo-scanr-blue';


const Header = (props) => {
  const frActive = (props.language === 'fr') ? classes.ActiveLink : '';
  const enActive = (props.language === 'en') ? classes.ActiveLink : '';

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.Header}>
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${classes["has-background-white"]}`}>
          <ScrollLogo />
          <a className="navbar-brand" href="/">
            <LogoScanrWhiteSVG fill="#003259" height="40px" width="160px" />
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
                  className={`dropdown-toggle ${classes.Link}`}
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FormattedHTMLMessage
                    id="Header.link.about"
                    defaultMessage="Header.link.about"
                  />
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className={classes.Link} href="/recherche/all">
                  <FormattedHTMLMessage
                    id="Header.link.search"
                    defaultMessage="Header.link.search"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className={classes.Link} href="/focus">
                  <FormattedHTMLMessage
                    id="Header.link.focus"
                    defaultMessage="Header.link.focus"
                  />
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className={classes.Link} href="#">
                  <FormattedHTMLMessage
                    id="Header.link.cookies"
                    defaultMessage="Header.link.cookies"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className={classes.Link} href="#">
                  <FormattedHTMLMessage
                    id="Header.link.share"
                    defaultMessage="Header.link.share"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`${classes.Link} ${frActive}`}
                  onClick={() => props.switchLanguage('fr')}
                  onKeyPress={() => props.switchLanguage('fr')}
                  role="button"
                  tabIndex={0}
                >
                  FR
                </a>
                <span className={classes.PipeLink}>|</span>
                <a
                  className={`${classes.Link} ${enActive}`}
                  onClick={() => props.switchLanguage('en')}
                  onKeyPress={() => props.switchLanguage('fr')}
                  role="button"
                  tabIndex={0}
                >
                  EN
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </IntlProvider>
  );
};

class ScrollLogo extends React.Component {
  handleScroll = (e) => {
    console.log('onScroll');
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
    }
    console.log('scrollHeight:', element.scrollHeight);
    console.log('scrollTop:', element.scrollTop);
    console.log('clientHeight:', element.clientHeight);
  }

  render() {
    return (
      <div className="content-container" onScroll={() => this.handleScroll()}>
        <img
          className={`img-thumbnail ${classes.img}`}
          src="./img/logo-ministere.svg"
          alt="logo ministère"
        />
      </div>
    );
  }
}


export default Header;

Header.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};

ScrollLogo.propTypes = {
  scrollStepInPx: PropTypes.number,
};
