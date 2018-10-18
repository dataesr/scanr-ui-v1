import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/* CSS */
import classes from './StructuresListItems.scss';

const getMainEntity = (entities) => {
  let mainEntity = entities.find(entity => entity.status === 'main');
  if (!mainEntity) {
    mainEntity = entities[0];
  }
  return mainEntity;
};

const StructuresListItems = props => (
  <section className="container is-fluid">
    <ul className={classes.structureList_ul} role="menu">
      {
          props.structuresList.map((structure, index) => (
            <li
              key={structure.id}
              className={classes.structureList_li}
            >
              <div className="columns">
                <div
                  role="menuitem"
                  tabIndex={index}
                  className={`column is-four-fifths ${classes.link} hvr-icon-forward`}
                >
                  <i className="fa fa-chevron-circle-right hvr-icon" />
                  <NavLink to={`structures/${structure.esr_id}`}>
                    <span className={classes.link_item}>
                      {getMainEntity(structure.names).name_fr}
                    </span>
                  </NavLink>
                </div>
                <div className={`column ${classes.structuresList_id}`}>
                  {structure.id}
                </div>
              </div>
            </li>
          ))// /map
        }
    </ul>
  </section>

);

export default StructuresListItems;

StructuresListItems.propTypes = {
  structuresList: PropTypes.array.isRequired,
};
