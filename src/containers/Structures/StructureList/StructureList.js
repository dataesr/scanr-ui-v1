import React from 'react';
import PropTypes from 'prop-types';

/* CSS */
import classes from './StructureList.scss';

const StructureList = props => (
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
                  onClick={() => props.structureSelected({ structure })}
                  onKeyPress={() => props.structureSelected({ structure })}
                >
                  <i className="fa fa-chevron-circle-right hvr-icon" />
                    &nbsp;
                    &nbsp;
                  {structure.names[0].label}
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

export default StructureList;

StructureList.propTypes = {
  structuresList: PropTypes.array.isRequired,
  structureSelected: PropTypes.func.isRequired,
};
