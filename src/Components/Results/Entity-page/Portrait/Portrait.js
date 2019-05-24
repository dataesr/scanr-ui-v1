import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ExpertiseField from './ExpertiseField/ExpertiseField';
import History from './History/History';
import Identity from './Identity/Identity';
import Leaders from './Leaders/Leaders';
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
            <Identity
              acronym={props.data.acronym}
              externalIds={[{ key: 'siren', value: 'gdklsjg4' }, { key: 'uai', value: '123456' }]}
              id={props.data.id}
              language={props.language}
              name={props.data.label}
              nature={props.data.nature}
            />

            <Localisation
              address={props.data.address}
              language={props.language}
            />

            <History
              creationYear={props.data.creationYear}
              id={props.data.id}
              language={props.language}
              predecessors={props.data.predecessors}
            />

            <Leaders
              id={props.data.id}
              language={props.language}
              leaders={props.data.leaders}
            />

            <ExpertiseField
              id={props.data.id}
              language={props.language}
            />

            <Web
              id={props.data.id}
              language={props.language}
              socialMedias={props.data.socialMedias}
              websites={props.data.websites}
            />

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
