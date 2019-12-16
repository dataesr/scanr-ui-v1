import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';
import { GRAPH_ITEMS_LIST } from '../../../../config/config';

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
  const kindActiveFiltersSecteur = props.filters.kind || {};
  const kindFacetsSecteur = { entries: kindFacets.entries.filter(entry => GRAPH_ITEMS_LIST.includes(entry.value)) };

  // Filtre 3 - Type d'organisme
  const levelActiveFiltersOrganisme = props.filters.level || {};
  const levelFacetsOrganisme = facets.find(item => item.id === 'level') || { entries: [] };

  // Filtre 4 - Tutelles
  // const tutActiveFiltersOrganisme = props.filters['institutions.structure.label.fr']
  const tutFacetsOrganisme = facets.find(item => item.id === 'tutelles') || { entries: [] };

  // Filtre 5 - Type de financement public
  const projectsActiveFilters = props.filters['projects.project.type'] || {};
  const projectsFacets = facets.find(item => item.id === 'projectTypes') || { entries: [] };

  // Filtre 6 - Caractéristiques
  const caractActiveFilters = props.filters[`badges.label[${props.language}]`] || {};
  const caractFacets = facets.find(item => item.id === `badges${props.language}`) || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title={<FormattedHTMLMessage id="Search.Filters.localisation" />}
          subtitle={<FormattedHTMLMessage id="Search.Filters.localisation.subtitle" />}
          placeholder=""
          language={props.language}
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="address.localisationSuggestions"
        />
        <CheckBoxFilter
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.sectors" />}
          facets={kindFacetsSecteur.entries}
          filters={kindActiveFiltersSecteur}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <CheckBoxFilter
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.kind" />}
          facets={levelFacetsOrganisme.entries}
          filters={levelActiveFiltersOrganisme}
          facetID="kind"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
        />
        <Autocomplete
          title={<FormattedHTMLMessage id="Search.Filters.tutelles" />}
          subtitle={<FormattedHTMLMessage id="Search.Filters.tutelles.subtitle" />}
          placeholder=""
          language={props.language}
          onSubmit={props.multiValueFilterHandler}
          facets={tutFacetsOrganisme.entries}
          facetID="institutions.structure.label.fr"
        />
        <CheckBoxFilter
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.publicFunding" />}
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
          <FormattedHTMLMessage id="Search.Filters.others" />
        </div>
        <CheckBoxFilter
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.caracteristics" />}
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
