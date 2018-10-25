import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import StructureStatus from '../../../../UI/StatusTagMini/StatusTagMini';

/* CSS */
import classes from './StructuresGridItems.scss';

const getMainEntity = (entities) => {
  let mainEntity = entities.find(entity => entity.status === 'main');
  if (!mainEntity) {
    mainEntity = entities[0];
  }
  return mainEntity;
};

const structuresGridItems = props => (
  <section className={`columns is-multiline ${classes.Section}`}>
    {
        props.structuresList.map(structure => (
          <div key={structure.id} className="column is-one-third-desktop is-half-tablet">
            <div className={`card ${classes.GridCard}`} key={structure.id}>
              <div className="card-content">
                <div className="columns">
                  <div className="column is-11">
                    <NavLink to={`structures/${structure.id}`}>
                      <span className={`${classes.lineClamp} ${classes.lineClamp2} ${classes.Link_item}`}>
                        {getMainEntity(structure.names).name_fr}
                      </span>
                    </NavLink>
                  </div>
                  <div className="column">
                    <StructureStatus status={structure.status} />
                  </div>
                </div>
                <div className={classes.Complementary}>
                  <div className={classes.Id}>
                    <i className="fas fa-fingerprint" />
                    <span>
                      {structure.id}
                    </span>
                  </div>
                  <div className={classes.Address}>
                    <i className="fas fa-map-marker-alt" />
                    <span>
                      {getMainEntity(structure.addresses).city ? getMainEntity(structure.addresses).city : ''}
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
