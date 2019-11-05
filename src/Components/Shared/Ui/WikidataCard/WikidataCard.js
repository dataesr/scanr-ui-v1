import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Md5 from 'md5';

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
    // eslint-disable-next-line
    title: null,
    extract: null,
    urlImageOnServer: null,
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
          if (responseText.data && responseText.data.query && responseText.data.query.pages) {
            for (const item in responseText.data.query.pages) {
              if (responseText.data.query.pages.hasOwnProperty(item)) {
                const obj = responseText.data.query.pages[item];
                const extract = obj.extract || null;
                this.setState({ title, extract });

                // Recherche de l'image
                const urlImage = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${this.props.id}&property=P154&format=json&origin=*`
                Axios.get(urlImage).then((responseImage) => {
                  if (responseImage.data && responseImage.data.claims && responseImage.data.claims.P154 && responseImage.data.claims.P154[0] && responseImage.data.claims.P154[0].mainsnak && responseImage.data.claims.P154[0].mainsnak.datavalue && responseImage.data.claims.P154[0].mainsnak.datavalue.value){
                    let imageName = responseImage.data.claims.P154[0].mainsnak.datavalue.value;
                    const regex = / /gi;
                    imageName = imageName.replace(regex, '_');
                    const imageNameHash = Md5(imageName)
                    const urlImageOnServer = `https://upload.wikimedia.org/wikipedia/commons/${imageNameHash.substring(0,1)}/${imageNameHash.substring(0,2)}/${imageName}`;
                    this.setState({ urlImageOnServer });
                  }
                });
              }
            }
          }
        });
      }
    });
        /* eslint-enable */
  }

  render() {
    return (
      <div className={classes.WikidataCard}>
        <p className={classes.Title}>
          Wikipedia
        </p>
        <div className={classes.Content}>
          {
            (this.state.urlImageOnServer)
              ? (
                <div className={classes.Image}>
                  <img alt="wikipedia" src={this.state.urlImageOnServer} className="img-fluid" />
                </div>
              ) : null
          }
          <p className={classes.Extract}>
            {this.state.extract}
          </p>
        </div>
        <p className={classes.Footer}>
          footer
        </p>
      </div>
    );
  }
}

export default WikidataCard;

WikidataCard.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string,
};
