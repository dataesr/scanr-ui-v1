import React from 'react';
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';
import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';

import classes from './Filters.scss';


const EntityFilters = (props) => {
  const facets = props.facets || [];
  // const generalFacets = props.generalFacets || [];
  const caractActiveFilters = props.filters['badges.label.fr'] || {};
  const kindActiveFilters = props.filters.kind || {};
  const projectsActiveFilters = props.filters.level || {};
  const projectsFacets = facets.find(item => item.id === 'facet_projects_types') || { entries: [] };
  const kindFacets = facets.find(item => item.id === 'facet_kind') || { entries: [] };
  const levelOne = ['Secteur Privé', 'Secteur public', 'Structure de recherche'];
  const kindFacets1 = { entries: kindFacets.entries.filter(entry => levelOne.includes(entry.value)) };
  const kindFacets2 = { entries: kindFacets.entries.filter(entry => !levelOne.includes(entry.value)) };
  // const mainKindFacets = null;
  // const secondaryKindFacets = null;
  const caractFacetsTest = facets.find(item => item.id === 'facet_badges') || { entries: [] };
  const geoFacets = facets.find(item => item.id === 'facet_localisations') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title="Localisation"
          subtitle="régions, départements, communes..."
          placeholder="Localisation"
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="address.localisationSuggestions"
        />
        <SelectFilter
          title="Type d'organisme"
          facets={kindFacets1.entries}
          filters={kindActiveFilters}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <CheckBoxFilter
          title="Type d'organisme"
          facets={kindFacets2.entries}
          filters={kindActiveFilters}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <CheckBoxFilter
          title="Type de financement public"
          facets={projectsFacets.entries}
          filters={projectsActiveFilters}
          facetID="projects.project.type"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <hr />
        <div className={classes.FilterHeaders}>
          Autres filtres
        </div>
        <CheckBoxFilter
          title="Caractéristiques"
          facets={caractFacetsTest.entries}
          filters={caractActiveFilters}
          facetID="badges.label.fr"
          onSubmit={props.multiValueFilterHandler}
          defaultActive={false}
        />
      </div>
    </div>
  );
};

export default EntityFilters;

EntityFilters.propTypes = {
  // language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  // deleteMultiValueSearchFilter: PropTypes.func,
  facets: PropTypes.array,
  // generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
