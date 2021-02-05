import React from 'react';
import PropTypes from 'prop-types';
import classes from './ProductionList.scss';
import ProductionAuthors from './ProductionAuthors';
import ProductionInfos from './ProductionInfos';

const ProductionItem = ({ props }) => {
  let contentItem;
  const {
    handleChange, checkBoxItems, label: titleLabel, item, itemsActive, language,
  } = props;

  const titleSource = item.value.source ? item.value.source.title : item.value.title;

  if (checkBoxItems) {
    contentItem = (
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="row">
            <div className="col-12">
              <label htmlFor={titleLabel} className={`pl-5 ${classes.Title}`}>
                <div className="row">
                  <div>
                    <input className={classes.HiddenInput} id={titleLabel} onChange={() => handleChange(item.value.id)} type="checkbox" />
                    <i className={`fa-lg ${classes.pointer} ${classes.CustomInput} ${itemsActive.indexOf(item.value.id) > -1 ? 'fas fa-check-square' : 'far fa-square'}`} />
                  </div>
                  <div className="col-12 pb-2">
                    <a
                      className={`${classes.Link} ${classes.pointer}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`publication/${item.value.id.replace(new RegExp('/', 'g'), '%25252f')}`}
                    >
                      {titleLabel}
                    </a>
                  </div>
                  <div className="col-12">
                    <blockquote className={classes.Blockquote}>
                      <ProductionAuthors production={item.value} language={language} />
                      <cite title={titleSource}>
                        <ProductionInfos source={item.value.source} publicationDate={item.value.publicationDate} />
                      </cite>
                    </blockquote>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    contentItem = (
      <React.Fragment>
        <p className={classes.Title}>
          {titleLabel}
        </p>
        <div className={`d-flex align-items-center ${classes.Type}`}>
          <div className="mr-auto" />
          <span className={classes[item.value.productionType]} />
          <p className="m-0">{item.value.type}</p>
        </div>
      </React.Fragment>
    );
  }
  return contentItem;
};

export default ProductionItem;

ProductionItem.propTypes = {
  itemsActive: PropTypes.array,
  handleChange: PropTypes.func,
};
