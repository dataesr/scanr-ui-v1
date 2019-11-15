import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import classes from './ProductionList.scss';
import ProductionDetail from './ProductionDetail';

/**
 * ProductionList
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ProductionList = (props) => {
  let selectedProd = {};
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
            {item.value.title.default}
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
