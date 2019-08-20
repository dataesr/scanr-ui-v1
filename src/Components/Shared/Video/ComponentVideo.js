import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
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
      {/* eslint-disable-next-line */}
      <video width="100%" controls poster={props.poster}>
        <source src={props.url} type="video/mp4" />
        <FormattedHTMLMessage
          id="ComponentVideo.text"
          defaultMessage="ComponentVideo.text"
        />
      </video>
    </div>
  </IntlProvider>
);

export default ComponentVideo;

ComponentVideo.propTypes = {
  language: PropTypes.string,
  url: PropTypes.string.isRequired,
  poster: PropTypes.string,
};
