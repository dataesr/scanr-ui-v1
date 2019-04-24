import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ComponentVideo from '../../../Shared/Video/ComponentVideo';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import Background from './poudre-fuschia_Fblanc-A.jpg';

/* SCSS */
import classes from './TutorialVideo.scss';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: '50px 1000px',
};

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const videoPoster = 'img/Tai-Ji-gravure-paysage-Chine.gif';

const TutorialVideo = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section style={sectionStyle} className={classes.TutorialVideo}>
      <div className="container">
        <div className="row">
          <div className="col-lg" />
          <div className="col-lg-9 col-s-12">
            <FormattedHTMLMessage
              id={`TutorialVideo.${props.labelKey}`}
              defaultMessage={`TutorialVideo.${props.labelKey}`}
            />
            <ComponentVideo
              url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              poster={videoPoster}
              language={props.language}
            />
            <div className={`list-group list-group-horizontal ${classes.SocialButtons}`}>
              <FormattedHTMLMessage
                id="SocialButtons.textShareTuto"
                defaultMessage="SocialButtons.textShareTuto"
              />
              <a href="#" data-toggle="tooltip" title="twitter">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" data-toggle="tooltip" title="facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" data-toggle="tooltip" title="linkedin">
                <i className="fab">&#xf0e1;</i>
              </a>
            </div>
          </div>
          <div className="col-lg" />
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
