import React from 'react';
import PropTypes from 'prop-types';

// import SunburstChart from '../../../../../Shared/GraphComponents/Graphs/HighChartsSunburst';
import BarChart from '../../../../../Shared/GraphComponents/Graphs/HighChartsBar';
import WorldCloud from '../../../../../Shared/GraphComponents/Graphs/HighChartsWordCloud';
import YearChart from '../../../../../Shared/GraphComponents/Graphs/HighChartsLine';
import classes from './ProductionGraphs.scss';

/**
 * ProductionGraphs
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProductionGraphs = (props) => {
  const graphFor = {
    thesis: ['isOa', 'years', 'keywords'],
    publication: ['isOa', 'years', 'keywords', 'journal', 'types'],
    patent: ['isOa'],
  };
  const labelFor = {
    fr: {
      isOa: 'Open Access',
      years: 'Par année',
      keywords: 'Nuage de mots clés',
      journal: 'Top 10 des journaux',
      types: 'Types de publications',
    },
    en: {
      isOa: 'Open Access',
      years: 'By year',
      keywords: 'Keywords cloud',
      journal: 'Top 10 journals',
      types: 'Publication types',
    },
  };

  const active = (props.activeGraph) ? props.activeGraph : graphFor[props.productionType][0];

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
    graphFor[props.productionType].map(graph => (
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

  return (
    <React.Fragment>
      <div className="justify-content-center py-1">
        {graphNav()}
      </div>
      <div className="row">
        <div className={`col-md-12 ${classes.graphCard}`}>
          {renderGraph(props.activeGraph, props.graphData)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductionGraphs;

ProductionGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  activeGraph: PropTypes.string,
  setActiveGraphHandler: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  productionType: PropTypes.string.isRequired,
};
