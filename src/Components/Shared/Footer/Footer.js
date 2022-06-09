import React, { useContext } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import CookieConsent from 'react-cookie-consent';
import { GlobalContext } from '../../../GlobalContext';
import useLatestRelease from '../../../Hooks/useLatestRelease';

import classes from './Footer.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Footer = () => {
  /* eslint-disable-next-line */
  const _paq = window._paq || [];
  if (localStorage.consent !== 'ko') {
    _paq.push(['rememberConsentGiven']);
  }
  const {
    latestRelease, refreshPage,
  } = useLatestRelease();
  const context = useContext(GlobalContext);
  return (
    <IntlProvider locale={context.language} messages={messages[context.language]}>
      <section className={classes.Footer}>
        <CookieConsent
          location="bottom"
          buttonText={
            (
              <FormattedHTMLMessage
                id="Footer.consentOk"
                defaultMessage="Footer.consentOk"
              />
            )
          }
          declineButtonText={
            (
              <FormattedHTMLMessage
                id="Footer.consentKo"
                defaultMessage="Footer.consentKo"
              />
            )
          }
          cookieName="scanr"
          style={{ background: '#2B373B' }}
          buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
          expires={150}
          /* eslint-disable-next-line */
          onAccept={() => { var _paq = window._paq || []; _paq.push(['rememberConsentGiven']); }}
          enableDeclineButton
          /* eslint-disable-next-line */
          onDecline={() => { var _paq = window._paq || []; _paq.push(['forgetConsentGiven']); localStorage.consent = 'ko';}}
        >
          <FormattedHTMLMessage
            id="Footer.consentInfo"
            defaultMessage="Footer.consentInfo"
          />
        </CookieConsent>
        <div className="container">
          <div className="row">
            <div className={`col-md ${classes.Col}`}>
              <div className={classes.LogoContainer}>
                <img
                  src="./img/scanr/MESR_2022.png"
                  alt="Logo MESR"
                  className={classes.Logo}
                />
              </div>
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
                  <a href="/tutorial">
                    <FormattedHTMLMessage
                      id="Footer.link.tutorial"
                      defaultMessage="Footer.link.tutorial"
                    />
                  </a>
                </li>
                {/* <li>
                  <FormattedHTMLMessage
                    id="Footer.link.contribute"
                    defaultMessage="Footer.link.contribute"
                  />
                </li> */}
                <li>
                  <a href="https://github.com/dataesr/scanr" target="_blank" rel="noopener noreferrer">
                    <FormattedHTMLMessage
                      id="Footer.link.gitHub"
                      defaultMessage="Footer.link.gitHub"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/dataesr/scanr/releases" target="_blank" rel="noopener noreferrer">
                    <FormattedHTMLMessage
                      id="Footer.link.changelog"
                      defaultMessage="Footer.link.changelog"
                      values={{ current: `v${process.env.REACT_APP_VERSION}` }}
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className={`col-md ${classes.Col}`}>
              <ul>
                {/* <li>
                  <FormattedHTMLMessage
                    id="Footer.link.accessibility"
                    defaultMessage="Footer.link.accessibility"
                  />
                </li> */}
                <li>
                  <a href="/faq">
                    <FormattedHTMLMessage
                      id="Footer.link.faq"
                      defaultMessage="Footer.link.faq"
                    />
                  </a>
                </li>
                <li>
                  <a href="/glossaire">
                    <FormattedHTMLMessage
                      id="Footer.link.glossary"
                      defaultMessage="Footer.link.glossary"
                    />
                  </a>
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
                {/* <li>
                  <a href="/tutoriels">
                    <FormattedHTMLMessage
                      id="Footer.link.tutorial"
                      defaultMessage="Footer.link.tutorial"
                    />
                  </a>
                </li> */}
                <li>
                  <a href="/l-equipe-et-son-projet">
                    <FormattedHTMLMessage
                      id="Footer.link.team"
                      defaultMessage="Footer.link.team"
                    />
                  </a>
                </li>
                <li>
                  <a href="/contact">
                    <FormattedHTMLMessage
                      id="Footer.link.contact"
                      defaultMessage="Footer.link.contact"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <div className={`col-md ${classes.Col}`}>
              { /* <div>
                <a href="#">
                  <FormattedHTMLMessage
                    id="Footer.link.ourBlog"
                    defaultMessage="Footer.link.ourBlog"
                  />
                </a>
              </div> */}
              <div className={classes.SocialNetworks}>
                <FormattedHTMLMessage
                  id="Footer.string.followUs"
                  defaultMessage="Footer.string.followUs"
                />
              </div>
              <ul className={classes.SocialNetworkItems}>
                <li className={classes.SocialNetworkItem}>
                  <a href="https://twitter.com/ScanrM" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {
          (latestRelease && (latestRelease === `v${process.env.REACT_APP_VERSION}`))
            && (
              <div className={classes.ReloadPageToast}>
                <span className={classes.TextSpan}>Une nouvelle version de l&apos;application est disponible</span>
                <button type="button" className={classes.Button} onClick={refreshPage}>Rafraîchir</button>
              </div>
            )
        }
      </section>
    </IntlProvider>
  );
};

export default Footer;
