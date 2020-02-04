import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import classes from './ProductionList.scss';
import ProductionDetail from './ProductionDetail';
import getSelectKey from '../../../../../Utils/getSelectKey';
import CSVExporter from '../../../../Shared/CSVExporter/CSVExporter';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * ProductionList
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Productions
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProductionList = (props) => {
  let selectedProd = {};

  const dataCSVColumns = [
    { id: 'col1', displayName: messages[props.language]['dataCSVColumns.col1'] },
    { id: 'col2', displayName: messages[props.language]['dataCSVColumns.col2'] },
    { id: 'col3', displayName: messages[props.language]['dataCSVColumns.col3'] },
  ];
  const dataCSV = [];

  const content = props.data.map((item, i) => {
    let first = false;
    if (i > 0) {
      first = (moment(props.data[i - 1].value.publicationDate).format('YYYY') !== moment(item.value.publicationDate).format('YYYY'));
    }
    let selected = '';
    if (item.value.id === props.selectedProduction) {
      selected = classes.Selected;
      selectedProd = item.value;
    }
    const label = getSelectKey(item.value, 'title', props.language, 'default');
    dataCSV.push(
      {
        col1: item.value.id,
        col2: label.replace(/"/g, ''),
        col3: item.value.type,
      },
    );
    return (
      <React.Fragment key={item.value.id}>
        {
          (i === 0 || first)
            ? (
              <div className={classes.TitleYear}>
                {
                  moment(item.value.publicationDate).format('YYYY')
                }
              </div>
            )
            : null
        }
        <div
          className={`${classes.Item} ${selected}`}
          onClick={() => props.setSelectedProductionHandler(item.value.id)}
          onKeyPress={() => props.setSelectedProductionHandler(item.value.id)}
          role="button"
          tabIndex={0}
        >
          <p className={classes.Title}>
            {label}
          </p>
          <div className={`d-flex align-items-center ${classes.Type}`}>
            <div className="mr-auto" />
            <span className={classes[item.value.productionType]} />
            <p className="m-0">{item.value.type}</p>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-5">
          <div className={classes.ListOfProductions}>
            {(content.length > 0) ? content : 'Aucun résultat'}
          </div>
          {(content.length > 0) ? (
            <div className="pt-2">
              <CSVExporter
                language={props.language}
                columns={dataCSVColumns}
                data={dataCSV}
                fileName="productions_export"
              />
            </div>
          ) : null}
        </div>
        <div className="col-lg-7">
          <ProductionDetail language={props.language} data={selectedProd} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductionList;

ProductionList.propTypes = {
  language: PropTypes.string.isRequired,
  selectedProduction: PropTypes.string.isRequired,
  setSelectedProductionHandler: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
