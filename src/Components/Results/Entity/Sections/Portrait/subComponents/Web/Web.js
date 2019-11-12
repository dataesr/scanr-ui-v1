import React, { Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import MainWebSiteButton from './MainWebSiteButton';
import WebSiteButton from './WebSiteButton';
import WikidataCard from '../../../../../../Shared/Ui/WikidataCard/WikidataCard';
import YoutubeCard from '../../../../../../Shared/Ui/YoutubeCard/YoutubeCard';

import getWebSiteByType from '../../../../../../../Utils/getWebSiteByType';

import { OTHER_WEBSITES } from '../../../../../../../config/config';

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
  const existFlow = (socialNetwork) => {
    const find = props.socialMedias.filter(el => el.type === socialNetwork);
    if (socialNetwork === 'twitter' && find.length > 0 && find[0].url.indexOf('twitter.com') === -1) {
      return false;
    }
    if (find && find.length > 0) {
      return true;
    }
    return false;
  };

  const getSNUrl = (socialNetwork) => {
    const sn = props.socialMedias.find(el => el.type === socialNetwork);
    if (sn) {
      return sn.url;
    }

    return false;
  };

  const getWikidataId = () => {
    if (props.externalIds && props.externalIds.length > 0) {
      for (let i = 0; i < props.externalIds.length; i += 1) {
        if (props.externalIds[i].type.toLowerCase() === 'wikidata') {
          return props.externalIds[i].id;
        }
      }
    }
    return null;
  };

  const getYoutubeId = () => {
    let youtubeUrl = null;
    if (props.socialMedias && props.socialMedias.length > 0) {
      for (let i = 0; i < props.socialMedias.length; i += 1) {
        if (props.socialMedias[i].type.toLowerCase() === 'youtube') {
          youtubeUrl = props.socialMedias[i].url;
          return youtubeUrl;
        }
      }
    }
    return null;
  };

  const getSocialMediaButton = (socialMedia) => {
    let urlSocialMedia = null;
    if (props.socialMedias) {
      const element = props.socialMedias.find(el => el.type === socialMedia);
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
          </span>
        );
    }

    return (
      <div className="col-md-2 p-0">
        <span className={classes.SocialMedia}>
          <a href={urlSocialMedia} target="_blank" rel="noopener noreferrer">
            {logo}
          </a>
        </span>
      </div>
    );
  };

  const mainWebSiteUrl = getWebSiteByType(props.links, 'main');

  const othWebSites = [];
  OTHER_WEBSITES.forEach((type) => {
    if (type !== 'wikipedia') {
      othWebSites.push({ type, url: getWebSiteByType(props.links, type) });
    }
  });

  const idWiki = getWikidataId();
  const youtubeUrl = getYoutubeId();


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
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <div className={`container row ${classes.NoSpace}`}>
                      {
                        (mainWebSiteUrl)
                          ? (
                            <div className={`col-12 ${classes.CardContainer}`}>
                              <MainWebSiteButton
                                language={props.language}
                                url={mainWebSiteUrl}
                              />
                            </div>
                          ) : null
                      }
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="row">
                      {
                        othWebSites.map((webSite) => {
                          if (webSite.url) {
                            return (
                              <div className={`col-md-6 ${classes.CardContainer}`}>
                                <WebSiteButton
                                  language={props.language}
                                  url={webSite.url}
                                  type={webSite.type}
                                />
                              </div>
                            );
                          }
                          return null;
                        })
                      }
                    </div>
                  </div>
                </div>

                <div className="row">
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
                <div className="row">
                  {
                    (props.socialMedias && props.socialMedias.length > 0 && existFlow('twitter'))
                      ? (
                        <div className={`col-md-4 ${classes.CardContainer}`} style={{ height: '500px' }}>
                          <TwitterTimelineEmbed url={getSNUrl('twitter')} autoHeight />
                        </div>
                      )
                      : null
                  }
                  {
                    (props.socialMedias && props.socialMedias.length > 0 && idWiki)
                      ? (
                        <div className={`col-md-4 ${classes.CardContainer}`} style={{ height: '500px' }}>
                          <WikidataCard language={props.language} id={idWiki} />
                        </div>
                      )
                      : null
                  }
                  {
                    (props.socialMedias && props.socialMedias.length > 0 && youtubeUrl)
                      ? (
                        <div className={`col-md-4 ${classes.CardContainer}`} style={{ height: '500px' }}>
                          <YoutubeCard language={props.language} url={youtubeUrl} />
                        </div>
                      )
                      : null
                  }
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
  externalIds: PropTypes.array,
};
