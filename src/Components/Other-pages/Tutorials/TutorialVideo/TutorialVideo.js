import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ComponentVideo from '../Video/ComponentVideo';

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

const videoPoster = 'img/video-poster/paques.jpg';

const TutorialVideo = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section style={sectionStyle} className={classes.TutorialVideo}>
      <div className="container">
        <div className="row flex-column justify-content-around text-center text-white">
          <FormattedHTMLMessage
            id={`TutorialVideo.${props.labelKey}`}
            defaultMessage={`TutorialVideo.${props.labelKey}`}
          />
          <ComponentVideo
            url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            poster={videoPoster}
          />
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default TutorialVideo;

TutorialVideo.propTypes = {
  labelKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
