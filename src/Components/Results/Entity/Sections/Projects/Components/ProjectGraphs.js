import React from 'react';
import PropTypes from 'prop-types';

import BarChart from '../../../../../Shared/GraphComponents/Graphs/HighChartsBar';
import WorldCloud from '../../../../../Shared/GraphComponents/Graphs/HighChartsWordCloud';
import YearChart from '../../../../../Shared/GraphComponents/Graphs/HighChartsLine';
import classes from './ProjectGraphs.scss';

/**
 * ProjectGraphs
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProjectGraphs = (props) => {
  const graphs = ['types', 'years', 'keywords'];
  const labelFor = {
    fr: {
      years: 'Par année',
      keywords: 'Nuage de mots clés',
      types: 'Types de publications',
    },
    en: {
      years: 'By year',
      keywords: 'Keywords cloud',
      types: 'Publication types',
    },
  };
  const active = (props.activeGraph) ? props.activeGraph : 'types';

  const renderGraph = () => {
    if (active === 'keywords') {
      return <WorldCloud filename={active} data={props.graphData[active]} />;
    }
    if (active === 'years') {
      const data = {
        entries: props.graphData[active].entries.sort((a, b) => (a.value - b.value)),
      };
      return <YearChart filename={active} data={data} />;
    }
    return (
      <BarChart filename={active} data={props.graphData[active]} />
    );
  };

  const graphNav = () => (
    graphs.map(graph => (
      <button
        key={graph}
        type="button"
        className={`btn mx-1 ${classes.graphSelector} ${(graph === active) ? classes.active : ''}`}
        onClick={() => props.setActiveGraphHandler(graph)}
        onKeyPress={() => props.setActiveGraphHandler(graph)}
        disabled={props.graphData[graph].entries.length === 0}
      >
        {labelFor[props.language][graph]}
      </button>
    ))
  );
  if (props.totalPerType[props.ProjectType] < 2) {
    return (
      <React.Fragment>
        <div className={`justify-content-center py-1 ${classes.ProjectGraphs}`}>
          <p className={`py-5 pl-4 ${classes.ToFew}`}>
            {
              (props.language === 'fr')
                ? 'Trop peu de publication pour afficher les visualisations'
                : 'Not enought data to print vizualisations'
            }
          </p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.ProjectGraphs}>
        <div className="justify-content-center py-1">
          {graphNav()}
        </div>
        <div className="row">
          <div className={`col-md-12 ${classes.graphCard}`}>
            {renderGraph(props.activeGraph, props.graphData)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectGraphs;

ProjectGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  activeGraph: PropTypes.string,
  setActiveGraphHandler: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  ProjectType: PropTypes.string.isRequired,
  totalPerType: PropTypes.object.isRequired,
};
