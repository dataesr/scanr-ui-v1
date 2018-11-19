import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import age from '../../../Utils/age';

/* CSS */
import classes from './PersonsGridItems.scss';


const personsGridItems = props => (
  <section className={`columns is-multiline ${classes.Section}`}>
    {
        props.data.map((person) => {
          const gender = (person.gender === 'F') ? <i className="fas fa-female" /> : <i className="fas fa-male" />;
          const agePerson = age(person.birth_date, person.death_date || null);

          return (
            <div key={person.id} className="column is-one-third-desktop is-half-tablet">
              <div className={`card ${classes.GridCard}`} key={person.id}>
                <div className={`card-content ${classes.CardContent}`}>

                  <div className="columns is-gapless is-marginless">

                    <div className="column">
                      <div className={classes.Content}>
                        <NavLink to={`${props.match.path}/${person.id}`}>
                          <span className={`${classes.lineClamp} ${classes.lineClamp2} ${classes.Link_item}`}>
                            <b>{person.last_name}</b>
                            &nbsp;
                            {person.first_name}
                          </span>
                        </NavLink>
                      </div>
                      <div className={classes.Complementary}>
                        <div className={classes.Id}>
                          <i className="fas fa-fingerprint" />
                          <a href={person.id_idref} target="_blank" rel="noopener noreferrer">
                            {person.id_idref}
                          </a>
                        </div>
                        <div className={classes.Id}>
                          {
                            (person.id_orcid)
                              ? (
                                <span>
                                  <i className="fas fa-fingerprint" />
                                  <a href={person.id_orcid} target="_blank" rel="noopener noreferrer">
                                    {person.id_orcid}
                                  </a>
                                </span>)
                              : null
                          }
                        </div>
                      </div>

                    </div>

                    <div style={{ minWidth: '52px' }} className="column is-2 has-text-centered">
                      <div className={classes.Info}>
                        {gender}
                      </div>
                      <div className={classes.Info}>
                        <b>{agePerson}</b>
                        <br />
                        ans
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          );
        })// /map
      }
  </section>
);

export default personsGridItems;

personsGridItems.propTypes = {
  data: PropTypes.array,
  match: PropTypes.object,
};
