import React, { useContext } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../GlobalContext';
/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Header.scss';

import LogoScanrWhiteSVG from '../svg/logo-scanr-blue';


const Header = () => {
  const context = useContext(GlobalContext);

  const frActive = (context.language === 'fr') ? classes.ActiveLink : '';
  const enActive = (context.language === 'en') ? classes.ActiveLink : '';

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={context.language} messages={messages[context.language]}>
      <section className={classes.Header}>
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${classes['has-background-white']}`}>
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
                  onClick={() => context.switchLanguage('fr')}
                  onKeyPress={() => context.switchLanguage('fr')}
                  role="button"
                  tabIndex={0}
                >
                  FR
                </a>
                <span className={classes.PipeLink}>|</span>
                <a
                  className={`${classes.Link} ${enActive}`}
                  onClick={() => context.switchLanguage('en')}
                  onKeyPress={() => context.switchLanguage('en')}
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
export default Header;
