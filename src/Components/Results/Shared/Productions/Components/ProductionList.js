import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ProductionDetail from './ProductionDetail';
import ProductionItem from './ProductionItem';
import getSelectKey from '../../../../../Utils/getSelectKey';
import CSVExporter from '../../../../Shared/CSVExporter/CSVExporter';
import Loader from '../../../../Shared/LoadingSpinners/RouterSpinner';

/* SCSS */
import classes from './ProductionList.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const getModalHeight = () => {
  const modal = document.querySelector('.Modal');
  let modalHeight = null;
  if (modal) {
    modalHeight = modal.getBoundingClientRect().height;
  }
  return Math.round(modalHeight);
};

const productionsListHeight = (maxHeight, elementClasses = []) => {
  let listHeight = maxHeight() - 44;

  if (elementClasses && listHeight) {
    elementClasses.forEach((cl) => {
      const el = document.querySelector(`.${cl}`);
      if (el) {
        const elementHeight = el.getBoundingClientRect().height;
        listHeight -= elementHeight;
      }
    });
  }
  return listHeight;
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
  const defaultListHeight = (props.styleList && props.styleList.defaultHeight) || 515;
  const elementClasses = ['modal-header', 'content-header'];
  const [heightList, setHeightList] = useState(defaultListHeight);
  const contentList = useRef(null);

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
          className={`${classes.Item} ${selected} ${props.checkBoxItems ? '' : classes.pointer}`}
          onClick={() => (props.setSelectedProductionHandler ? props.setSelectedProductionHandler(item.value.id) : null)}
          onKeyPress={() => (props.setSelectedProductionHandler ? props.setSelectedProductionHandler(item.value.id) : null)}
          role="button"
          tabIndex={0}
        >
          <ProductionItem props={{
            language: props.language,
            checkBoxItems: props.checkBoxItems,
            itemsActive: props.itemsActive,
            handleChange: props.checkItem,
            label,
            item,
          }}
          />
        </div>
      </React.Fragment>
    );
  });

  useEffect(() => {
    const maxListHeight = productionsListHeight(getModalHeight, elementClasses);
    const currentList = contentList.current;

    if (!currentList) {
      setHeightList(maxListHeight);
    } else if (currentList && currentList.clientHeight <= maxListHeight) {
      setHeightList(defaultListHeight);
    }
  }, [props.data]);

  return (
    <React.Fragment>
      <div className="row">
        <div className={(props.styleList && props.styleList.width) || 'col-lg-5'}>
          <div
            style={{ height: heightList }}
            className={`${classes.ListOfProductions} ${props.styleList && props.styleList.theme === 'skinny' ? classes.Skinny : ''}`}
          >
            {(content.length > 0) ? <div ref={contentList}>{content}</div> : <Loader style={{ width: 'auto', height: '100%' }} />}
          </div>
          {(content.length > 0) ? (
            <div className="py-2 wrapper-btn-export">
              <CSVExporter
                language={props.language}
                columns={dataCSVColumns}
                data={dataCSV}
                fileName="productions_export"
              />
            </div>
          ) : null}
        </div>
        {
          selectedProd && (
          <div className="col-lg-7">
            <ProductionDetail language={props.language} data={selectedProd} />
          </div>
          )
        }
      </div>
    </React.Fragment>
  );
};

export default ProductionList;

ProductionList.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedProduction: PropTypes.string,
  itemsActive: PropTypes.array,
  styleList: PropTypes.object,
  checkBoxItems: PropTypes.bool,
  checkItem: PropTypes.func,
  setSelectedProductionHandler: PropTypes.func,
};
