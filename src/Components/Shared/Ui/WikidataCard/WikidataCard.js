import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Md5 from 'md5';

import logo from '../../images/wikipedia.png';

import classes from './WikidataCard.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

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
    displayWiki: false,
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
        if (response.data.entities[this.props.id].sitelinks[`${this.props.language}wiki`] === undefined) {
          this.setState({ displayWiki: false });
	} else if (response.data && response.data.entities && response.data.entities[this.props.id] && response.data.entities[this.props.id].sitelinks && response.data.entities[this.props.id].sitelinks[`${this.props.language}wiki`]) {
        const title = response.data.entities[this.props.id].sitelinks[`${this.props.language}wiki`].title;
        this.setState({ displayWiki: true });
        const urlText = `https://${this.props.language}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${title}&origin=*`;
        Axios.get(urlText).then((responseText) => {
          if (responseText.data && responseText.data.query && responseText.data.query.pages) {
            for (const item in responseText.data.query.pages) {
              if (responseText.data.query.pages.hasOwnProperty(item)) {
                const obj = responseText.data.query.pages[item];
                const extract = obj.extract || null;
                this.setState({ title, extract });

                // Recherche de l'image
                const urlImage1 = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${this.props.id}&property=P154&format=json&origin=*`
                const urlImage2 = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${this.props.id}&property=P18&format=json&origin=*`
                const regex = / /gi;
                let imageName = null;
                Axios.get(urlImage1).then((responseImage) => {
                  if (responseImage.data && responseImage.data.claims && responseImage.data.claims.P154 && responseImage.data.claims.P154[0] && responseImage.data.claims.P154[0].mainsnak && responseImage.data.claims.P154[0].mainsnak.datavalue && responseImage.data.claims.P154[0].mainsnak.datavalue.value){
                    imageName = responseImage.data.claims.P154[0].mainsnak.datavalue.value;
                    imageName = imageName.replace(regex, '_');
                    const imageNameHash = Md5(imageName)
                    const urlImageOnServer = `https://upload.wikimedia.org/wikipedia/commons/${imageNameHash.substring(0,1)}/${imageNameHash.substring(0,2)}/${imageName}`;
                    this.setState({ urlImageOnServer });
                    this.setState({ imageName });
                  } else{
                Axios.get(urlImage2).then((responseImage) => {
                  if (responseImage.data && responseImage.data.claims && responseImage.data.claims.P18 && responseImage.data.claims.P18[0] && responseImage.data.claims.P18[0].mainsnak && responseImage.data.claims.P18[0].mainsnak.datavalue && responseImage.data.claims.P18[0].mainsnak.datavalue.value){
                    imageName = responseImage.data.claims.P18[0].mainsnak.datavalue.value;
                    imageName = imageName.replace(regex, '_');
                    const imageNameHash = Md5(imageName)
                    const urlImageOnServer = `https://upload.wikimedia.org/wikipedia/commons/${imageNameHash.substring(0,1)}/${imageNameHash.substring(0,2)}/${imageName}`;
                    this.setState({ urlImageOnServer });
                    this.setState({ imageName });
		  }
                  });
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
    const wikiLink = `https://${this.props.language}.wikipedia.org/wiki/${this.state.title}`;
    return (this.state.displayWiki) ? (
      <div className={classes.WikidataCard}>
        <div className={`d-flex  justify-content-between ${classes.Header}`}>
          <p className={classes.Title}>
            Wikipedia
          </p>
          <div className={classes.LogoWiki}>
            <img src={logo} alt="wikipedia" />
          </div>
        </div>
        <div className={classes.Content}>
          {
            (this.state.urlImageOnServer)
              ? (
                <div className={classes.Image}>
                  <img alt={this.state.imageName} src={this.state.urlImageOnServer} className={classes.WikiImg} />
                </div>
              ) : null
          }
          <p className={classes.Extract}>
            {this.state.extract}
          </p>
        </div>
        <p className={classes.Footer}>
          <a href={wikiLink} target="_blank" rel="noopener noreferrer">
            {messages[this.props.language].wikiLink}
          </a>
        </p>
      </div>
    ) : null;
  }
}

export default WikidataCard;

WikidataCard.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string,
};
