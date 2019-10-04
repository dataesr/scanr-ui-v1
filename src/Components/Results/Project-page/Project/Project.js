import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';

import BudgetCard from './Cards/Budget';
import SimpleCard from '../../../Shared/Ui/SimpleCard/SimpleCard';

import classes from './Project.scss';

import getSelectKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Publication
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Project extends Component {
  state = {
    modifyModePortrait: false,
    modifyModeAuthors: false,
    modifyModeAffiliations: false,
  };

  modifyModeHandlePortrait = () => {
    this.setState(prevState => ({ modifyModePortrait: !prevState.modifyModePortrait }));
  }

  modifyModeHandleAuthors = () => {
    this.setState(prevState => ({ modifyModeAuthors: !prevState.modifyModeAuthors }));
  }

  modifyModeHandleAffiliations = () => {
    this.setState(prevState => ({ modifyModeAffiliations: !prevState.modifyModeAffiliations }));
  }

  ShouldPrintDescription = () => {
    const bgUrl = './img/poudre-projects_fond_blanc.jpg';
    const sectionStyle = {
      backgroundImage: `url(${bgUrl})`,
    };
    if (this.props.data.description) {
      return (
        <section className={`container-fluid ${classes.Description}`} style={sectionStyle}>
          <div className="container">
            <SectionTitle
              icon="fas fa-id-card"
              modifyModeHandle={this.modifyModeHandleAuthors}
              modifyMode={this.state.modifyModeAuthors}
            >
              <FormattedHTMLMessage id="Project.description" defaultMessage="Project.description" />
            </SectionTitle>
            <div className="row">
              <div className={`d-flex pl-4 pr-4 ${classes.NoSpace3}`}>
                {getSelectKey(this.props.data, 'description', this.props.language, 'default')}
              </div>
            </div>
          </div>
        </section>
      );
    }
    return null;
  }

  ShouldPrintFundings = () => {
    const CardsClass = (this.ShouldPrintDescription()) ? 'NoSpace4' : 'NoSpace';
    if (this.props.data.budgetTotal && this.props.data.budgetFinanced) {
      const data = [
        ['Budget total', this.props.data.budgetTotal],
        ['Budget financé', this.props.data.budgetFinanced],
      ]
      return (
        <div className={classes[CardsClass]}>
          <BudgetCard
            language={this.props.language}
            logo="fas fa-euro-sign"
            title={messages[this.props.language]['Project.money']}
            label="graph here"
            tooltip=""
            masterKey="Project/money"
            modifyMode={this.state.modifyModePortrait}
            allData={this.props.data}
          />
        </div>
      );
    }
    if (this.props.data.budgetFinanced || this.props.data.budgetTotal) {
      return (
        <div className={classes[CardsClass]}>
          <BudgetCard
            language={this.props.language}
            logo="fas fa-euro-sign"
            title={messages[this.props.language]['Project.money']}
            label="money here"
            tooltip=""
            masterKey="Project/money"
            modifyMode={this.state.modifyModePortrait}
            allData={this.props.data}
          />
        </div>
      );
    }
    return null;
  }


  render() {
    if (!this.props.data) {
      return null;
    }
    const bgUrl = './img/poudre-projects_fond_gris.jpg';
    const sectionStyle = {
      backgroundImage: `url(${bgUrl})`,
    };

    // const publicationDate = moment(this.props.data.publicationDate).format('L');
    const CardsClass = 'NoSpace4';
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <section className={`container-fluid ${classes.Information}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandlePortrait}
                modifyMode={this.state.modifyModePortrait}
              >
                <FormattedHTMLMessage id="Project.title" defaultMessage="Project.title" />
              </SectionTitle>
              <div className="row d-flex">
                <div className={`row d-flex flex-grow-1 ${classes.NoSpace2}`}>
                  <div className={classes[CardsClass]}>
                    <SimpleCard
                      language={this.props.language}
                      logo="fas fa-id-card"
                      title={messages[this.props.language]['Project.title']}
                      label={this.props.data.id}
                      tooltip=""
                      masterKey="Project/title"
                      modifyMode={this.state.modifyModePortrait}
                      allData={this.props.data}
                    />
                  </div>
                  <div className={classes[CardsClass]}>
                    <SimpleCard
                      language={this.props.language}
                      logo="fas fa-calendar-day"
                      title={messages[this.props.language]['Project.type']}
                      label={this.props.data.type}
                      tooltip=""
                      masterKey="Project/type"
                      modifyMode={this.state.modifyModePortrait}
                      allData={this.props.data}
                    />
                  </div>
                  <div className={classes[CardsClass]}>
                    <SimpleCard
                      language={this.props.language}
                      logo="fas fa-id-card"
                      title={messages[this.props.language]['Project.title']}
                      label={this.props.data.year}
                      tooltip=""
                      masterKey="Project/title"
                      modifyMode={this.state.modifyModePortrait}
                      allData={this.props.data}
                    />
                  </div>
                  {this.ShouldPrintFundings()}
                  <div className={classes[CardsClass]}>
                    <SimpleCard
                      language={this.props.language}
                      logo="fas fa-bookmark"
                      title={messages[this.props.language]['Project.type']}
                      label={messages[this.props.language][`Project.type.${this.props.data.type}`]}
                      tooltip=""
                      masterKey="Project/type"
                      modifyMode={this.state.modifyModePortrait}
                      allData={this.props.data}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {this.ShouldPrintDescription()}
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Project;

Project.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
