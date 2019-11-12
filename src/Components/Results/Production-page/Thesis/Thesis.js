import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Axios from 'axios';
import { API_PUBLICATIONS_LIKE_END_POINT } from '../../../../config/config';

import HeaderTitle from '../../../Shared/Results/HeaderTitle/HeaderTitle';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import SummaryCard from '../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../Shared/Ui/SimpleCard/SimpleCard';
import OaCard from '../Shared/Oa/OaCard';
import OaHost from '../Shared/Oa/OaHost';
import OaLink from '../Shared/Oa/OaLink';
import PersonCard from '../../../Shared/Ui/PersonCard/PersonCard';
import CounterCard from '../../../Shared/Ui/CounterCard/CounterCard';
import CounterListCard from '../../../Shared/Ui/CounterListCard/CounterListCard';
import AffiliationCard from '../../../Search/SearchResults/ResultCards/EntityCard';
import TagCard from '../../../Shared/Ui/TagCard/TagCard';
import ProductionCard from '../../../Search/SearchResults/ResultCards/PublicationCard';
import LogoCard from '../../../Shared/Ui/LogoCard/LogoCard';
import YoutubeCard from '../../../Shared/Ui/YoutubeCard/YoutubeCard';
import PrizeCard from '../../../Shared/Ui/PrizeCard/PrizeCard';

import Background from '../../../Shared/images/poudre-bleu_Fgris-B.jpg';
import BackgroundAuthors from '../../../Shared/images/poudre-orange-Fbleu-BR.jpg';
import BackgroundAffiliations from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import BackgroundSimilarProductions from '../../../Shared/images/poudre-fuschia_Fgris-B.jpg';

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
    similarProductions: null,
  };

  componentDidMount() {
    this.getSimilarProductions();
  }

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

  modifyModeHandleSimilarProductions = () => {
    this.setState(prevState => ({ modifyModeSimilarProductions: !prevState.modifyModeSimilarProductions }));
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

  getSimilarProductions = () => {
    const url = API_PUBLICATIONS_LIKE_END_POINT;
    const searchTab = [];
    if (this.props.data.title && this.props.data.title.default) {
      searchTab.push(this.props.data.title.default);
    }
    if (this.props.data.summary && this.props.data.summary.default) {
      searchTab.push(this.props.data.summary.default);
    }
    if (this.props.data.keywords && this.props.data.keywords.default) {
      searchTab.push(this.props.data.keywords.default.join(' '));
    }

    const data = {
      fields: ['title', 'summary', 'keywords'],
      likeIds: [],
      likeTexts: searchTab,
      lang: 'default',
    };
    Axios.post(url, data).then((response) => {
      if (response.data.total > 0) {
        const data6 = [];
        for (let i = 0; i < response.data.total; i += 1) {
          if (response.data.results[i].value.id !== this.props.data.id) {
            data6.push(response.data.results[i]);
          }
          if (data6.length === 6) {
            break;
          }
        }
        this.setState({ similarProductions: data6 });
      }
    });
  }

  handleChange = (sectionName) => {
    document.getElementById(sectionName).scrollIntoView(true);
    window.scrollBy({ top: -120, behavior: 'smooth' });
  };

  render() {
    if (!this.props.data) {
      return <div>null</div>;
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
    const sectionStyleSimilarProductions = {
      backgroundImage: `url(${BackgroundSimilarProductions})`,
    };

    const id = (this.props.data.id.substring(0, 5) === 'these') ? this.props.data.id.substring(5) : this.props.data.id;
    const publicationDate = moment(this.props.data.publicationDate).format('L');
    const summary = (this.props.language === 'fr') ? getSelectKey(this.props.data, 'summary', this.props.language, 'default') : getSelectKey(this.props.data, 'alternativeSummary', this.props.language, 'default');
    const nbAuthorsToShow = 6;
    const sortedAuthors = this.getSortedAuthors();
    const theseLink = 'http://www.theses.fr/'.concat({ id }.id);

    let swHeritageLink = null;
    if (this.props.data.links && this.props.data.links.length > 0) {
      const swL = this.props.data.links.find(el => el.type === 'software_heritage');
      if (swL) {
        swHeritageLink = swL.url;
      }
    }

    let youtubeUrl = null;
    if (this.props.data.links && this.props.data.links.length > 0) {
      for (let i = 0; i < this.props.data.links.length; i += 1) {
        if (this.props.data.links[i].type.toLowerCase() === 'youtube') {
          youtubeUrl = this.props.data.links[i].url;
        }
      }
    }

    const newAwards = [];
    if (this.props.data.awards) {
      this.props.data.awards.forEach((element) => {
        let labelToUse = element.label;
        if (element.description) {
          labelToUse = element.label.concat(' (', element.description).concat(')');
        }
        newAwards.push({
          label: labelToUse,
          date: element.date,
        });
      });
    }
	  console.log("awards", newAwards);

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <HeaderTitle
            language={this.props.language}
            label={getSelectKey(this.props.data, 'title', this.props.language, 'default')}
            handleChangeForScroll={this.handleChange}
            idPage="Thesis"
          />
          <section className={`container-fluid ${classes.Thesis}`} style={sectionStyle} id="Thesis">
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
                      <a href={theseLink} target="_blank" rel="noopener noreferrer">
                        <SimpleCard
                          language={this.props.language}
                          logo="fas fa-id-card"
                          title={messages[this.props.language]['Publication.publication.id']}
                          label={id}
                          tooltip=""
                          masterKey="Publication/id"
                          modifyMode={this.state.modifyModePortrait}
                          allData={this.props.data}
                        />
                      </a>
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
                        role="author"
                        masterKey="Publication/mainAuthor"
                        modifyMode={this.state.modifyModePortrait}
                        allData={this.props.data}
                      />
                    { /* eslint-enable */ }
                    </div>
                    {
                    (swHeritageLink) ? (
                      <div className={`col-md-6 ${classes.CardContainer}`}>
                        <LogoCard
                          url="./img/swh-logo.jpg"
                          language={this.props.language}
                          cssClass="Height150"
                          masterKey="Publication/publicationType"
                          modifyMode={this.state.modifyModePortrait}
                          targetUrl={swHeritageLink}
                          allData={this.props.data}
                        />
                      </div>
                    ) : null
                    }
                  </div>
                  <div className="row">
                    { (youtubeUrl) ? (
                      <div className={`col-md-12 ${classes.CardContainer}`} style={{ height: '500px' }}>
                        <YoutubeCard url={youtubeUrl} autoHeight />
                      </div>
                    ) : null }
                  </div>

                  <div className="row">
                    {
                      newAwards.map(award => (
                        <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                          <PrizeCard
                            date={award.date}
                            language={this.props.language}
                            label={award.label}
                            icon="prize"
                            color="#fe7747"
                            masterKey="Publication/award"
                            modifyMode={this.state.modifyModePortrait}
                            allData={this.props.data}
                          />
                        </div>
                      ))
                    }
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
                            masterKey="Publication/summary"
                            modifyMode={this.state.modifyModePortrait}
                            allData={this.props.data}
                          />
                        </div>
                      ) : null
                    }
                    {
                      (this.props.data.keywords.default.length > 0) ? (
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
                icon={(this.props.data && this.props.data.isOa) ? 'fas fa-lock-open' : 'fas fa-lock'}
                modifyModeHandle={this.modifyModeHandleOa}
                modifyMode={this.state.modifyModeOa}
              >
                <FormattedHTMLMessage id="Publication.oa.title" defaultMessage="Publication.oa.title" />
              </SectionTitle>
              <div className="row">
                <div className={`col-md-3 ${classes.CardContainer}`}>
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
                    <div className={`col-md-3 ${classes.CardContainer}`}>
                      <OaHost
                        language={this.props.language}
                        hostType={this.props.data.oaEvidence.hostType}
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
                        masterKey="AccessType/OaCard"
                        modifyMode={this.state.modifyModeOa}
                        allData={this.props.data}
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
                      <div className={`col-md-3 ${classes.CardContainer}`}>
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
                        <div className={`col-md-3 ${classes.CardContainer}`}>
                          <PersonCard
                            data={author}
                            showTitle={false}
                            language={this.props.language}
                            role={author.role}
                            masterKey="Publication/person"
                            modifyMode={this.state.modifyModeAuthors}
                            allData={this.props.data}
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
          {
            (this.props.data && this.props.data.affiliations)
              ? (
                <section className={`container-fluid ${classes.AffiliationsSection}`} style={sectionStyleAffiliations} id="Affiliations">
                  <div className="container">
                    <SectionTitle
                      icon="fas fa-id-card"
                      modifyModeHandle={this.modifyModeHandleAffiliations}
                      modifyMode={this.state.modifyModeAffiliations}
                    >
                      <FormattedHTMLMessage id="Publication.affiliations.title" defaultMessage="Publication.affiliations.title" />
                    </SectionTitle>
                    <div className={`row ${classes.Ul}`}>
                      {
                        this.props.data.affiliations.map(item => (
                          <div key={item} className={`col-md-4 ${classes.Li}`}>
                            <AffiliationCard
                              data={item}
                              small
                              language={this.props.language}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </section>
              ) : null
          }
          {
            (this.state.similarProductions)
              ? (
                <section className={`container-fluid ${classes.SimilarProductions}`} style={sectionStyleSimilarProductions} id="SimilarProductions">
                  <div className="container">
                    <div className={`row ${classes.SectionTitle}`}>
                      <div className="col">
                        <i className="fas fa-th" />
                        <span className={classes.Label}>
                          <FormattedHTMLMessage id="Publication.similarProductions.title" defaultMessage="Publication.similarProductions.title" />
                        </span>
                      </div>
                    </div>
                    <ul className={`row ${classes.Ul}`}>
                      {
                        this.state.similarProductions.map(item => (
                          <li key={item} className={`col-md-4 ${classes.Li}`}>
                            <ProductionCard
                              data={item.value}
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
