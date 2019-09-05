import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import logo from '../svg/logo-ministere.svg';

/* SCSS */
import classes from './Footer.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Footer = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.Footer}>
      <div className="container">
        <div className="row">
          <div className={`col-md ${classes.Col}`}>
            <img
              src={logo}
              alt="Logo MESRI"
              className={classes.Logo}
            />
          </div>
          <div className={`col-md ${classes.Col}`}>
            <ul>
              <li>
                <a href="/opendata">
                  <FormattedHTMLMessage
                    id="Footer.link.openData"
                    defaultMessage="Footer.link.openData"
                  />
                </a>
              </li>
              <li>
                <a href="/ressources">
                  <FormattedHTMLMessage
                    id="Footer.link.ressources"
                    defaultMessage="Footer.link.ressources"
                  />
                </a>
              </li>
              <li>
                <FormattedHTMLMessage
                  id="Footer.link.contribute"
                  defaultMessage="Footer.link.contribute"
                />
              </li>
              <li>
                <a href="https://github.com/jerem1508/scanr-v2-demo" target="_blank" rel="noopener noreferrer">
                  <FormattedHTMLMessage
                    id="Footer.link.gitHub"
                    defaultMessage="Footer.link.gitHub"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className={`col-md ${classes.Col}`}>
            <ul>
              <li>
                <FormattedHTMLMessage
                  id="Footer.link.accessibility"
                  defaultMessage="Footer.link.accessibility"
                />
              </li>
              <li>
                <FormattedHTMLMessage
                  id="Footer.link.faq"
                  defaultMessage="Footer.link.faq"
                />
              </li>
              <li>
                <FormattedHTMLMessage
                  id="Footer.link.glossary"
                  defaultMessage="Footer.link.glossary"
                />
              </li>
              <li>
                <a href="/mentions-legales">
                  <FormattedHTMLMessage
                    id="Footer.link.generalConditions"
                    defaultMessage="Footer.link.generalConditions"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className={`col-md ${classes.Col}`}>
            <ul>
              <li>
                <a href="/medias">
                  <FormattedHTMLMessage
                    id="Footer.link.medias"
                    defaultMessage="Footer.link.medias"
                  />
                </a>
              </li>
              <li>
                <a href="/tutoriels">
                  <FormattedHTMLMessage
                    id="Footer.link.tutorial"
                    defaultMessage="Footer.link.tutorial"
                  />
                </a>
              </li>
              <li>
                <a href="/l-equipe-et-son-projet">
                  <FormattedHTMLMessage
                    id="Footer.link.team"
                    defaultMessage="Footer.link.team"
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
          <div className={`col-md ${classes.Col}`}>
            <div>
              <a href="#">
                <FormattedHTMLMessage
                  id="Footer.link.ourBlog"
                  defaultMessage="Footer.link.ourBlog"
                />
              </a>
            </div>
            <div className={classes.SocialNetworks}>
              <FormattedHTMLMessage
                id="Footer.string.followUs"
                defaultMessage="Footer.string.followUs"
              />
            </div>
            <ul className={classes.SocialNetworkItems}>
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

export default Footer;

Footer.propTypes = {
  language: PropTypes.string.isRequired,
};
