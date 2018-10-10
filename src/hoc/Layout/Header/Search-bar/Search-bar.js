import React from 'react';
import { Field, Control, Help } from 'react-bulma-components/lib/components/form';
import PropTypes from 'prop-types';

// import classes from './Search-bar.css';

const SearchBar = props => (
  <div>
    <Field>
      <Control iconRight>
        <input
          className="input is-rounded is-medium"
          placeholder="Rechercher..."
          type="text"
          onChange={props.searchTextHandler}
        />
        <span className="icon is-small is-right">
          <i className="fas fa-search" />
        </span>
      </Control>
      <Help>
          Tapez votre recherche dans la champ ci-dessus. La recherche se lancera automatiquement
      </Help>
    </Field>
  </div>
);

export default SearchBar;

SearchBar.propTypes = {
  searchTextHandler: PropTypes.func.isRequired,
};
