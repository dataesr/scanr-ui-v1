import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import Identity from './Identity/Identity';
import Localisation from './Localisation/Localisation';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import Background from './poudre-jaune_Fgris-B_V2.jpg';

import classes from './Portrait.scss';

/**
 * Portrait
 * Url : ex: /entite/200711886U
 * Description : Correspond à la section Portrait d'une entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Portrait extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    console.log('componentDidMount()');
  }

  render() {
    if (!this.props.data) {
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
                  language={this.props.language}
                  name={this.props.data.label}
                  acronym={this.props.data.acronym}
                  id={this.props.data.id}
                  externalIds={this.props.data.externalIds}
                  nature={this.props.data.nature}
                />
              </div>
              <div className="col-6">
                <Localisation
                  language={this.props.language}
                  address={this.props.data.address}
                />
              </div>
              <div className="col-6">3-Domaines d expertise</div>
              <div className="col-6">4-Direction</div>
              <div className="col-6">5-Histoire</div>
            </div>
            <div className="row">
              <div className="col-12">Présence sur le web</div>
              <div className="col-3">Sites</div>
              <div className="col-3">Infos extraites</div>
              <div className="col-3">wiki</div>
              <div className="col-3">Rapport HCERES</div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Portrait;

Portrait.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
