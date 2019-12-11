import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';

import SectionTitle from '../../Shared/SectionTitle';
import SummaryCard from '../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
import SourceCard from './SubComponents/SourceCard';
import OaCard from '../Shared/Oa/OaCard';
import OaHost from '../Shared/Oa/OaHost';
import OaLink from '../Shared/Oa/OaLink';
import PersonCard from '../../../Shared/Ui/PersonCard/PersonCard';
import CounterCard from '../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../Shared/Ui/CounterListCard/CounterListCard';

import AffiliationCard from '../../../Search/Results/ResultCards/EntityCard';
import LogoCard from '../../../Shared/Ui/LogoCard/LogoCard';

import Background from '../../../Shared/images/poudre-fuschia_Fgris-B.jpg';
import BackgroundAuthors from '../../../Shared/images/poudre-orange-Fbleu-BR.jpg';
import BackgroundAffiliations from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import Similars from '../Shared/Similars/Similars';
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
  getAuthor = role => (this.props.data.authors.find(person => person.role === role))

  getAuthors = role => (this.props.data.authors.filter(person => person.role === role))

  getSortedAuthors = () => {
    const orderAuthors = ['author', 'directeurthese', 'rapporteur', 'presidentjury', 'membrejury'];
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
    // const sectionStyleSimilarProductions = {
    //   backgroundImage: `url(${Background})`,
    // };

    let id = this.props.data.id;
    let idName = 'Identifiant';
    let externalLink = '#';
    if (this.props.data.id.substring(0, 3) === 'doi') {
      idName = 'DOI';
      id = this.props.data.id.substring(3);
      externalLink = 'http://doi.org/'.concat({ id }.id);
    } else if (this.props.data.id.substring(0, 5) === 'sudoc') {
      idName = 'Sudoc';
      id = this.props.data.id.substring(5);
      externalLink = 'http://www.sudoc.fr/'.concat({ id }.id);
    } else {
      idName = 'HAL';
      externalLink = 'https://hal.archives-ouvertes.fr/'.concat({ id }.id);
    }
    const publicationDate = moment(this.props.data.publicationDate).format('L');
    const summary = getSelectKey(this.props.data, 'summary', this.props.language, 'default') || getSelectKey(this.props.data, 'alternativeSummary', this.props.language, 'default');
    const nbAuthorsToShow = 6;
    const sortedAuthors = this.getSortedAuthors();
    let swHeritageLink = null;
    if (this.props.data.links && this.props.data.links.length > 0) {
      const swL = this.props.data.links.find(el => el.type === 'software_heritage');
      if (swL) {
        swHeritageLink = swL.url;
      }
    }

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <section className={`container-fluid ${classes.Publication}`} style={sectionStyle} id="Publication">
            <div className="container">
              <SectionTitle
                icon="fa-id-card"
                objectType="publications"
                language={this.props.language}
                id={this.props.id}
                title={messages[this.props.language]['Publication.title']}
              />
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
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="row">
                        <div className={`col-md-12 ${classes.CardContainer}`}>
                          <SimpleCardWithButton
                            language={this.props.language}
                            logo="fas fa-calendar-day"
                            title={idName}
                            label={id}
                            url={externalLink}
                            link="link_publication"
                            tooltip=""
                          />
                        </div>
                        <div className={`col-md-12 ${classes.CardContainer}`}>
                          <SimpleCard
                            language={this.props.language}
                            logo="fas fa-calendar-day"
                            title={messages[this.props.language]['Publication.publication.publicationDate']}
                            label={publicationDate}
                            tooltip=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`col-md-7 ${classes.CardContainer}`}>
                      <SourceCard
                        language={this.props.language}
                        data={this.props.data.source}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg">
                  <div className="row">
                    {
                      (summary) ? (
                        <div className={`col-12 ${classes.CardContainer}`}>
                          <SummaryCard
                            language={this.props.language}
                            title={messages[this.props.language]['Publication.summary.title']}
                            text={summary}
                            tooltip=""
                          />
                        </div>
                      ) : null
                    }
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={this.props.language}
                        logo="fas fa-bookmark"
                        title={messages[this.props.language]['Publication.publication.type']}
                        label={messages[this.props.language][`Publication.publication.type.${this.props.data.type}`]}
                        tooltip=""
                      />
                    </div>
                    {
                    (swHeritageLink) ? (
                      <div className={`col-md-6 ${classes.CardContainer}`}>
                        <LogoCard
                          url="./img/swh-logo.jpg"
                          language={this.props.language}
                          cssClass="Height150"
                          targetUrl={swHeritageLink}
                        />
                      </div>
                    ) : null
                    }

                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`container-fluid ${classes.OaSection}`} id="AccessType">
            <div className="container">
              <SectionTitle
                lexicon="PublicationOA"
                icon="fa-folder-open"
                objectType="publications"
                language={this.props.language}
                id={this.props.id}
                title={messages[this.props.language]['Publication.oa.title']}
              />
              <div className="row">
                <div className={`col-md-3 ${classes.CardContainer}`}>
                  <OaCard
                    language={this.props.language}
                    oa={(this.props.data && this.props.data.isOa) ? this.props.data.isOa : false}
                    oaEvidence={(this.props.data && this.props.data.oaEvidence) ? this.props.data.oaEvidence : false}
                  />
                </div>
                {
                  (this.props.data && this.props.data.oaEvidence && this.props.data.oaEvidence.hostType) ? (
                    <div className={`col-md-3 ${classes.CardContainer}`}>
                      <OaHost
                        language={this.props.language}
                        oaEvidence={this.props.data.oaEvidence}
                      />
                    </div>
                  ) : null
                }
                {
                  (this.props.data && this.props.data.oaEvidence && (this.props.data.oaEvidence.url || this.props.data.oaEvidence.pdfurl)) ? (
                    <div className={`col-md-3 ${classes.CardContainer}`}>
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
          <section className={`container-fluid ${classes.AuthorsSection}`} style={sectionStyleAuthors} id="Authors">
            <div className="container">
              <SectionTitle
                icon="fa-folder-open"
                lexicon="PublicationAuthor"
                objectType="publications"
                language={this.props.language}
                id={this.props.id}
                title={messages[this.props.language]['Publication.authors.title']}
              />
              <div className="row">
                {
                  (this.props.data.authors && this.props.data.authors.length > 1)
                    ? (
                      <div className={`col-md-3 ${classes.CardContainer}`}>
                        <CounterCard
                          counter={this.props.data.authors.length}
                          title=""
                          label={messages[this.props.language]['Publication.publication.persons']}
                          color="Persons"
                          className={classes.PersonCardHeight}
                        />
                      </div>
                    ) : null
                }
                {
                  sortedAuthors.map((author, index) => {
                    if (index < nbAuthorsToShow) {
                      return (
                        <div className={`col-md-3 ${classes.CardContainer}`}>
                          <PersonCard
                            data={author}
                            showTitle={false}
                            language={this.props.language}
                            className={classes.PersonCardHeight}
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
                      <div className={`col-md-3 ${classes.CardContainer}`}>
                        <CounterListCard
                          language={this.props.language}
                          data={sortedAuthors}
                          objectType={this.props.data.productionType}
                          limit={nbAuthorsToShow}
                          title=""
                          color="Default"
                          labelKey="authors-publication"
                        />
                      </div>
                    ) : null
                }
              </div>
            </div>
          </section>
          {
            (this.props.data && this.props.data.affiliations)
              ? (
                <section className={`container-fluid ${classes.AffiliationsSection}`} style={sectionStyleAffiliations} id="Affiliations">
                  <div className="container">
                    <SectionTitle
                      lexicon="PublicationAffiliation"
                      icon="fa-folder-open"
                      objectType="publications"
                      language={this.props.language}
                      id={this.props.id}
                      title={messages[this.props.language]['Publication.affiliations.title']}
                    />
                    <ul className={`row ${classes.Ul}`}>
                      {
                        this.props.data.affiliations.map(item => (
                          <li key={item} className={`col-md-4 ${classes.Li}`}>
                            <AffiliationCard
                              data={item}
                              small
                              language={this.props.language}
                            />
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </section>
              ) : null
          }
          <Similars id={this.props.id} language={this.props.language} />
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Publication;

Publication.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
