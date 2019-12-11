import React from 'react';
import PropTypes from 'prop-types';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import PublicationCard from '../../../../Search/Results/ResultCards/PublicationCard';

/**
 * Productions
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Productions = (props) => {
  if (!props.data) return <EmptySection />;
  return (
    <div className="row">
      {
        props.data.map(prod => (
          <div key={prod.id} className="col-4 px-1">
            <PublicationCard
              language={props.language}
              data={prod}
              small="noAuthors"
            />
          </div>
        ))
      }
    </div>
  );
};

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
