import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';

import classes from './Filters.scss';

const EntityFilters = (props) => {
  // A utiliser en cas de "ET"
  const facets = props.facets || [];

  // A utiliser en cas de "OU"
  // const generalFacets = props.generalFacets || [];

  // Filtre 1 - Localisation
  const geoFacets = facets.find(item => item.id === 'localisations') || { entries: [] };

  // Filtre 2 - Secteur de l'organisme
  const kindFacets = facets.find(item => item.id === 'kind') || { entries: [] };
  const levelOne = ['Secteur Privé', 'Secteur public', 'Structure de recherche'];
  const kindActiveFiltersSecteur = props.filters.kind || {};
  const kindFacetsSecteur = { entries: kindFacets.entries.filter(entry => levelOne.includes(entry.value)) };

  // Filtre 3 - Type d'organisme
  const kindActiveFiltersOrganisme = props.filters.kind || {};
  const kindFacetsOrganisme = { entries: kindFacets.entries.filter(entry => !levelOne.includes(entry.value)) };

  // Filtre 4 - Type de financement public
  const projectsActiveFilters = props.filters['projects.project.type'] || {};
  const projectsFacets = facets.find(item => item.id === 'projectTypes') || { entries: [] };

  // Filtre 5 - Caractéristiques
  const caractActiveFilters = props.filters['badges.label.fr'] || {};
  const caractFacets = facets.find(item => item.id === 'badgesFr') || { entries: [] };

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
        <CheckBoxFilter
          title="Secteur de l'organisme"
          facets={kindFacetsSecteur.entries}
          filters={kindActiveFiltersSecteur}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <CheckBoxFilter
          title="Type d'organisme"
          facets={kindFacetsOrganisme.entries}
          filters={kindActiveFiltersOrganisme}
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
          facets={caractFacets.entries}
          filters={caractActiveFilters}
          facetID="badges.label.fr"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
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
