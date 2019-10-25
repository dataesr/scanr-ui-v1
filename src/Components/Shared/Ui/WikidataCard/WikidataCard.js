import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

// import getSelectKey from '../../../../Utils/getSelectKey';

import classes from './WikidataCard.scss';

/**
 * WikidataCard component
 * Url : .
 * Description : Carte avec info wiki
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class WikidataCard extends Component {
  state= {
    title: null,
    extract: null,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    /* eslint-disable */
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${this.props.id}&sitefilter=enwiki%7Cfrwiki&props=sitelinks&format=json&origin=*`;
    Axios.get(url).then((response) => {
      const title = response.data.entities[this.props.id].sitelinks[`${this.props.language}wiki`].title;
      if (response.data && response.data.entities && response.data.entities[this.props.id] && response.data.entities[this.props.id].sitelinks && response.data.entities[this.props.id].sitelinks[`${this.props.language}wiki`]) {
        const urlText = `https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}&origin=*`;
        Axios.get(urlText).then((responseText) => {
          console.log('jre_responseText', responseText);
          if (responseText.data && responseText.data.query && responseText.data.query.pages) {
            for (const item in responseText.data.query.pages) {
              if (responseText.data.query.pages.hasOwnProperty(item)) {
                const obj = responseText.data.query.pages[item];
                console.log('jre_obj:', obj);
                // const title = obj.title || null;
                const extract = obj.extract || null;
                this.setState({ title, extract });
              }
            }
          }
        }).catch((e) => {
          console.log('jre_erreur2', e);
        });
      }
    }).catch((e) => {
      console.log('jre_erreur1', e);
    });
        /* eslint-enable */
  }

  render() {
    return (
      <div className={classes.WikidataCard}>
        données wiki en cours ...
      </div>
    );
  }
}

export default WikidataCard;

WikidataCard.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string,
};
