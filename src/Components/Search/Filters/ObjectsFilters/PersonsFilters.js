import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const PersonsFilters = (props) => {
  const facets = props.facets || [];
  const structFacets = facets.find(item => item.id === 'affiliations') || { entries: [] };
  const awardsActiveFilters = props.filters.awards || {};
  const awardsFacets = facets.find(item => item.id === 'awards') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title={messages[props.language]['filters.localisation']}
          subtitle={messages[props.language]['filters.subtitle']}
          placeholder=""
          onSubmit={props.multiValueFilterHandler}
          facets={structFacets.entries}
          facetID="affiliations.structure.label.fr"
        />
        <CheckBoxFilter
          defaultActive
          retractable={false}
          nbItemsToShow={5}
          title="Prix et distinction"
          facets={awardsFacets.entries}
          filters={awardsActiveFilters}
          facetID="awards.label"
          onSubmit={props.multiValueFilterHandler}
        />
      </div>
    </div>
  );
};

export default PersonsFilters;

PersonsFilters.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  filters: PropTypes.object,
};
