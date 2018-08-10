import React from 'react';

//import classes from './Search-bar.css';
import {Field, Control, Help} from 'react-bulma-components/lib/components/form';
//import Columns from 'react-bulma-components/lib/components/columns';
//import Container from 'react-bulma-components/lib/components/container';
//import Section from 'react-bulma-components/lib/components/section';

const SearchBar = (props) => {
  return (
    <div>
      <Field>
        <Control iconRight>
          <input className="input is-rounded is-medium" placeholder="Rechercher..." type="text" onChange={props.searchText}/>
            <span className="icon is-small is-right">
              <i className="fas fa-search"></i>
            </span>
        </Control>
        <Help>
          Tapez votre recherche dans la champ ci-dessus. La recherche se lancera automatiquement
        </Help>
      </Field>
    </div>
  );
};

export default SearchBar;
