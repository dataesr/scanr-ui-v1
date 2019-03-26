import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Player } from 'video-react';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/* SCSS */
import classes from './DiscoverScanR.scss';
import '../../../../../node_modules/video-react/dist/video-react.css';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const DiscoverScanR = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.DiscoverScanR}>
      <div className="container">
        <div className="row">
          <div>
            <FormattedHTMLMessage
              id={`${props.labelKey}`}
              defaultMessage={`${props.labelKey}`}
            />
          </div>
          <Player
            className={classes.Player}
            playsInline
            poster="/assets/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default DiscoverScanR;

DiscoverScanR.propTypes = {
  labelKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
