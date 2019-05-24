import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Graphs.scss';
import HighChartsBar from '../../../Focus-pages/focus-1/graphs/HighChartsBar'

const EntityGraphs = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const typeFacets = props.facets.find(item => item.id === 'facet_natures') || { entries: [] }
  const UUFacets = props.facets.find(item => item.id === 'facet_urban_hits') || { entries: [] }
  const UrbanUnitData = {
    labels: UUFacets.entries.slice(0, 10).map(item => (item.value)),
    values: UUFacets.entries.slice(0, 10).map(item => (item.count)),
  };
  const NaturesData = {
    labels: typeFacets.entries.slice(0, 10).map(item => (item.value)),
    values: typeFacets.entries.slice(0, 10).map(item => (item.count)),
  };
  console.log(NaturesData);
  console.log(UrbanUnitData);
  return (
    <React.Fragment>
      <div className="w-100 p-3 mb-3">
        <HighChartsBar
          data={NaturesData}
          temp="blah"
          filename="It rocks"
        />
      </div>
      <div className="w-100 p-3 mb-3">
        <HighChartsBar
          data={UrbanUnitData}
          temp="blah"
          filename="It rocks"
        />
      </div>
    </React.Fragment>
  );
};

export default EntityGraphs;

EntityGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  facets: PropTypes.array,
};
