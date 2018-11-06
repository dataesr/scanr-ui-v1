import React from 'react';
import { Field, Control } from 'react-bulma-components/lib/components/form';
import PropTypes from 'prop-types';

const SearchBar = props => (
  <div>
    <Field>
      <Control iconRight>
        <input
          className="input is-rounded is-small"
          placeholder="Rechercher..."
          type="text"
          onChange={props.searchTextHandler}
        />
        <span className="icon is-small is-right">
          {props.isLoading ? <i className="fas fa-spinner" /> : <i className="fas fa-search" />}
        </span>
      </Control>
    </Field>
  </div>
);

export default SearchBar;

SearchBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchTextHandler: PropTypes.func.isRequired,
};
