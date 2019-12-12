import React from 'react';
import PropTypes from 'prop-types';
import useLikeApi from '../../../../../Hooks/useLikeApi';
import classes from './Similars.scss';
import ProductionCard from '../../../../Search/Results/ResultCards/PublicationCard';
import SectionLoader from '../../../../Shared/LoadingSpinners/GraphSpinner';
import Errors from '../../../../Shared/Errors/Errors';

/**
 * Similars
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Similars = (props) => {
  const id = props.id.replace(new RegExp('%252f', 'g'), '/');
  const request = {
    fields: ['title', 'summary', 'keywords', 'domains.label'],
    likeIds: [id],
    likeTexts: [],
    lang: 'default',
    pageSize: 10,
  };
  const { data, isLoading, isError } = useLikeApi('publications', request);
  if (isLoading) return <SectionLoader />;
  if (isError) return <Errors error={500} />;
  if (data.length) {
    return (
      <div className="row">
        {
          data.slice(0, 6).map(item => (
            <div key={item.value.id} className={`col-md-4 ${classes.CardContainer}`}>
              <ProductionCard
                data={item.value}
                small
                language={props.language}
              />
            </div>
          ))
        }
      </div>
    );
  }
  return null;
};
export default Similars;

Similars.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
