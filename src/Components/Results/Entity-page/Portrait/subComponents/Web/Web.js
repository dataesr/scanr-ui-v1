import React from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import MainWebSiteButton from './MainWebSiteButton';

import classes from './Web.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Web
 * Url : ex: /entite/200711886U
 * Description : Bloc présence sur le web visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Web = (props) => {
  const getSocialMeadiaButton = (socialMedia) => {
    let suffixUrl = null;
    if (props.socialMedias[socialMedia]) {
      suffixUrl = props.socialMedias[socialMedia];
    } else if (props.websites) {
      if (props.websites.length > 0) {
        if (props.websites[0][socialMedia]) {
          if (props.websites[0][socialMedia].length > 0) {
            suffixUrl = props.websites[0][socialMedia][0].account;
          }
        }
      }
    }

    let logo = '?';
    let url = '';
    switch (socialMedia) {
      case 'dailymotion':
        logo = <i className="fas fa-video" />;
        url = ` ${suffixUrl}`;
        break;
      case 'facebook':
        logo = <i className="fab fa-facebook" />;
        url = ` ${suffixUrl}`;
        break;
      case 'flickr':
        logo = <i className="fab fa-flickr" />;
        url = ` ${suffixUrl}`;
        break;
      case 'instagram':
        logo = <i className="fab fa-instagram" />;
        url = ` ${suffixUrl}`;
        break;
      case 'linkedin':
        logo = <i className="fab fa-linkedin" />;
        url = ` ${suffixUrl}`;
        break;
      case 'pinterest':
        logo = <i className="fab fa-pinterest" />;
        url = ` ${suffixUrl}`;
        break;
      case 'snappchat':
        logo = <i className="fab fa-snapchat-ghost" />;
        url = ` ${suffixUrl}`;
        break;
      case 'soundcloud':
        logo = <i className="fab fa-soundcloud" />;
        url = ` ${suffixUrl}`;
        break;
      case 'twitter':
        logo = <i className="fab fa-twitter" />;
        url = ` ${suffixUrl}`;
        break;
      case 'viadeo':
        logo = <i className="fab fa-viadeo" />;
        url = ` ${suffixUrl}`;
        break;
      case 'youtube':
        logo = <i className="fab fa-youtube" />;
        url = ` ${suffixUrl}`;
        break;

      default:
        logo = (
          <span>
            {socialMedia.substring(0, 2)}
          </span>);
    }

    if (suffixUrl) {
      return (
        <div className="col-4 p-0">
          <span className={classes.SocialMedia}>
            <a href={url}>
              {logo}
            </a>
          </span>
        </div>
      );
    }

    return null;
  };

  let mainWebSiteUrl = null;
  if (props.websites) {
    mainWebSiteUrl = (props.websites.length > 0 && props.websites[0].baseURL) ? props.websites[0].baseURL : null;
  }

  return (
    <div className="col-12">
      <div className={classes.Web}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={messages[props.language]['Entity.portrait.web.title']} />
          </div>
        </div>

        <div className="row">
          <div className={`col-3 ${classes.NoSpace}`}>
            <div className={`container row ${classes.NoSpace}`}>
              {
                (mainWebSiteUrl)
                  ? (
                    <div className={`col-12 ${classes.NoSpace}`}>
                      <MainWebSiteButton
                        language={props.language}
                        url={mainWebSiteUrl}
                      />
                    </div>
                  ) : null
              }

              {getSocialMeadiaButton('dailymotion')}
              {getSocialMeadiaButton('facebook')}
              {getSocialMeadiaButton('flickr')}
              {getSocialMeadiaButton('instagram')}
              {getSocialMeadiaButton('linkedin')}
              {getSocialMeadiaButton('pinterest')}
              {getSocialMeadiaButton('snappchat')}
              {getSocialMeadiaButton('soundcloud')}
              {getSocialMeadiaButton('twitter')}
              {getSocialMeadiaButton('viadeo')}
              {getSocialMeadiaButton('youtube')}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web;

Web.propTypes = {
  language: PropTypes.string.isRequired,
  socialMedias: PropTypes.array,
  websites: PropTypes.array,
};
