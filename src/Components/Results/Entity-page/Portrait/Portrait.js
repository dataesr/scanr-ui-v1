import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ExpertiseField from './subComponents/ExpertiseField/ExpertiseField';
import History from './subComponents/History/History';
import Identity from './subComponents/Identity/Identity';
import Leaders from '../Shared/Leaders/Leaders';
import Localisation from './subComponents/Localisation/Localisation';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import Web from './subComponents/Web/Web';

import Background from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

import classes from './Portrait.scss';


const messages = {
  fr: messagesFr,
  en: messagesEn,
};


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
    modifyMode: false,
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <section className={`container-fluid ${classes.Portrait}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandle}
                modifyMode={this.state.modifyMode}
              >
                <FormattedHTMLMessage id="Entity.Section.Portrait.label" defaultMessage="Entity.Section.Portrait.label" />
              </SectionTitle>
              <div className="row">
                <Identity
                  acronym={this.props.data.acronym}
                  externalIds={this.props.data.externalIds || []}
                  id={this.props.data.id}
                  language={this.props.language}
                  description={this.props.data.description}
                  name={this.props.data.label}
                  nature={this.props.data.nature}
                  masterKey={`${this.props.id}/identity.Identity`}
                  modifyMode={this.state.modifyMode}
                  allData={this.props.data}
                />

                <Localisation
                  address={this.props.data.address}
                  language={this.props.language}
                  masterKey={`${this.props.id}/history.History`}
                  modifyMode={this.state.modifyMode}
                  allData={this.props.data}
                />

                <History
                  creationYear={this.props.data.creationYear}
                  id={this.props.data.id}
                  language={this.props.language}
                  predecessors={this.props.data.predecessors}
                  masterKey={`${this.props.id}/history.History`}
                  modifyMode={this.state.modifyMode}
                  allData={this.props.data}
                />

                <Leaders
                  id={this.props.data.id}
                  language={this.props.language}
                  leaders={this.props.data.leaders}
                  masterKey={`${this.props.id}/leaders.Leaders`}
                  modifyMode={this.state.modifyMode}
                  allData={this.props.data}
                />

                <ExpertiseField
                  id={this.props.data.id}
                  language={this.props.language}
                />

                <Web
                  id={this.props.data.id}
                  language={this.props.language}
                  socialMedias={this.props.data.socialMedias}
                  websites={this.props.data.websites}
                  links={this.props.data.links}
                />

              </div>
            </div>
          </section>
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Portrait;

Portrait.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
