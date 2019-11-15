import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import WikidataCard from '../../../../../../Shared/Ui/WikidataCard/WikidataCard';

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
 * Url : ex: /entite/130022775
 * Description : Bloc Dernieres publications sur les les réseaux sociaux visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class SocialNetworksFlow extends Component {
  // state = {
  //   isOpen: false,
  // };

  existFow = (socialNetwork) => {
    if (this.props.socialMedias.find(el => el.type === socialNetwork)) {
      return true;
    }
    return false;
  }

  getSNUrl = (socialNetwork) => {
    const sn = this.props.socialMedias.find(el => el.type === socialNetwork);
    if (sn) {
      return sn.url;
    }

    return false;
  }

  // buttonHandler = () => {
  //   this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  // }

  getWikidataId = () => {
    if (this.props.externalIds && this.props.externalIds.length > 0) {
      for (let i = 0; i < this.props.externalIds.length; i += 1) {
        if (this.props.externalIds[i].type.toLowerCase() === 'wikidata') {
          return this.props.externalIds[i].id;
        }
      }
    }
    return null;
  }

  render() {
    const id = this.getWikidataId();
    return (
      <Fragment>
        {
          (this.props.socialMedias && this.props.socialMedias.length > 0 && this.existFow('twitter'))
            ? (
              <div className="col-12">
                <div className={classes.SocialNetworksFlow}>
                  <div className="row">
                    <div className={`col ${classes.NoSpace}`}>
                      <div className={`d-flex justify-content-between ${classes.CardsTitle}`}>
                        <h2>
                          {messages[this.props.language]['Entity.portrait.socialNetworksFlow.title']}
                        </h2>
                        <div className={classes.Button}>
                          <button
                            className={`btn ${classes.btn_scanrBlue}`}
                            type="button"
                            onClick={this.buttonHandler}
                          >
                            {
                              (this.state.isOpen) ? <i className="fas fa-chevron-circle-up" /> : <i className="fas fa-chevron-circle-down" />
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    (this.state.isOpen)
                      ? (
                        <div className="row">
                          <div className={`col-4 ${classes.CardContainer}`} style={{ height: '500px' }}>
                            <TwitterTimelineEmbed url={this.getSNUrl('twitter')} autoHeight />
                          </div>
                          <div className={`col-4 ${classes.CardContainer}`} style={{ height: '500px' }}>
                            <WikidataCard language={this.props.language} id={id} />
                          </div>
                        </div>
                      ) : null
                  }
                </div>
              </div>
            ) : null
        }
      </Fragment>
    );
  }
}

export default SocialNetworksFlow;
/* eslint-disable */
SocialNetworksFlow.propTypes = {
  language: PropTypes.string.isRequired,
  socialMedias: PropTypes.array,
  externalIds: PropTypes.array,
};
