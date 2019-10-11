import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';

import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';

import SummaryCard from '../Shared/SummaryCard/SummaryCard';
import SourceCard from './SubComponents/SourceCard';
import SimpleCard from '../../../Shared/Ui/SimpleCard/SimpleCard';

import Background from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import classes from './Publication.scss';

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
class Publication extends Component {
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

  render() {
    if (!this.props.data) {
      return null;
    }
    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };

    const publicationDate = moment(this.props.data.publicationDate).format('L');

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <section className={`container-fluid ${classes.Publication}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandlePortrait}
                modifyMode={this.state.modifyModePortrait}
              >
                <FormattedHTMLMessage id="Publication.title" defaultMessage="Publication.title" />
              </SectionTitle>

              <div className="row">
                <div className="col-lg">
                  <div className="row">
                    <div className={`col-12 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={this.props.language}
                        logo="fas fa-id-card"
                        title={messages[this.props.language]['Publication.publication.title']}
                        label={getSelectKey(this.props.data, 'title', this.props.language, 'default')}
                        tooltip=""
                        masterKey="Publication/title"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="row">
                        <div className={`col-md-12 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={this.props.language}
                            logo="fas fa-calendar-day"
                            title="Id"
                            label="doi"
                            tooltip=""
                            masterKey="Publication/publicationDate"
                            modifyMode={this.state.modifyModePortrait}
                            allData={this.props.data}
                          />
                        </div>
                        <div className={`col-md-12 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={this.props.language}
                            logo="fas fa-calendar-day"
                            title={messages[this.props.language]['Publication.publication.publicationDate']}
                            label={publicationDate}
                            tooltip=""
                            masterKey="Publication/publicationDate"
                            modifyMode={this.state.modifyModePortrait}
                            allData={this.props.data}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`col-md-7 ${classes.CardContainer}`}>
                      <SourceCard
                        language={this.props.language}
                        data={this.props.data.source}
                        masterKey="Publication/publicationType"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg">
                  <div className="row">
                    <div className={`col-12 ${classes.CardContainer}`}>
                      <SummaryCard
                        language={this.props.language}
                        title={messages[this.props.language]['Publication.summary.title']}
                        text={getSelectKey(this.props.data, 'summary', this.props.language, 'default')}
                        tooltip=""
                        masterKey="Publication/summary"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={this.props.language}
                        logo="fas fa-bookmark"
                        title={messages[this.props.language]['Publication.publication.type']}
                        label={messages[this.props.language][`Publication.publication.type.${this.props.data.type}`]}
                        tooltip=""
                        masterKey="Publication/publicationType"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`container-fluid ${classes.Publication}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon={(this.props.data && this.props.data.isOa) ? 'fas fa-lock-open' : 'fas fa-lock'}
                modifyModeHandle={this.modifyModeHandleAuthors}
                modifyMode={this.state.modifyModeAuthors}
              >
                <FormattedHTMLMessage id="Publication.oa.title" defaultMessage="Publication.oa.title" />
              </SectionTitle>
              <div className="row">
                <div className={`col-3 ${classes.CardContainer}`}>
                  <SimpleCard
                    language={this.props.language}
                    logo="fas fa-id-card"
                    title={messages[this.props.language]['Publication.publication.title']}
                    label={getSelectKey(this.props.data, 'title', this.props.language, 'default')}
                    tooltip=""
                    masterKey="Publication/title"
                    modifyMode={this.state.modifyModePortrait}
                    allData={this.props.data}
                  />
                </div>
              </div>

              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandleAuthors}
                modifyMode={this.state.modifyModeAuthors}
              >
                <FormattedHTMLMessage id="Publication.authors.title" defaultMessage="Publication.authors.title" />
              </SectionTitle>
              <div className="row">
                sous-titre2
              </div>

              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandleAffiliations}
                modifyMode={this.state.modifyModeAffiliations}
              >
                <FormattedHTMLMessage id="Publication.affiliations.title" defaultMessage="Publication.affiliations.title" />
              </SectionTitle>
              <div className="row">
                sous-titre2
              </div>
            </div>
          </section>
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Publication;

Publication.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
