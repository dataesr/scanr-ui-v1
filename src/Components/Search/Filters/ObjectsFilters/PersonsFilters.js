import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';

import classes from './Filters.scss';

const PersonsFilters = (props) => {
  const facets = props.facets || [];
  const structFacets = facets.find(item => item.id === 'affiliations') || { entries: [] };
  const awardsActiveFilters = props.filters['awards.label'] || {};
  const awardsFacets = facets.find(item => item.id === 'awards') || { entries: [] };
  const rolesActiveFilters = props.filters['roles.role'] || {};
  const rolesFacets = facets.find(item => item.id === 'roles') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.affiliation" />}
          subtitle={<FormattedHTMLMessage id="Search.Filters.affiliation.subtitle" />}
          placeholder=""
          onSubmit={props.multiValueFilterHandler}
          facets={structFacets.entries}
          facetID="affiliations.structure.label.fr"
        />
        <hr
          style={{
            height: '2px',
            color: classes.personColor,
            backgroundColor: classes.personColor,
          }}
        />
        <CheckBoxFilter
          language={props.language}
          defaultActive
          retractable={false}
          nbItemsToShow={5}
          title={<FormattedHTMLMessage id="Search.Filters.awards" />}
          facets={awardsFacets.entries}
          filters={awardsActiveFilters}
          facetID="awards.label"
          onSubmit={props.multiValueFilterHandler}
        />
        <hr
          style={{
            height: '2px',
            color: classes.personColor,
            backgroundColor: classes.personColor,
          }}
        />
        <CheckBoxFilter
          language={props.language}
          defaultActive
          retractable={false}
          nbItemsToShow={5}
          title={<FormattedHTMLMessage id="Search.Filters.roles" />}
          facets={rolesFacets.entries}
          filters={rolesActiveFilters}
          facetID="roles.role"
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
