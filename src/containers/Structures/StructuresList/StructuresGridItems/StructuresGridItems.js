import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/* CSS */
import classes from './StructuresGridItems.scss';

const structuresGridItems = props => (
  <section className={`columns is-multiline ${classes.Section}`}>
    {
        props.structuresList.map(structure => (
          <div className="column is-one-third-desktop is-half-tablet">
            <div className={`card ${classes.GridCard}`} key={structure.esr_id}>
              <div className="card-content">

                <div className="columns">
                  <div className="column is-11">
                    <NavLink to={`structures/${structure.esr_id}`}>
                      <span className={`${classes.lineClamp} ${classes.lineClamp2} ${classes.Link_item}`}>
                        {structure.names[0].label}
                      </span>
                    </NavLink>
                  </div>
                  <div className="column">
                    {/*<StructureStatus status={structure.status} />*/}
                  </div>
                </div>


                <div className={classes.Complementary}>
                  <div className={classes.Id}>
                    <i className="fas fa-fingerprint" />
                    <span>
                      {structure.esr_id}
                    </span>
                  </div>
                  <div className={classes.Address}>
                    <i className="fas fa-map-marker-alt" />
                    <span>
                      {structure.addresses[0].city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))// /map
      }
  </section>
);

export default structuresGridItems;

structuresGridItems.propTypes = {
  structuresList: PropTypes.array.isRequired,
};
