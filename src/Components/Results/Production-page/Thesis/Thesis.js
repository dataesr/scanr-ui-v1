import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';

import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';

import SummaryCard from '../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../Shared/Ui/SimpleCard/SimpleCard';
import OaCard from '../Shared/Oa/OaCard';
import OaHost from '../Shared/Oa/OaHost';
import OaLink from '../Shared/Oa/OaLink';
import PersonCard from '../../../Shared/Ui/PersonCard/PersonCard';
import CounterCard from '../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../Shared/Ui/CounterListCard/CounterListCard';
import AffiliationCard from '../../../Shared/Ui/AffiliationCard/AffiliationCard';
import TagCard from '../../../Shared/Ui/TagCard/TagCard';

import EmptySection from '../../Entity-page/Shared/EmptySection/EmptySection';

import Background from '../../../Shared/images/poudre-bleu_Fgris-B.jpg';
import BackgroundAuthors from '../../../Shared/images/poudre-orange-Fbleu-BR.jpg';
import BackgroundAffiliations from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import classes from './Thesis.scss';

import getSelectKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Thesis
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Thesis extends Component {
  state = {
    modifyModePortrait: false,
    modifyModeOa: false,
    modifyModeAuthors: false,
    modifyModeAffiliations: false,
  };

  modifyModeHandlePortrait = () => {
    this.setState(prevState => ({ modifyModePortrait: !prevState.modifyModePortrait }));
  }

  modifyModeHandleOa = () => {
    this.setState(prevState => ({ modifyModeOa: !prevState.modifyModeOa }));
  }

  modifyModeHandleAuthors = () => {
    this.setState(prevState => ({ modifyModeAuthors: !prevState.modifyModeAuthors }));
  }

  modifyModeHandleAffiliations = () => {
    this.setState(prevState => ({ modifyModeAffiliations: !prevState.modifyModeAffiliations }));
  }

  getAuthor = role => (this.props.data.authors.find(person => person.role === role))

  getAuthors = role => (this.props.data.authors.filter(person => person.role === role))

  getSortedAuthors = () => {
    const orderAuthors = ['author', 'directeurthese', 'presidentjury', 'membrejury', 'rapporteur'];
    const sortedAuthors = [];
    orderAuthors.forEach((role) => {
      const authors = this.getAuthors(role);
      if (authors.length > 0) {
        authors.forEach(author => sortedAuthors.push(author));
      }
    });
    return sortedAuthors;
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };
    const sectionStyleAuthors = {
      backgroundImage: `url(${BackgroundAuthors})`,
    };
    const sectionStyleAffiliations = {
      backgroundImage: `url(${BackgroundAffiliations})`,
    };

    const id = (this.props.data.id.substring(0, 5) === 'these') ? this.props.data.id.substring(5) : this.props.data.id;
    const publicationDate = moment(this.props.data.publicationDate).format('L');
    const summary = (this.props.language === 'fr') ? getSelectKey(this.props.data, 'summary', this.props.language, 'default') : getSelectKey(this.props.data, 'alternativeSummary', this.props.language, 'default');
    const nbAuthorsToShow = 2;
    const sortedAuthors = this.getSortedAuthors();

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <section className={`container-fluid ${classes.Thesis}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandlePortrait}
                modifyMode={this.state.modifyModePortrait}
              >
                <FormattedHTMLMessage id="Thesis.title" defaultMessage="Thesis.title" />
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
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={this.props.language}
                        logo="fas fa-id-card"
                        title={messages[this.props.language]['Publication.publication.id']}
                        label={id}
                        tooltip=""
                        masterKey="Publication/Id"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
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
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      { /* eslint-disable */ }
                      <PersonCard
                        data={this.getAuthor('author')}
                        showTitle={false}
                        language={this.props.language}
                        role={messages[this.props.language]['Publication.publication.author']}
                        masterKey="mlk/mlk"
                        modifyMode={false}
                        allData={null}
                      />
                    { /* eslint-enable */ }
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
                <div className="col-lg">
                  <div className="row">
                    <div className={`col-12 ${classes.CardContainer}`}>
                      <SummaryCard
                        language={this.props.language}
                        title={messages[this.props.language]['Publication.summary.title']}
                        text={summary}
                        tooltip=""
                        masterKey="Publication/summary"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>
                    <div className={`col-12 ${classes.CardContainer}`}>
                      <TagCard
                        language={this.props.language}
                        logo="fas fa-clipboard-list"
                        title={messages[this.props.language]['Publication.publication.tags']}
                        tagStyle={{ backgroundColor: '#3778bb', color: 'white' }}
                        labelListButton="Autres"
                        tagList={this.props.data.keywords.default}
                        tooltip=""
                        masterKey="Publication/tags"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`container-fluid ${classes.OaSection}`}>
            <div className="container">
              <SectionTitle
                icon={(this.props.data && this.props.data.isOa) ? 'fas fa-lock-open' : 'fas fa-lock'}
                modifyModeHandle={this.modifyModeHandleOa}
                modifyMode={this.state.modifyModeOa}
              >
                <FormattedHTMLMessage id="Publication.oa.title" defaultMessage="Publication.oa.title" />
              </SectionTitle>
              <div className="row">
                <div className={`col-3 ${classes.CardContainer}`}>
                  <OaCard
                    language={this.props.language}
                    oa={(this.props.data && this.props.data.isOa) ? this.props.data.isOa : false}
                    oaEvidence={(this.props.data && this.props.data.oaEvidence) ? this.props.data.oaEvidence : false}
                    masterKey="AccessType/OaCard"
                    modifyMode={this.state.modifyModeOa}
                    allData={this.props.data}
                  />
                </div>
                {
                  (this.props.data && this.props.data.oaEvidence && this.props.data.oaEvidence.hostType) ? (
                    <div className={`col-3 ${classes.CardContainer}`}>
                      <OaHost
                        language={this.props.language}
                        hostType={this.props.data.oaEvidence.hostType}
                      />
                    </div>
                  ) : null
                }
                {
                  (this.props.data && this.props.data.oaEvidence && (this.props.data.oaEvidence.url || this.props.data.oaEvidence.pdfurl)) ? (
                    <div className={`col-3 ${classes.CardContainer}`}>
                      <OaLink
                        language={this.props.language}
                        oaEvidence={this.props.data.oaEvidence}
                      />
                    </div>
                  ) : null
                }
              </div>
            </div>
          </section>
          <section className={`container-fluid ${classes.AuthorsSection}`} style={sectionStyleAuthors}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandleAuthors}
                modifyMode={this.state.modifyModeAuthors}
              >
                <FormattedHTMLMessage id="Publication.authors.title" defaultMessage="Publication.authors.title" />
              </SectionTitle>
              <div className="row">
                {
                  (this.props.data.authors && this.props.data.authors.length > 1)
                    ? (
                      <div className={`col-3 ${classes.CardContainer}`}>
                        <CounterCard
                          counter={this.props.data.authors.length}
                          title=""
                          label={messages[this.props.language]['Publication.publication.persons']}
                          color="Persons"
                        />
                      </div>
                    ) : null
                }
                {
                  sortedAuthors.map((author, index) => {
                    if (index < nbAuthorsToShow) {
                      return (
                        <div className={`col-3 ${classes.CardContainer}`}>
                          <PersonCard
                            data={author}
                            showTitle={false}
                            language={this.props.language}
                            role={messages[this.props.language][`Publication.publication.${author.role}`]}
                            masterKey="mlk/mlk"
                            modifyMode={false}
                            allData={null}
                          />
                        </div>
                      );
                    }
                    return null;
                  })
                }
                {
                  (this.props.data.authors && this.props.data.authors.length > nbAuthorsToShow)
                    ? (
                      <div className={`col-3 ${classes.CardContainer}`}>
                        <CounterListCard
                          language={this.props.language}
                          data={sortedAuthors}
                          limit={nbAuthorsToShow}
                          title=""
                          labelKey="authors"
                          color="Default"
                        />
                      </div>
                    ) : null
                }
              </div>
            </div>
          </section>
          <section className={`container-fluid ${classes.AffiliationsSection}`} style={sectionStyleAffiliations}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={this.modifyModeHandleAffiliations}
                modifyMode={this.state.modifyModeAffiliations}
              >
                <FormattedHTMLMessage id="Publication.affiliations.title" defaultMessage="Publication.affiliations.title" />
              </SectionTitle>
              <div className="row">
                {
                  (this.props.data && this.props.data.affiliations)
                    ? (
                      this.props.data.affiliations.map((item, i) => {
                        let address = null;
                        if (item.address && item.address.length > 0) {
                          address = item.address[0].city;
                          if (item.address[0].postcode) {
                            address += ` (${item.address[0].postcode.slice(0, 2)})`;
                          }
                        }

                        return (
                          /* eslint-disable-next-line */
                          <div className="col-md-3 p-0" key={`card_${item.id}_${i}`}>
                            <AffiliationCard
                              label={getSelectKey(item, 'label', this.props.language, 'fr')}
                              address={address || null}
                              nature={item.nature || null}
                              id={item.id || null}
                            />
                          </div>
                        );
                      })
                    )
                    : (
                      <div className="col">
                        <EmptySection
                          language={this.props.language}
                          masterKey="Network"
                          modifyMode={this.state.modifyMode}
                          modifyModeHandle={this.modifyModeHandle}
                        />
                      </div>
                    )
                }
              </div>
            </div>
          </section>
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Thesis;

Thesis.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
