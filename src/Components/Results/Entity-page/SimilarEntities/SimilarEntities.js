import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../Shared/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../translations/fr.json';
import messagesEntityEn from '../translations/en.json';

import classes from './SimilarEntities.scss';

/**
 * SimilarEntities
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class SimilarEntities extends Component {
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

    if (!this.props.data) {
      return (
        <Fragment>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <section className={`container-fluid ${classes.SimilarEntities}`}>
              <div className="container">
                <SectionTitle
                  icon="fas fa-th"
                  modifyModeHandle={this.modifyModeHandle}
                  modifyMode={this.state.modifyMode}
                  emptySection
                >
                  {messagesEntity[this.props.language]['Entity.Section.SimilarEntities.label']}
                </SectionTitle>
                <div className="row">
                  <div className="col">
                    <EmptySection
                      language={this.props.language}
                      masterKey="SimilarEntities"
                      modifyMode={this.state.modifyMode}
                      modifyModeHandle={this.modifyModeHandle}
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
          <section className={`container-fluid ${classes.SimilarEntities}`}>
            <div className="container">
              <SectionTitle
                icon="fas fa-th"
                modifyModeHandle={this.modifyModeHandle}
                modifyMode={this.state.modifyMode}
                emptySection
              >
                {messagesEntity[this.props.language]['Entity.Section.SimilarEntities.label']}
              </SectionTitle>
              <div>
                content
              </div>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default SimilarEntities;

SimilarEntities.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
