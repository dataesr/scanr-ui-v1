import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ComponentVideo from '../../../Shared/Video/ComponentVideo';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

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

const videoPoster = 'img/video-poster/paques-mini.png';

const DiscoverScanR = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section style={sectionStyle} className={classes.DiscoverScanR}>
      <div className="container">
        <div className="row">
          <div className="col-lg" />
          <div className="col-lg-9 cols-12">
            <FormattedHTMLMessage
              id={`DiscoverScanR.${props.labelKey}`}
              defaultMessage={`DiscoverScanR.${props.labelKey}`}
            />
            <ComponentVideo
              url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              poster={videoPoster}
            />
          </div>
          <div className="col-lg" />
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
