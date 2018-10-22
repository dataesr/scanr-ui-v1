import React from 'react';
import { Menu } from 'react-bulma-components';
import { NavLink } from 'react-router-dom';
import { URL_DOC } from '../../../config/config';
import classes from './Menu.scss';

const menu = () => (
  <Menu className={classes.sidebar}>
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

    <Menu.List title="Databases">

      <Menu.List.Item>
        <Menu.List title="Organisations">
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
        </Menu.List>
      </Menu.List.Item>
      <Menu.List.Item>
          Publications
      </Menu.List.Item>
      <Menu.List.Item>
          Personnes
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
