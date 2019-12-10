import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../../config/config';

import PublicationCard from '../../../../Search/SearchResults/ResultCards/PublicationCard';
import Background from '../../../../Shared/images/poudre-fuschia_Fgris-B.jpg';
import SectionTitle from '../../../Shared/SectionTitle';
import ThesisParticipationsCard from '../../Components/ThesisParticipationsCard';
import IsOa from '../../../Production/Shared/Oa/OaCard';
import OaLink from '../../../Production/Shared/Oa/OaLink';

/* Gestion des langues */
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

import classes from './Thesis.scss';

/**
 * SimilarEntities
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Thesis extends Component {
  state= {
    theses: [],
    rapporteur: [],
    direction: [],
    loading: true,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    const request = {
      pageSize: 500,
      sourceFields: ['title', 'authors', 'oaEvidence', 'id', 'publicationDate', 'isOa', 'productionType'],
      filters: {
        productionType: {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: ['thesis'],
        },
        'authors.person.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: [this.props.person],
        },
      },
    };
    Axios.post(url, request).then((response) => {
      const result = response.data.results;
      // const empty = (result.length === 0);
      let theses = [];
      const rapporteur = [];
      const direction = [];
      if (result && result.length > 0) {
        result.forEach((thes, i) => {
          thes.value.authors.forEach((author) => {
            if (author.role === 'author' && author.person && author.person.id === this.props.id) {
              theses.push(result[i].value);
            } else if (author.role === 'directeurthese' && author.person && author.person.id === this.props.id) {
              direction.push(result[i].value);
            } else if (author.role === 'rapporteur' && author.person && author.person.id === this.props.id) {
              rapporteur.push(result[i].value);
            }
          });
        });
      }
      if (theses.length > 0) {
        const thesesOnly = theses.filter(t => (t.id).indexOf('these') !== -1);
        if (thesesOnly.length !== 0) {
          theses = thesesOnly;
        }
      }
      const displaySection = (rapporteur.length > 0) || (theses.length > 0) || (direction.length > 0);
      this.setState({
        rapporteur,
        theses,
        direction,
        displaySection,
        loading: false,
      });
    });
  }

  setThesisData = () => {

  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };


    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };
    if (this.state.loading) {
      // return ('hello world');
    }
    if (!this.state.loading && !this.state.displaySection) {
      return null;
      // return ('hello again');
    }
    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Thesis}`} style={sectionStyle}>
            <div className="container">
              <SectionTitle
                icon="fa-folder-open"
                objectType="persons"
                language={this.props.language}
                id={this.props.id}
                title={messages[this.props.language]['Person.thesis.title']}
              />
              {
                (this.state.theses && this.state.theses.length > 0)
                  ? (
                    /* eslint-disable-next-line */
                    this.state.theses.map((currentThesis) => {
                      return (
                        <div className="row d-flex justify-content-stretch">
                          {
                  (currentThesis.title)
                    ? <div className={`col-md-6 ${classes.CardContainer}`}><div className={classes.isOa}><PublicationCard small language={this.props.language} data={currentThesis} /></div></div>
                    : null
                }
                          {
                  (currentThesis.title)
                    ? <div className={`col-md-3 ${classes.CardContainer}`}><div className={classes.isOa}><IsOa className="p-3" language={this.props.language} oa={currentThesis.isOa} /></div></div>
                    : null
                }
                          {
                  (currentThesis.title && currentThesis.isOa)
                    ? <div className={`col-md-3 ${classes.CardContainer}`}><OaLink className={classes.CardHeight} language={this.props.language} oaEvidence={currentThesis.oaEvidence} /></div>
                    : null
                }
                        </div>
                      );
                    })
                  ) : null
              }
              <div className="row">
                {
                  (this.state.direction && this.state.direction.length > 0)
                    ? (
                      <div className="p-1 col-md-6">
                        <ThesisParticipationsCard
                          title={(this.props.language === 'fr') ? 'direction de thèses' : 'thesis directed'}
                          buttonLabel={(this.props.language === 'fr') ? 'Voir toutes' : 'All'}
                          dataHtml={this.state.direction.map(these => (<PublicationCard small language={this.props.language} data={these} />))}
                        />
                      </div>
                    )
                    : null
                }
                {
                  (this.state.rapporteur && this.state.rapporteur.length > 0)
                    ? (
                      <div className="p-1 col-md-6">
                        <ThesisParticipationsCard
                          title={(this.props.language === 'fr') ? 'participations à des jury en tant que rapporteur' : 'jury participations as a reviewer'}
                          buttonLabel={(this.props.language === 'fr') ? 'Voir toutes' : 'All'}
                          dataHtml={this.state.rapporteur.map(these => (<PublicationCard small language={this.props.language} data={these} />))}
                        />
                      </div>
                    )
                    : null
                }
              </div>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default Thesis;

Thesis.propTypes = {
  language: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
