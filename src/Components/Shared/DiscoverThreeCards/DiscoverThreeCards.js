import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import CardWithButtonBigger from '../CardWithButton/CardWithButtonBigger';
import Background from './poudre-bleu_Fblanc-A.jpg';

/* SCSS */
import classes from './DiscoverThreeCards.scss';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'bottom 0 right 0',
};

const DiscoverThreeCards = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section style={sectionStyle} className={classes.DiscoverThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButtonBigger
              language={props.language}
              title={props.TitleCard1}
              url={props.UrlCard1}
            />
            <CardWithButtonBigger
              language={props.language}
              title={props.TitleCard2}
              url={props.UrlCard2}
            />
            <CardWithButtonBigger
              language={props.language}
              title={props.TitleCard3}
              url={props.UrlCard3}
            />
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default DiscoverThreeCards;

DiscoverThreeCards.propTypes = {
  language: PropTypes.string.isRequired,
  TitleCard1: PropTypes.string.isRequired,
  TitleCard2: PropTypes.string.isRequired,
  TitleCard3: PropTypes.string.isRequired,
  UrlCard1: PropTypes.string.isRequired,
  UrlCard2: PropTypes.string.isRequired,
  UrlCard3: PropTypes.string.isRequired,
};
