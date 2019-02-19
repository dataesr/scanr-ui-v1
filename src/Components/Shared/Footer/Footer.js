import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Footer.scss';


const Footer = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.Footer}>
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                src="./img/logo-ministere.svg"
                alt="Logo MESRI"
                className={classes.Logo}
              />
            </div>
            <div className="col">
              <ul>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.openData"
                      defaultMessage="Footer.link.openData"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.contribute"
                      defaultMessage="Footer.link.contribute"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.gitHub"
                      defaultMessage="Footer.link.gitHub"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.accessibility"
                      defaultMessage="Footer.link.accessibility"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.navHelp"
                      defaultMessage="Footer.link.navHelp"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.siteMap"
                      defaultMessage="Footer.link.siteMap"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.generalConditions"
                      defaultMessage="Footer.link.generalConditions"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.faq"
                      defaultMessage="Footer.link.faq"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.glossary"
                      defaultMessage="Footer.link.glossary"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FormattedHTMLMessage
                      id="Footer.link.contact"
                      defaultMessage="Footer.link.contact"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <div>
                <a href="#">
                  <FormattedHTMLMessage
                    id="Footer.link.ourBlog"
                    defaultMessage="Footer.link.ourBlog"
                  />
                </a>
              </div>
              <div>
                <FormattedHTMLMessage
                  id="Footer.string.followUs"
                  defaultMessage="Footer.string.followUs"
                />
              </div>
              <ul>
                <li className={classes.SocialNetworkItem}>
                  <a href="#"><i className="fab fa-twitter" /></a>
                </li>
                <li className={classes.SocialNetworkItem}>
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                </li>
                <li className={classes.SocialNetworkItem}>
                  <a href="#"><i className="fab fa-instagram" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default Footer;

Footer.propTypes = {
  language: PropTypes.string.isRequired,
};
