import React, { Suspense, lazy, useState } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import useWindowSize from '../../../Hooks/useWindowSize';
import classes from './Filters.scss';

const EntityFilters = lazy(() => import('./ObjectsFilters/EntityFilters'));
const PersonsFilters = lazy(() => import('./ObjectsFilters/PersonsFilters'));
const ProjectsFilters = lazy(() => import('./ObjectsFilters/ProjectsFilters'));
const PublicationsFilters = lazy(() => import('./ObjectsFilters/PublicationsFilters'));
const ActiveFilterCard = lazy(() => import('./ActiveFilterCard/ActiveFilterCard'));


const FilterPanel = (props) => {
  const windowSize = useWindowSize();
  const [isActive, setActive] = useState((windowSize.width > 992));

  const renderApiFilter = () => {
    switch (props.api) {
      case 'structures': return <EntityFilters {...props} />;
      case 'persons': return <PersonsFilters {...props} />;
      case 'projects': return <ProjectsFilters {...props} />;
      case 'publications': return <PublicationsFilters {...props} />;
      default: return null;
    }
  };

  return (
    <div className={`d-flex flex-column mb-2 ${classes.Filters}`}>
      <ActiveFilterCard
        filters={props.filters}
        multiValueFilterHandler={props.multiValueFilterHandler}
        isMobile={(windowSize.width < 992)}
        isActive={isActive}
        activateFilters={() => setActive(!isActive)}
      />
      <div className={`p-3 mb-2 ${classes.FiltersContainer} ${classes[(isActive) ? 'Visible' : 'Hidden']}`}>
        <div className={classes.FilterHeaders}>
          <FormattedHTMLMessage id="Search.Filters.filterBy" />
        </div>
        <Suspense fallback={<div />}>
          {renderApiFilter({ ...props })}
        </Suspense>
      </div>
    </div>
  );
};

export default FilterPanel;

/* eslint-disable */
// disabledReason: Props are passed as { ...props }
// avoid props in never used linter error
FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  rangeFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
  api: PropTypes.string.isRequired,
  sliderData: PropTypes.array,
};
/* eslint-enable */
