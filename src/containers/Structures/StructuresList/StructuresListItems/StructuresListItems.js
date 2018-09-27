import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/* CSS */
import classes from './StructuresListItems.scss';

const StructuresListItems = props => (
  <section className="container is-fluid">
    <ul className={classes.structureList_ul} role="menu">
      {
          props.structuresList.map((structure, index) => (
            <li
              key={structure.esr_id}
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
                          {structure.names[0].label}
                        </span>
                      </NavLink>
                  </div>
                <div className={`column ${classes.structuresList_id}`}>
                  {structure.esr_id}
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
