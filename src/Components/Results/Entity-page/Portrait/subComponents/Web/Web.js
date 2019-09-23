import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import MainWebSiteButton from './MainWebSiteButton';

import { OTHER_WEBSITES } from '../../../../../../config/config';

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
  const getWebSiteByType = (type) => {
    let url = null;
    if (props.links) {
      const el = props.links.find(site => (site.type === type));
      url = (el && el.url) ? el.url : null;
    }
    return url;
  };


  const getSocialMediaButton = (socialMedia) => {
    let urlSocialMedia = null;
    if (props.socialMedias) {
      const element = props.socialMedias.find(el => el.socialMediaType === socialMedia);
      if (element && element.url) {
        urlSocialMedia = element.url;
      }
    }

    if (!urlSocialMedia) { return null; }

    let logo = '?';
    switch (socialMedia) {
      case 'dailymotion':
        logo = <i className="fas fa-video" />;
        break;
      case 'facebook':
        logo = <i className="fab fa-facebook" />;
        break;
      case 'flickr':
        logo = <i className="fab fa-flickr" />;
        break;
      case 'instagram':
        logo = <i className="fab fa-instagram" />;
        break;
      case 'linkedin':
        logo = <i className="fab fa-linkedin" />;
        break;
      case 'pinterest':
        logo = <i className="fab fa-pinterest" />;
        break;
      case 'snappchat':
        logo = <i className="fab fa-snapchat-ghost" />;
        break;
      case 'soundcloud':
        logo = <i className="fab fa-soundcloud" />;
        break;
      case 'twitter':
        logo = <i className="fab fa-twitter" />;
        break;
      case 'viadeo':
        logo = <i className="fab fa-viadeo" />;
        break;
      case 'youtube':
        logo = <i className="fab fa-youtube" />;
        break;

      default:
        logo = (
          <span>
            {socialMedia.substring(0, 2)}
          </span>);
    }

    return (
      <div className="col-4 p-0">
        <span className={classes.SocialMedia}>
          <a href={urlSocialMedia}>
            {logo}
          </a>
        </span>
      </div>
    );
  };

  const mainWebSiteUrl = getWebSiteByType('main');

  const othWebSites = [];
  OTHER_WEBSITES.forEach((type) => {
    othWebSites.push({ type, url: getWebSiteByType(type) });
  });

  return (
    <Fragment>
      {
        (mainWebSiteUrl)
          ? (
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

                      {getSocialMediaButton('dailymotion')}
                      {getSocialMediaButton('facebook')}
                      {getSocialMediaButton('flickr')}
                      {getSocialMediaButton('instagram')}
                      {getSocialMediaButton('linkedin')}
                      {getSocialMediaButton('pinterest')}
                      {getSocialMediaButton('snappchat')}
                      {getSocialMediaButton('soundcloud')}
                      {getSocialMediaButton('twitter')}
                      {getSocialMediaButton('viadeo')}
                      {getSocialMediaButton('youtube')}
                    </div>
                  </div>
                  <div className="col-3">
                    ?
                  </div>
                  <div className="col-6">
                    <div className="row">
                      {
                        othWebSites.map((webSite) => {
                          if (webSite.url) {
                            return (
                              <div className="col-md-6">
                                {webSite.type}
                              </div>
                            );
                          }
                          return null;
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
      }
    </Fragment>
  );
};

export default Web;
/* eslint-disable */
Web.propTypes = {
  language: PropTypes.string.isRequired,
  socialMedias: PropTypes.array,
  websites: PropTypes.array,
  links: PropTypes.array,
};
