import React from 'react';
import PropTypes from 'prop-types';

// Composants UI
import FilterListFields from '../../../../Fields/FilterListFields/FilterListFields';

const Contributors = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-4-widescreen is-6-desktop is-12-mobile">
      <FilterListFields
        data={props.co_contributors}
        title="Co-contributeurs"
        redirection="persons"
      />
    </div>
    <div className="column is-4-widescreen is-6-desktop is-12-mobile">
      <FilterListFields
        data={props.co_contributors_name_2}
        title="Co-contributeurs Name 2"
      />
    </div>
  </div>
);

export default Contributors;

Contributors.propTypes = {
  co_contributors: PropTypes.array,
  co_contributors_name_2: PropTypes.array,
};
