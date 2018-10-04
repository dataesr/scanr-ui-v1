/* Composants externes */
import React from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import Button from '../../../../../UI/Button/Button';
import StatusTagMedium from '../../../../../UI/StatusTagMedium/StatusTagMedium';

/* CSS */
import classes from './Address.scss';
import classesFull from './AddressFull.scss';

const address = props => (
  <div className={classes.Address}>
    <div className="columns is-gapless is-multiline is-marginless">
      <div className="column is-10">
        <span className={classesFull.Title}>Informations générales</span>
      </div>
      <div className="column is-2 has-text-right">
        <Button onClick={() => props.changeDisplayMode('mini')}>
          <i className="fas fa-undo" />
        </Button>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Statut
        </span>
      </div>
      <div className="column is-9">
        <span className={classesFull.Text}>
          <StatusTagMedium status={props.address.status} />
        </span>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Adresse
        </span>
      </div>
      <div className="column is-9">
        <span className={classesFull.Text}>
          {props.address.address_1 ? props.address.address_1 : '.'}
        </span>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Complément
        </span>
      </div>
      <div className="column is-9">
        <span className={classesFull.Text}>
          {props.address.address_2 ? props.address.address_2 : '.'}
        </span>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Code postal
        </span>
      </div>
      <div className="column is-3">
        <span className={classesFull.Text}>
          {props.address.postal_code ? props.address.postal_code : '.'}
        </span>
      </div>
      <div className="column is-3">
        <span className={classesFull.Header}>
          Code ville
        </span>
      </div>
      <div className="column is-3">
        <span className={classesFull.Text}>
          {props.address.city_code ? props.address.city_code : '.'}
        </span>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Ville
        </span>
      </div>
      <div className="column is-9">
        <span className={classesFull.Text}>
          {props.address.city ? props.address.city : '.'}
        </span>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Pays
        </span>
      </div>
      <div className="column is-9">
        <span className={classesFull.Text}>
          {props.address.country ? props.address.country : '.'}
        </span>
      </div>

      <div className="column is-12">
        <span className={classesFull.Title}>Coordonnées GPS</span>
      </div>

      <div className="column is-3">
        <span className={classesFull.Header}>
          Longitude
        </span>
      </div>
      <div className="column is-3">
        <span className={classesFull.Text}>
          {props.address.long ? props.address.long : '.'}
        </span>
      </div>
      <div className="column is-3">
        <span className={classesFull.Header}>
          Latitude
        </span>
      </div>
      <div className="column is-3">
        <span className={classesFull.Text}>
          {props.address.lat ? props.address.lat : '.'}
        </span>
      </div>

      <div className="column is-12">
        <span className={classesFull.Title}>Cycle de vie</span>
      </div>

      <div className="column is-12">
        <div className={classesFull.LifeCycle}>
          Créée le <span className={classesFull.Text}>{props.address.created_at}</span> par <span className={classesFull.Text}>{props.address.created_by}</span>
          <br />
          {props.address.modified_at ? 'Modifiée le {props.address.modified_at} par {props.address.modified_by}' : <i>Pas encore modifié</i>}

        </div>
      </div>

    </div>
  </div>
);


export default address;

address.propTypes = {
  address: PropTypes.object.isRequired,
  changeDisplayMode: PropTypes.func,
};
