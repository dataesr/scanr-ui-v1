import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Graphs.scss';
import GraphComponents from '../../../Shared/GraphComponents/GraphComponents';

const EntityGraphs = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  // typeFacet =
  return (
    <React.Fragment>
      <div className="w-100 p-3 mb-3">
        <GraphComponents
          language={props.language}
          title="blah"
          subtitle="blah"
          data={props.facets}
          filename="It rocks"
          tags={['blah']}
          type="bar"
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
