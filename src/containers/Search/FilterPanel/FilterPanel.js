import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'react-bulma-components';
import Checkbox from './Checkbox/Checkbox';
import classes from './FilterPanel.scss';

const filterPanel = (props) => {
  const renderMenuListItems = items => items.map(item => (
    <Menu.List.Item key={`${item.name} ${item.value}`}>
      <Checkbox
        checked={props.activeFilters[item.name] === item.value}
        {...item}
        id={`${item.name} ${item.value}`}
        onChange={props.selectFilter}
      />
    </Menu.List.Item>
  ));

  let style = { transform: `translate3d(-${document.body.clientWidth}px, 0, 0)` };
  if (props.visible) {
    style = {
      transform: 'translate3d(275px, 0, 0)',
    };
  }
  return (
    <div className={`columns is-marginless ${classes.PanelContainer}`} style={style}>
      <Menu className={`column is-2 ${classes.Panel}`}>
        <div className={classes.TextTitleBlock}>
          <i className="fas fa-filter" />
          &nbsp;Filtres
        </div>
        {props.filtersConfig.map(list => (
          <Menu.List title={list.title} key={list.title}>
            {renderMenuListItems(list.checkboxes)}
          </Menu.List>))}
      </Menu>
      <div className="column" onClick={props.hideFilterPanel} role="presentation" />
    </div>);
};

export default filterPanel;

filterPanel.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  filtersConfig: PropTypes.array.isRequired,
  hideFilterPanel: PropTypes.func.isRequired,
  selectFilter: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
