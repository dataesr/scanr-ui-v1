import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import History from './History/History';
import Identity from './Identity/Identity';
import Localisation from './Localisation/Localisation';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
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

class Portrait extends Component {
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
                  acronym={this.props.data.acronym}
                  externalIds={[{ key: 'siren', value: 'gdklsjg4' }, { key: 'uai', value: '123456' }]}
                  id={this.props.data.id}
                  language={this.props.language}
                  name={this.props.data.label}
                  nature={this.props.data.nature}
                />
              </div>
              <div className={`col-6 ${classes.NoSpace}`}>
                <Localisation
                  address={this.props.data.address}
                  language={this.props.language}
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
                  creationYear={this.props.data.creationYear}
                  id={this.props.data.id}
                  language={this.props.language}
                  predecessors={this.props.data.predecessors}
                />
              </div>
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
