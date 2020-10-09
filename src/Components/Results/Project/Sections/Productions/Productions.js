import React from 'react';
import PropTypes from 'prop-types';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import PublicationCard from '../../../../Search/Results/ResultCards/PublicationCard';
import CounterListCard from '../../../../Shared/Ui/CounterListCard/CounterListCard';

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
        props.data.map((prod, index) => {
          if (index < 5) {
            return (
              <div key={prod.id} className="col-4 px-1">
                <PublicationCard
                  language={props.language}
                  data={prod}
                  small="noAuthors"
                />
              </div>
            );
          }
          return null;
        })
      }
      {
        (props.data.length > 6)
          ? (
            <div className="col-4 px-1">
              <CounterListCard
                language={props.language}
                data={props.data}
                limit={5}
                title=""
                color="Default"
                labelKey="other-productions"
                modalTitleKey="productions.modal.title"
                isPublication
              />
            </div>
          ) : null
      }
    </div>
  );
};

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
