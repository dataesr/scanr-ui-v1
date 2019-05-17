import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import History from './History/History';
import Identity from './Identity/Identity';
import Localisation from './Localisation/Localisation';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import Web from './Web/Web';

import Background from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';

import classes from './Portrait.scss';

/**
 * Portrait
 * Url : ex: /entite/200711886U
 * Description : Correspond à la section Portrait d'une entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Portrait = (props) => {
  if (!props.data) {
    return null;
  }
  const sectionStyle = {
    backgroundImage: `url(${Background})`,
  };

  return (
    <Fragment>
      <section className={`container-fluid ${classes.Portrait}`} style={sectionStyle}>
        <div className="container">
          <SectionTitle icon="fas fa-id-card">Portrait</SectionTitle>
          <div className="row">
            <div className="col-6">
              <Identity
                acronym={props.data.acronym}
                externalIds={[{ key: 'siren', value: 'gdklsjg4' }, { key: 'uai', value: '123456' }]}
                id={props.data.id}
                language={props.language}
                name={props.data.label}
                nature={props.data.nature}
              />
            </div>
            <div className={`col-6 ${classes.NoSpace}`}>
              <Localisation
                address={props.data.address}
                language={props.language}
              />
            </div>
            <div className="col-6">
              3-Domaines d expertise
            </div>
            <div className="col-6">
              4-Direction
            </div>
            <div className="col-6">
              <History
                creationYear={props.data.creationYear}
                id={props.data.id}
                language={props.language}
                predecessors={props.data.predecessors}
              />
            </div>

            <div className="col-12">
              <Web
                id={props.data.id}
                language={props.language}
                socialMedias={props.data.socialMedias}
                websites={props.data.websites}
              />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Portrait;

Portrait.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
