import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import Background from './poudre-blanche_Fbleu-A.jpg';

/* SCSS */
import classes from './DiscoverScanR.scss';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: '450px 150px',
};

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const DiscoverScanR = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section style={sectionStyle} className={classes.DiscoverScanR}>
      <div className="container">
        <div className="row flex-column text-center text-white">
          <FormattedHTMLMessage
            id="DiscoverScanR.title"
            defaultMessage={`DiscoverScanR.${props.labelKey}`}
          />
          <div className={classes.Video}>
            <video
              preload="true"
              width="60%"
              controls
              playinline="true"
              poster=""
              src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            />
          </div>
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
