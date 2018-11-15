import React from 'react';
import { Menu } from 'react-bulma-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { URL_DOC } from '../../config/config';
import SearchBar from './Search-bar/Search-bar';
import classes from './Menu.scss';

const url = window.location.href;
const [baseUrl] = url.match('(.*?/.*?){3}');

const menu = props => (
  <Menu className={classes.sidebar}>
    <img src={`${baseUrl}img/logo.svg`} alt="logo" />
    {props.searchTextHandler && (
      <Menu.List title="Recherche">
        <Menu.List.Item>
          <SearchBar
            searchTextHandler={props.searchTextHandler}
            isLoading={props.isLoading}
            displayFilterPanel={props.displayFilterPanel}
          />
        </Menu.List.Item>
      </Menu.List>)}
    <Menu.List title="General">
      <Menu.List.Item>
        <a href={URL_DOC} target="_blank" rel="noopener noreferrer">
          Documentation
        </a>
      </Menu.List.Item>
      <Menu.List.Item>
          Dashboard
      </Menu.List.Item>
      <Menu.List.Item>
          Conflits
      </Menu.List.Item>
    </Menu.List>
    <Menu.List title="Datastore">
      <Menu.List.Item>
        <NavLink to="/structures" activeClassName={classes.active}>
          Structures
        </NavLink>
      </Menu.List.Item>
      <Menu.List.Item>
        <NavLink to="/entreprises" activeClassName={classes.active}>
          Entreprises
        </NavLink>
      </Menu.List.Item>
      <Menu.List.Item>
        <NavLink to="/institutions" activeClassName={classes.active}>
          Institutions
        </NavLink>
      </Menu.List.Item>
      <Menu.List.Item>
          Publications
      </Menu.List.Item>
      <Menu.List.Item>
          Personnes
      </Menu.List.Item>
    </Menu.List>
    <Menu.List title="Nomenclatures">
      <Menu.List.Item>
        <NavLink to="/badges" activeClassName={classes.active}>
          Badges
        </NavLink>
      </Menu.List.Item>
      <Menu.List.Item>
        <NavLink to="/panelsERC" activeClassName={classes.active}>
          Panels ERC
        </NavLink>
      </Menu.List.Item>
    </Menu.List>
    <Menu.List title="Paramètres">
      <Menu.List.Item>
          1
      </Menu.List.Item>
      <Menu.List.Item>
          2
      </Menu.List.Item>
    </Menu.List>
  </Menu>


);

export default menu;

menu.propTypes = {
  displayFilterPanel: PropTypes.func,
  isLoading: PropTypes.bool,
  searchTextHandler: PropTypes.func,
};
