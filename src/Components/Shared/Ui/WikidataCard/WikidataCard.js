import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import getSelectKey from '../../../../Utils/getSelectKey';

import SubmitBox from '../../SubmitBox/SubmitBox';

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
    data: null,
  }

  getData = () => {
    const url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q273523&sitefilter=enwiki|frwiki&props=sitelinks&format=json';
  }

  render() {
    return (
      <div className={classes.WikidataCard}>
        {(this.props.modifyMode) ? <SubmitBox language={this.props.language} masterKey={this.props.masterKey} label={getSelectKey(this.props.allData, 'label', this.props.language, 'fr')} /> : null}
      </div>
    );
  }
}

export default WikidataCard;

WikidataCard.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
