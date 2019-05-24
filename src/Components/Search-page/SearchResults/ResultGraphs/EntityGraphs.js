import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Graphs.scss';


const EntityGraphs = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const UrbanUnitData = 1
  const NaturesData = 1
  return (
    <div />
  );
};

export default EntityGraphs;

EntityGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  facets: PropTypes.array,
};
