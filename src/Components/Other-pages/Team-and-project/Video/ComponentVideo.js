import React from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './ComponentVideo.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};


const ComponentVideo = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`${classes.ComponentVideo}`}>
      <video width="60%" controls poster={props.poster}>
        <source src={props.url} type="video/mp4" />
        <FormattedMessage
          id="ComponentVideo.text"
          defaultMessage="Votre navigateur ne suppporte pas cette video"
        />
      </video>
    </div>
  </IntlProvider>
);

export default ComponentVideo;

ComponentVideo.propTypes = {
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
};
