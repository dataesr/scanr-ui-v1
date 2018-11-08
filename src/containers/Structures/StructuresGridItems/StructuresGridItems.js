import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import StructureStatus from '../../../UI/StatusTagMedium/StatusTagMedium';
import StructureConflicts from '../../../UI/StructureConflicts/StructureConflicts';

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
        props.data.map(structure => (
          <div key={structure.id} className="column is-one-third-desktop is-half-tablet">
            <div className={`card ${classes.GridCard}`} key={structure.id}>
              <div className={`card-content ${classes.CardContent}`}>

                <div className="columns is-gapless is-marginless">

                  <div className="column">
                    <div className={classes.Content}>
                      <NavLink to={`${props.match.path}/${structure.id}`}>
                        <span className={`${classes.lineClamp} ${classes.lineClamp2} ${classes.Link_item}`}>
                          {structure.names && getMainEntity(structure.names).name_fr}
                        </span>
                      </NavLink>
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
                          {structure.addresses && getMainEntity(structure.addresses).city}
                        </span>
                      </div>

                    </div>
                  </div>

                  <div style={{ minWidth: '52px' }} className="column is-2 has-text-centered">
                    <div className={classes.Info}>
                      <StructureStatus status={structure.status} />
                    </div>
                    <div className={classes.Info}>
                      <i className="far fa-star" />
                    </div>
                    <div className={classes.Info}>
                      <StructureConflicts structure={structure} />
                    </div>
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
  data: PropTypes.array,
  match: PropTypes.object,
};
