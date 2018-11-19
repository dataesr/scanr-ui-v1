import React from 'react';
import PropTypes from 'prop-types';

// Composants UI
import FilterListFields from '../../../../Fields/FilterListFields/FilterListFields';

const Contributors = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-3">
      <FilterListFields
        data={props.co_contributors}
        title="Co-contributeurs"
      />
    </div>
    <div className="column is-3">
      <FilterListFields
        data={props.co_contributors_name_2}
        title="Co-contributeurs Name 2"
      />
    </div>
  </div>
);

export default Contributors;

Contributors.propTypes = {
  getPerson: PropTypes.func,
  co_contributors: PropTypes.array,
  co_contributors_name_2: PropTypes.array,
  url: PropTypes.string,
};
