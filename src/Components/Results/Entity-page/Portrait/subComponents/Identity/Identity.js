import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import LogoCard from '../../../../../Shared/Ui/LogoCard/LogoCard';
import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleListCard from '../../../../../Shared/Ui/SimpleListCard/SimpleListCard';

import getSelectKey from '../../../../../../Utils/getSelectKey';

import classes from './Identity.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * Identity
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Identity = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  // nom
  const name = getSelectKey(props, 'name', props.language, 'fr');

  // acronym
  const acronym = getSelectKey(props, 'acronym', props.language, 'fr');

  return (
    <div className="col-6">
      <div className={classes.Identity}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={messages[props.language]['Entity.portrait.identity.title']} />
          </div>
        </div>

        <div className="row">
          <div className={`col-lg-6 ${classes.NoSpace}`}>
            <SimpleCard
              logo="fas fa-id-card"
              title={messages[props.language]['Entity.portrait.identity.name']}
              label={`${name}${acronym}`}
              tooltip=""
            />
          </div>
          <div className={`col-lg-6 ${classes.NoSpace}`}>
            <LogoCard
              src={`https://scanr.enseignementsup-recherche.gouv.fr/static/logos/${props.id}.png`}
              cssClass="Height150"
            />
          </div>
          <div className={`col-lg-6 ${classes.NoSpace}`}>
            <SimpleListCard
              logo="fas fa-qrcode"
              title={messages[props.language]['Entity.portrait.identity.id']}
              label={props.id}
              list={props.externalIds}
              labelListButton={messages[props.language]['Entity.portrait.identity.externalIdsButtons']}
              tooltip={messages[props.language]['Entity.portrait.identity.id.tooltip']}
            />
          </div>
          <div className={`col-lg-6 ${classes.NoSpace}`}>
            <SimpleCard
              logo="fas fa-flask"
              title={messages[props.language]['Entity.portrait.identity.nature']}
              label={props.nature || ''}
              tooltip=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Identity;
/* eslint-disable */
Identity.propTypes = {
  language: PropTypes.string.isRequired,
  acronym: PropTypes.array,
  externalIds: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.object,
  nature: PropTypes.string,
};
