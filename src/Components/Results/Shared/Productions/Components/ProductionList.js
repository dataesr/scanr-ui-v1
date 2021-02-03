import React, {
  useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ProductionDetail from './ProductionDetail';
import ProductionItem from './ProductionItem';
import getSelectKey from '../../../../../Utils/getSelectKey';
import CSVExporter from '../../../../Shared/CSVExporter/CSVExporter';
import Loader from '../../../../Shared/LoadingSpinners/RouterSpinner';

/* SCSS */
import classes from './ProductionList.scss';
import style from '../../../../../style.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
import useIntersect from '../../../../../Hooks/useIntersect';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
const wrapperBtnExportHeight = 44;

const getModalHeight = () => {
  const modal = document.querySelector('.Modal');
  let modalHeight = null;
  if (modal) {
    modalHeight = modal.getBoundingClientRect().height;
  }
  return Math.round(modalHeight);
};

const productionsListHeight = (maxHeight, elementClasses: Array = []) => {
  let listHeight = maxHeight() - wrapperBtnExportHeight;

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
  const contentListElement = useRef(null);
  const loadMoreElement = useRef(null);
  const defaultListHeight = (props.styleList && props.styleList.defaultHeight) || 515;
  const elementClasses = ['modal-header', 'content-header', 'search-suggested-productions'];
  const [heightList, setHeightList] = useState(defaultListHeight);
  const [maxListHeight, setMaxListHeight] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  let dataContent = null;
  const [setNode, entry] = useIntersect({
    treshold: 0.25,
  });
  let selectedProd = {};
  const dataCSVColumns = [
    { id: 'col1', displayName: messages[props.language]['dataCSVColumns.col1'] },
    { id: 'col2', displayName: messages[props.language]['dataCSVColumns.col2'] },
    { id: 'col3', displayName: messages[props.language]['dataCSVColumns.col3'] },
  ];
  const dataCSV = [];
  const renderDataContent = () => {
    if (props.data.length === 0) return null;

    dataContent = props.data.map((item, i) => {
      let first = false;
      if (i > 0 && !props.loadMoreAction) {
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
        <React.Fragment key={`${item.value.id}-${item.value.publicationDate}`}>
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
            // ref={i === props.data.length - 1 ? loadMoreElement : null}
          >
            <ProductionItem
              props={{
                language: props.language,
                checkBoxItems: props.checkBoxItems,
                itemsActive: props.itemsActive,
                handleChange: props.checkItem,
                label,
                item,
              }}
            />
          </div>
          {props.loadMoreAction && i === props.data.length - 1 ? <div className="py-2 bg-white" ref={loadMoreElement}><Loader style={{ width: 'auto' }} color={style.scanrmiddlegreyColor} /></div> : null}
        </React.Fragment>
      );
    });
    return <div ref={contentListElement}>{dataContent}</div>;
  };

  function manageHeightList() {
    const currentList = contentListElement.current;
    setMaxListHeight(productionsListHeight(getModalHeight, elementClasses));
    setHeightList(maxListHeight < 0 ? defaultListHeight : maxListHeight);

    if (!currentList) return;

    if (currentList.clientHeight <= maxListHeight) {
      setHeightList(defaultListHeight);
    }
  }

  useEffect(() => {
    manageHeightList();
    if (loadMoreElement.current) {
      setNode(loadMoreElement.current);
    }
  }, [manageHeightList]);

  useEffect(() => {
    if (entry.isIntersecting && props.loadMoreAction && loadMore) {
      props.loadMoreAction({ loadMore: true });
      setLoadMore(false);
    }

    if (!loadMore && props.loadMoreAction) {
      setLoadMore(true);
    }
  }, [entry]);

  return (
    <>
      <div className="row">
        <div className={(props.styleList && props.styleList.width) || 'col-lg-5'}>
          <div
            style={{ height: heightList }}
            className={`${classes.ListOfProductions} ${props.styleList && props.styleList.theme === 'skinny' ? classes.Skinny : ''}`}
          >
            {(!props.loading) ? renderDataContent() : <Loader color={style.scanrmiddlegreyColor} style={{ width: 'auto', height: '100%' }} />}
          </div>
          {(props.data.length > 0 && !props.loading) ? (
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
          Object.keys(selectedProd).length === 0 && (
          <div className="col-lg-7">
            <ProductionDetail language={props.language} data={selectedProd} />
          </div>
          )
        }
      </div>
    </>
  );
};

export default ProductionList;

ProductionList.defaultProps = {
  loading: false,
};

ProductionList.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedProduction: PropTypes.string,
  itemsActive: PropTypes.array,
  styleList: PropTypes.object,
  checkBoxItems: PropTypes.bool,
  loading: PropTypes.bool,
  checkItem: PropTypes.func,
  loadMoreAction: PropTypes.func,
  setSelectedProductionHandler: PropTypes.func,
};
