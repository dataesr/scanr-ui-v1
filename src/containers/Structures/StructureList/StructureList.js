import React from 'react';

/* CSS */
import classes from './StructureList.scss';
// import main_classes from '../../../App.css';

const StructureList = props => (
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
                  onClick={() => props.structureSelected({ structure })}
                  onKeyPress={() => props.structureSelected({ structure })}
                >
                  <i className="fa fa-chevron-circle-right hvr-icon" />
                    &nbsp;
                    &nbsp;
                  {structure.names[0].label}
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

export default StructureList;
