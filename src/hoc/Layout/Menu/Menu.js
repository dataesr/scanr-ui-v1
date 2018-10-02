import React from 'react';
import { Menu } from 'react-bulma-components';
import { NavLink } from 'react-router-dom';
import classes from './Menu.scss';

const menu = () => (
  <Menu className={classes.sidebar}>
    <Menu.List title="General">
      <Menu.List.Item>
        Documentation
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
              institutions
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
