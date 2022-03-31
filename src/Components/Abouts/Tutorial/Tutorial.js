import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Banner from '../../Shared/Banner/Banner';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import TutorialVideo from './TutorialVideo/TutorialVideo';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Tutorial.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Tutorials
 * Url : /tutoriels
 * Description : Page de description des tutoriels - Comment fonctionne scanR ?
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const Tutorial = ({ language }) => (
  <IntlProvider locale={language} messages={messages[language]}>
    <div className={`container-fluid ${classes.Tutorials}`}>
      <HeaderTitle
        language={language}
        labelkey="tutorial"
        url1="/"
        url2="#"
      />

      <section className={classes.Content}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <FormattedHTMLMessage
                id="contentTexte"
                defaultMessage="contentTexte"
              />
            </div>
          </div>
        </div>
      </section>

      <TutorialVideo
        labelKey="bienvenue"
        language={language}
        url={
          (language !== 'en')
            ? 'https://www.youtube.com/embed/1VyhLRQhZ-M'
            : 'https://www.youtube.com/embed/aIN46IQQpBw'
          }
      />
      <TutorialVideo
        labelKey="auteurs"
        language={language}
        url="https://www.youtube.com/embed/9SPYVpzXgEg"
      />
      <TutorialVideo
        labelKey="productions"
        language={language}
        url="https://www.youtube.com/embed/J30vbDt16Mg"
      />
      <TutorialVideo
        labelKey="financements"
        language={language}
        url="https://www.youtube.com/embed/hlP3TDJnLpk"
      />
      <TutorialVideo
        labelKey="structures"
        language={language}
        url="https://www.youtube.com/embed/0gv6GnS8tg8"
      />
      <TutorialVideo
        labelKey="recherche"
        language={language}
        url="https://www.youtube.com/embed/KBVXDcnfcso"
      />
      <TutorialVideo
        labelKey="contribuer"
        language={language}
        url="https://www.youtube.com/embed/CK_dV3nDhpU"
      />

      <section className={classes.ThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={language}
              messages={messages}
              schema="card_dark"
              title="Discover.Sources"
              url="./ressources"
              lib_button="Voir"
              position="CardCenter"
            />
            <CardWithButton
              language={language}
              messages={messages}
              schema="card_dark"
              title="Discover.Team"
              url="./l-equipe-et-son-projet"
              lib_button="Voir"
              position="CardCenter"
            />
            <CardWithButton
              language={language}
              messages={messages}
              schema="card_dark"
              title="Discover.FAQ"
              url="./faq"
              lib_button="Voir"
              position="CardCenter"
            />
          </div>
        </div>
      </section>

      <Banner
        cssClass="BannerDark"
        labelKey="Appear"
        language={language}
        url=""
      />
    </div>
  </IntlProvider>
);

export default Tutorial;

Tutorial.propTypes = {
  language: PropTypes.string.isRequired,
};
