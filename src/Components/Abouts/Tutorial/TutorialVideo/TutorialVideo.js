import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';


/* SCSS */
import classes from './TutorialVideo.scss';

const sectionStyle = {
  backgroundImage: 'url(\'./img/poudres/poudre-bleu_Fblanc-A.jpg\')',
  backgroundPosition: '50px 1000px',
};

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const TutorialVideo = ({ language, labelKey, url }) => (
  <IntlProvider locale={language} messages={messages[language]}>
    <section style={sectionStyle} className={classes.TutorialVideo}>
      <div className="container">
        <div className="row">
          <div className="col-lg" />
          <div className="col-lg-9 col-s-12">
            <FormattedHTMLMessage
              id={`TutorialVideo.${labelKey}`}
              defaultMessage={`TutorialVideo.${labelKey}`}
            />
            <iframe
              width="100%"
              height="400px"
              src={url}
              title={(
                <FormattedHTMLMessage
                  id={`TutorialVideo.${labelKey}`}
                  defaultMessage={`TutorialVideo.${labelKey}`}
                />
              )}
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <div className="col-lg" />
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default TutorialVideo;

TutorialVideo.propTypes = {
  url: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};
