import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../Shared/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import Leaders from '../Shared/Leaders/Leaders';
import TeamComposition from './SubComponents/teamComposition';
// import Background from '../../../Shared/images/poudre-orange_Fgris-BR.jpg';
import Background from '../../../Shared/images/poudre-orange-Fbleu-BR.jpg';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../translations/fr.json';
import messagesEntityEn from '../translations/en.json';

import classes from './Team.scss';

/**
 * Team
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Team extends Component {
  state = {
    modifyMode: false,
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const messagesEntity = {
      fr: messagesEntityFr,
      en: messagesEntityEn,
    };

    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };

    if (!this.props.data.leaders || this.props.data.leaders.length === 0) {
      return (
        <Fragment>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <section className={`container-fluid ${classes.Team}`} style={sectionStyle}>
              <div className="container">
                <SectionTitle
                  icon="fas fa-th"
                  modifyModeHandle={this.modifyModeHandle}
                  modifyMode={this.state.modifyMode}
                  emptySection
                  color="#fff"
                >
                  {messagesEntity[this.props.language]['Entity.Section.Team.label']}
                </SectionTitle>
                <div className="row">
                  <div className="col">
                    <EmptySection
                      language={this.props.language}
                      masterKey="Team"
                      modifyMode={this.state.modifyMode}
                      modifyModeHandle={this.modifyModeHandle}
                      color="#fff"
                    />
                  </div>
                </div>
              </div>
            </section>
          </IntlProvider>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Team}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fas fa-th"
                modifyModeHandle={this.modifyModeHandle}
                modifyMode={this.state.modifyMode}
                color="#fff"
              >
                {messagesEntity[this.props.language]['Entity.Section.Team.label']}
              </SectionTitle>
              <div className="row">
                <Leaders
                  id={this.props.data.id}
                  language={this.props.language}
                  leaders={this.props.data.leaders}
                  masterKey={`${this.props.id}.Leaders`}
                  modifyMode={this.state.modifyMode}
                  allData={this.props.data}
                />
                <TeamComposition
                  id={this.props.data.id}
                  language={this.props.language}
                  persons={this.props.data.persons}
                  masterKey={`${this.props.id}.Persons`}
                  modifyMode={this.state.modifyMode}
                  allData={this.props.data}
                />
              </div>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default Team;

Team.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
