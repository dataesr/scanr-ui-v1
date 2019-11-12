import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import WikidataCard from '../../../../../../Shared/Ui/WikidataCard/WikidataCard';
import YoutubeCard from '../../../../../../Shared/Ui/YoutubeCard/YoutubeCard';

import classes from './Web.scss';

import messagesFr from '../../../../translations/fr.json';
import messagesEn from '../../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Web = (props) => {
  let youtubeUrl = null;
  if (props.data.links && props.data.links.length > 0) {
    for (let i = 0; i < props.data.links.length; i += 1) {
      if (props.data.links[i].type.toLowerCase() === 'youtube') {
        youtubeUrl = props.data.links[i].url;
      }
    }
  }
  let wikidataId = null;
  wikidataId = 'Q334065';
  if (props.data.externalIds && props.data.externalIds.length > 0) {
    for (let i = 0; i < props.data.externalIds.length; i += 1) {
      if (props.data.externalIds[i].type.toLowerCase() === 'wikidata') {
        wikidataId = props.data.externalIds[i].id;
      }
    }
  }
  let twitterUrl = null;
  if (props.data.links && props.data.links.length > 0) {
    for (let i = 0; i < props.data.links.length; i += 1) {
      if (props.data.links[i].type.toLowerCase() === 'twitter') {
        twitterUrl = props.data.links[i].url;
      }
    }
  }
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className="container-fluid">
        <div className="row">
          <div className="container-fluid">
            <div className="row">
              { (wikidataId) ? (
                <div className={`col-md-6 ${classes.CardContainer}`} style={{ height: '500px' }}>
                  <WikidataCard language={props.language} id={wikidataId} />
                </div>
              ) : null }
              { (twitterUrl) ? (
                <div className={`col-md-6 ${classes.CardContainer}`} style={{ height: '500px' }}>
                  <TwitterTimelineEmbed url={twitterUrl} autoHeight />
                </div>
              ) : null }
              { (youtubeUrl) ? (
                <div className={`col-md-6 ${classes.CardContainer}`} style={{ height: '500px' }}>
                  <YoutubeCard url={youtubeUrl} autoHeight />
                </div>
              ) : null }
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default Web;

Web.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};

// modifyModeHandle: PropTypes.func.isRequired,
// modifyMode: PropTypes.bool.isRequired,
