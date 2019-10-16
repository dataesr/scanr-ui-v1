import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';

import classes from './SocialNetworksFlow.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * SocialNetworksFlow
 * Url : ex: /entite/200711886U
 * Description : Bloc présence sur le web visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SocialNetworksFlow = (props) => {
  const existFow = (socialNetwork) => {
    if (props.socialMedias.find(el => el.type === socialNetwork)) {
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

  return (
    <Fragment>
      {
        (props.socialMedias && props.socialMedias.length > 0 && existFow('twitter'))
          ? (
            <div className="col-12">
              <div className={classes.SocialNetworksFlow}>
                <div className="row">
                  <div className={`col ${classes.NoSpace}`}>
                    <CardsTitle title={messages[props.language]['Entity.portrait.socialNetworksFlow.title']} />
                  </div>
                </div>
                <div className="row">
                  <div className={`col-6 ${classes.CardContainer}`}>
                    <a className="twitter-timeline" href={getSNUrl('twitter')} data-tweet-limit="5">Tweets de l&quote;entité</a>
                  </div>
                </div>
              </div>
            </div>
          ) : null
      }
    </Fragment>
  );
};

export default SocialNetworksFlow;
/* eslint-disable */
SocialNetworksFlow.propTypes = {
  language: PropTypes.string.isRequired,
  socialMedias: PropTypes.array,
};
