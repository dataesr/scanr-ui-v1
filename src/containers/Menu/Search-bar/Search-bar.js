import React from 'react';
import { Field, Control } from 'react-bulma-components/lib/components/form';
import PropTypes from 'prop-types';

import classes from './Search-bar.scss';

const SearchBar = props => (
  <div>
    <Field>
      <Control iconRight>
        <input
          className="input is-rounded is-small"
          placeholder="Rechercher..."
          type="text"
          onChange={props.searchTextHandler}
          onClick={props.displayFilterPanel}
        />
        <span className="icon is-small is-right">
          {props.isLoading ? <i className="fas fa-spinner" /> : <i className="fas fa-search" />}
        </span>
      </Control>
    </Field>
    <div className={classes.FiltersLink} onClick={props.displayFilterPanel}>
      <i className="fas fa-filter" />
      &nbsp;Afficher les filtres
    </div>
  </div>
);

export default SearchBar;

SearchBar.propTypes = {
  displayFilterPanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchTextHandler: PropTypes.func.isRequired,
};
