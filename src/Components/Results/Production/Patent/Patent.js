import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
// import Axios from 'axios';
// import { API_PUBLICATIONS_LIKE_END_POINT } from '../../../../config/config';

import Similars from '../Shared/Similars/Similars';
import HeaderTitle from '../../../Shared/Results/HeaderTitle/HeaderTitle';
import SectionTitle from '../../Shared/SectionTitle';
import SummaryCard from '../Shared/SummaryCard/SummaryCard';
import SimpleCard from '../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleCardWithButton from '../../../Shared/Ui/SimpleCardWithButton/SimpleCardWithButton';
// import PersonCard from '../../../Shared/Ui/PersonCard/PersonCard';
import CounterCard from '../../../Shared/Ui/CounterCard/CounterCard';
// import CounterListCard from '../../../Shared/Ui/CounterListCard/CounterListCard';
// import AffiliationCard from '../../../Search/SearchResults/ResultCards/EntityCard';
import TagCard from '../../../Shared/Ui/TagCard/TagCard';
// import ProductionCard from '../../../Search/SearchResults/ResultCards/PublicationCard';
// import LogoCard from '../../../Shared/Ui/LogoCard/LogoCard';
import Background from '../../../Shared/images/poudre-bleu_Fgris-B.jpg';
import BackgroundAuthors from '../../../Shared/images/poudre-orange-Fbleu-BR.jpg';
// import BackgroundAffiliations from '../../../Shared/images/poudre-jaune_Fgris-B.jpg';
// import BackgroundSimilarProductions from '../../../Shared/images/poudre-fuschia_Fgris-B.jpg';

import classes from './Patents.scss';

import getSelectKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Patent
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Patent extends Component {
  getAuthor = role => (this.props.data.authors.find(person => person.role === role))

  getAuthors = role => (this.props.data.authors.filter(person => person.role === role))

  getSortedAuthors = () => {
    const orderAuthors = ['deposants', 'inventeurs'];
    const sortedAuthors = [];
    orderAuthors.forEach((role) => {
      const authors = this.getAuthors(role);
      if (authors.length > 0) {
        authors.forEach(author => sortedAuthors.push(author));
      }
    });
    return sortedAuthors;
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
    // const sectionStyleAffiliations = {
    //   backgroundImage: `url(${BackgroundAffiliations})`,
    // };
    // const sectionStyleSimilarProductions = {
    //   backgroundImage: `url(${BackgroundSimilarProductions})`,
    // };

    const id = this.props.data.id;
    const publicationDate = moment(this.props.data.publicationDate).format('L');
    const submissionDate = moment(this.props.data.submissionDate).format('L');
    const summary = getSelectKey(this.props.data, 'summary', this.props.language, 'default');
    const theseLink = 'http://www.patstat.fr/'.concat({ id }.id);
    const keywords = this.props.data.domains.filter(dom => dom.level === 'classe').map(el => el.label.default);


    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <HeaderTitle
            language={this.props.language}
            label={getSelectKey(this.props.data, 'title', this.props.language, 'default')}
            handleChangeForScroll={this.handleChange}
            idPage="Thesis"
            id={this.props.data.id}
          />
          <section className={`container-fluid ${classes.Thesis}`} style={sectionStyle} id="Thesis">
            <div className="container">
              <SectionTitle
                icon="fa-id-card"
                objectType="productions"
                language={this.props.language}
                id={this.props.id}
                title={messages[this.props.language]['Thesis.title']}
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
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCardWithButton
                        language={this.props.language}
                        logo="fas fa-id-card"
                        title={messages[this.props.language]['Publication.publication.id']}
                        label={id}
                        tooltip=""
                        url={theseLink}
                        link="link_these"
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={this.props.language}
                        logo="fas fa-calendar-day"
                        title={messages[this.props.language]['Publication.publication.publicationDate']}
                        label={publicationDate}
                        tooltip=""
                      />
                    </div>
                    <div className={`col-md-6 ${classes.CardContainer}`}>
                      <SimpleCard
                        language={this.props.language}
                        logo="fas fa-calendar-day"
                        title={messages[this.props.language]['Publication.publication.publicationDate']}
                        label={submissionDate}
                        tooltip=""
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
                    {
                      (keywords.length > 0) ? (
                        <div className={`col-12 ${classes.CardContainer}`}>
                          <TagCard
                            language={this.props.language}
                            logo="fas fa-clipboard-list"
                            title={messages[this.props.language]['Publication.publication.tags']}
                            tagStyle={{ backgroundColor: '#3778bb', color: 'white' }}
                            labelListButton="Autres"
                            tagList={keywords}
                            tooltip=""
                          />
                        </div>
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`container-fluid ${classes.AuthorsSection}`} style={sectionStyleAuthors} id="Authors">
            <div className="container">
              <SectionTitle
                icon="fa-open-folder"
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
                        />
                      </div>
                    ) : null
                }
              </div>
            </div>
          </section>
          <Similars language={this.props.language} id={this.props.id} />
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Patent;

Patent.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
