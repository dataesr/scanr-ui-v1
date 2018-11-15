import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/* CSS */
import classes from './SearchListItems.scss';

const getMainEntity = (entities) => {
  let mainEntity = entities.find(entity => entity.status === 'main');
  if (!mainEntity) {
    ([mainEntity] = entities);
  }
  return mainEntity;
};

const SearchListItems = props => (
  <section className="container is-fluid">
    <ul className={classes.structureList_ul} role="menu">
      {
          props.data.map((entity, index) => (
            <li
              key={entity.id}
              className={classes.structureList_li}
            >
              <div className="columns">
                <div
                  role="menuitem"
                  tabIndex={index}
                  className={`column is-four-fifths ${classes.link} hvr-icon-forward`}
                >
                  <i className="fa fa-chevron-circle-right hvr-icon" />
                  <NavLink to={`${props.match.path}/${entity.id}`}>
                    <span className={classes.link_item}>
                      {entity.names && getMainEntity(entity.names).name_fr}
                    </span>
                  </NavLink>
                </div>
                <div className={`column ${classes.data_id}`}>
                  {entity.id}
                </div>
              </div>
            </li>
          ))// /map
        }
    </ul>
  </section>

);

export default SearchListItems;

SearchListItems.propTypes = {
  data: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};
