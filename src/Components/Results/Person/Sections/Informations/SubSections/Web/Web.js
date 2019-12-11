import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import WikidataCard from '../../../../../../Shared/Ui/WikidataCard/WikidataCard';
import YoutubeCard from '../../../../../../Shared/Ui/YoutubeCard/YoutubeCard';

import classes from './Web.scss';
/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Web = (props) => {
  let wikidataId = {};
  let twitterUrl = {};
  let youtubeUrl = {};
  if (props.data.links && props.data.links.length > 0) {
    youtubeUrl = props.data.links.find(link => (link.type.toLowerCase() === 'youtube')) || {};
    twitterUrl = props.data.links.find(link => (link.type.toLowerCase() === 'twitter')) || {};
  }
  if (props.data.externalIds && props.data.externalIds.length > 0) {
    wikidataId = props.data.externalIds.find(link => (link.type.toLowerCase() === 'wikidata')) || {};
  }
  return (
    <div className="container-fluid">
      {
        (wikidataId.id || twitterUrl.url || youtubeUrl.url) ? (
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={<FormattedHTMLMessage id="Person.Informations.Web.title" />} />
            </div>
          </div>
        ) : null
      }
      <div className="row">
        { (wikidataId.id) ? (
          <div className={`col-md-6 ${classes.CardContainer}`} style={{ height: '500px' }}>
            <WikidataCard language={props.language} id={wikidataId.id} />
          </div>
        ) : null }
        { (twitterUrl.url) ? (
          <div className={`col-md-6 ${classes.CardContainer}`} style={{ height: '500px' }}>
            <TwitterTimelineEmbed url={twitterUrl.url} autoHeight />
          </div>
        ) : null }
        { (youtubeUrl.url) ? (
          <div className={`col-md-6 ${classes.CardContainer}`} style={{ height: '500px' }}>
            <YoutubeCard url={youtubeUrl.url} autoHeight />
          </div>
        ) : null }
      </div>
    </div>
  );
};

export default Web;

Web.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
