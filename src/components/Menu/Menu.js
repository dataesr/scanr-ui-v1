import React from 'react';
import {Menu} from 'react-bulma-components';
import classes from './Menu.scss';

const menu = (props) => {
  return (
    <Menu className={classes.sidebar}>
      <Menu.List title="General">
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
            <Menu.List.Item className={classes.active}>
              Structures
            </Menu.List.Item>
            <Menu.List.Item>
              Entreprises
            </Menu.List.Item>
            <Menu.List.Item>
              Institutions
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
}

export default menu;
