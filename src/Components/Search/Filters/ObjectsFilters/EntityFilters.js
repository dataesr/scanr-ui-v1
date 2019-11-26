import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Filters.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

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
  const caractActiveFilters = props.filters[`badges.label[${props.language}]`] || {};
  const caractFacets = facets.find(item => item.id === `badges${props.language}`) || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title={messages[props.language]['filters.localisation']}
          subtitle={messages[props.language]['filters.subtitle']}
          placeholder="Localisation"
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="address.localisationSuggestions"
        />
        <CheckBoxFilter
          title={messages[props.language]['filters.sectors']}
          facets={kindFacetsSecteur.entries}
          filters={kindActiveFiltersSecteur}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <CheckBoxFilter
          title={messages[props.language]['filters.kind']}
          facets={kindFacetsOrganisme.entries}
          filters={kindActiveFiltersOrganisme}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <CheckBoxFilter
          title={messages[props.language]['filters.publicFunding']}
          facets={projectsFacets.entries}
          filters={projectsActiveFilters}
          facetID="projects.project.type"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <hr
          style={{
            height: '2px',
            color: classes.entityColor,
            backgroundColor: classes.entityColor,
          }}
        />
        <div className={classes.FilterHeaders}>
          {messages[props.language]['filters.others']}
        </div>
        <CheckBoxFilter
          title={messages[props.language]['filters.caracteristics']}
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
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  // generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
