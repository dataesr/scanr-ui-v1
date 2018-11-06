import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'react-bulma-components';

import classes from './FilterPanel.scss';

const filterPanel = (props) => {
  let style = { transform: 'translate3d(-108vh, 0, 0)' };
  if (props.visible) {
    style = {
      transform: 'translate3d(287px, 0, 0)',
    };
  }
  return (
    <div className={`columns ${classes.PanelContainer}`} style={style}>
      <Menu className={`column is-2 ${classes.Panel}`}>
        <div className={classes.TextTitleBlock}>Filtres</div>
        <Menu.List title="Statut">
          <Menu.List.Item>
            <label className="checkbox">
              <input type="checkbox" />
                &nbsp; Active
            </label>
          </Menu.List.Item>
          <Menu.List.Item>
          <label className="checkbox">
            <input type="checkbox" />
              &nbsp; Non active
          </label>
          </Menu.List.Item>
        </Menu.List>
      </Menu>
      <div className="column" onClick={props.hideFilterPanel}/>
    </div>);
};

export default filterPanel;

filterPanel.propTypes = {
  hideFilterPanel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
