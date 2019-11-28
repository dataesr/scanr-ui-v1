import React from 'react';
import PropTypes from 'prop-types';

import BarChart from '../../../../Shared/GraphComponents/Graphs/HighChartsBar';
import WorldCloud from '../../../../Shared/GraphComponents/Graphs/HighChartsWordCloud';
import YearChart from '../../../../Shared/GraphComponents/Graphs/HighChartsLine';
import DonutChart from '../../../../Shared/GraphComponents/Graphs/HighChartsDonut';
import TypeMapping from '../Utils/TypeMapping';
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
      isOa: "Taux d'accès ouvert",
      years: 'Publications par année',
      keywords: 'Nuage de mots clés des publications',
      journal: 'Top 10 des journaux',
      types: 'Types de publications',
    },
    en: {
      isOa: 'Open Access',
      years: 'Publications by year',
      keywords: 'Publications wordcloud',
      journal: 'Top 10 journals',
      types: 'Publication types',
    },
  };

  const active = (props.activeGraph) ? props.activeGraph : graphFor[props.productionType][0];

  const renderGraph = () => {
    if (active === 'keywords') {
      return <WorldCloud filename={labelFor[props.language][active]} data={props.graphData[active]} />;
    }
    if (active === 'isOa') {
      const data = { id: 'isOa', entries: [] };
      props.graphData.isOa.entries.forEach((entry) => {
        if (entry.value === 'false') {
          data.entries.push({
            color: 'rgb(170, 170, 170)',
            value: (props.language === 'fr') ? 'Accès fermé' : 'Closed access',
            count: entry.count,
          });
        } else {
          data.entries.push({
            color: 'rgb(32, 225, 104)',
            value: (props.language === 'fr') ? 'Accès ouvert' : 'Open access',
            count: entry.count,
          });
        }
      });
      return <DonutChart filename={labelFor[props.language][active]} data={data} language={props.language} />;
    }
    if (active === 'years') {
      const data = {
        entries: props.graphData[active].entries.sort((a, b) => (a.value - b.value)),
      };
      return <YearChart filename={active} data={data} language={props.language} />;
    }
    if (active === 'types') {
      const typesData = { id: 'types', entries: [] };
      props.graphData.types.entries.forEach((entry) => {
        const type = { ...entry };
        type.value = TypeMapping[props.language][entry.value];
        typesData.entries.push(type);
      });
      return <BarChart filename={labelFor[props.language][active]} data={typesData} language={props.language} />;
    }
    return (
      <BarChart filename={labelFor[props.language][active]} data={props.graphData[active]} language={props.language} />
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
  if (props.totalPerType[props.productionType] < 2) {
    return (
      <React.Fragment>
        <div className={`justify-content-center py-1 ${classes.ProductionGraphs}`}>
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
      <div className={classes.ProductionGraphs}>
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

export default ProductionGraphs;

ProductionGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  activeGraph: PropTypes.string,
  setActiveGraphHandler: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  productionType: PropTypes.string.isRequired,
  totalPerType: PropTypes.object.isRequired,
};
