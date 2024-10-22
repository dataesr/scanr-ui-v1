import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './ProductionDetail.scss';

const ProductionInfos = (props) => {
  const { source, id, publicationDate } = props;

  let date = '';
  if (publicationDate) {
    date = moment(publicationDate).format('YYYY');
  }
  return (
    <div>
      <p className={`${props.skinnyTheme ? 'mb-1' : ''} ${classes.Grey}`}>
        {
          (source && source.title)
            ? <a href={`recherche/publications?filters={"source.title": {"type": "MultiValueSearchFilter", "op": "any", "values": ["${source.title}"]}}`} className={classes.Italic}>{source.title}</a>
            : null
        }
        {(source && source.title && date) ? ' | ' : null}
        {date}
      </p>
      {id && <p className={classes.Grey}>{id}</p>}
    </div>
  );
};

export default ProductionInfos;

ProductionInfos.defaultProps = {
  skinnyTheme: false,
};

ProductionInfos.propTypes = {
  id: PropTypes.string,
  skinnyTheme: PropTypes.bool,
  publicationDate: PropTypes.number.isRequired,
  source: PropTypes.object.isRequired,
};
