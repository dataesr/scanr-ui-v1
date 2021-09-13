import React from 'react';
import PropTypes from 'prop-types';
import classes from './ProductionList.scss';
import ProductionAuthors from './ProductionAuthors';
import ProductionInfos from './ProductionInfos';
import getExternalInfos from '../../../../../Utils/helpers';

const ProductionItem = ({ props }) => {
  let contentItem;
  const {
    handleChange, checkBoxItems, label: titleLabel, item, itemsActive, language,
  } = props;
  const scanrLink = `publication/${item.value.id.replace(new RegExp('/', 'g'), '%25252f')}`;
  const linkByType = {
    patent: () => scanrLink,
    thesis: () => getExternalInfos(item.value.id, 'thesis').link,
    publication: props.skinnyTheme ? () => getExternalInfos(item.value.id, 'publication').link : () => scanrLink,
  };

  const titleSource = item.value.source ? item.value.source.title : item.value.title;
  const { id: itemId } = item.value;
  if (checkBoxItems) {
    contentItem = (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <label htmlFor={itemId} className={`pl-5 ${classes.Title} ${props.skinnyTheme ? 'pb-0' : ''}`}>
              <div className="row">
                <div>
                  <input className={classes.HiddenInput} id={itemId} onChange={() => handleChange(itemId)} type="checkbox" />
                  <i className={`fa-lg ${classes.pointer} ${classes.CustomInput} ${itemsActive.indexOf(itemId) > -1 ? 'fas fa-check-square' : 'far fa-square'}`} />
                </div>
                <div className={`col-12 ${props.skinnyTheme ? '' : 'pb-2'}`}>
                  <a
                    className={`${classes.Link} ${classes.pointer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={linkByType[item.value.productionType]()}
                  >
                    {titleLabel}
                  </a>
                </div>
                <div className="col-12">
                  <blockquote className={`${classes.Blockquote} ${props.skinnyTheme ? 'mb-1' : ''}`}>
                    <ProductionAuthors
                      production={item.value}
                      maxAuthors={props.skinnyTheme ? 1 : 2}
                      language={language}
                    />
                    {item.value.publicationDate && item.value.source && (
                      <cite title={titleSource}>
                        <ProductionInfos
                          skinnyTheme={props.skinnyTheme}
                          source={item.value.source}
                          publicationDate={item.value.publicationDate}
                        />
                      </cite>
                    )}
                  </blockquote>
                </div>
              </div>
            </label>
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

ProductionItem.defaultprops = {
  skinnyTheme: false,
};
ProductionItem.propTypes = {
  itemsActive: PropTypes.array,
  handleChange: PropTypes.func,
  skinnyTheme: PropTypes.bool,
};
