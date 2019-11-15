import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../../config/config';

import PublicationCard from '../../../../Search/SearchResults/ResultCards/PublicationCard';
import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import SectionTitle from '../../../Shared/SectionTitle';
import ThesisParticipationsCard from '../../Components/ThesisParticipationsCard';
import IsOa from '../../../Production-page/Shared/Oa/OaCard';
import OaLink from '../../../Production-page/Shared/Oa/OaLink';
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
    thesis: {},
    juryMember: [],
    direction: [],
    empty: false,
    loading: true,
  };

  componentDidMount() {
    if (!this.props.personName) {
      this.getData();
    }
  }

  componentDidUpdate() {
    if (!this.props.personName) {
      this.getData();
    }
  }

  getData = () => {
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    const request = {
      pageSize: 500,
      sourceFields: ['title', 'authors', 'oaEvidence', 'id', 'publicationDate', 'isOa'],
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
      const empty = (result.length === 0);
      let thesis = {};
      const juryMember = [];
      const direction = [];
      if (result && result.length > 0) {
        result.forEach((thes, i) => {
          thes.value.authors.forEach((author) => {
            if (author.role === 'author' && author.fullName === this.props.personName) {
              thesis = result[i].value;
            } else if (author.role === 'directeurthese' && author.fullName === this.props.personName) {
              direction.push(result[i].value);
            } else if (author.fullName === this.props.personName) {
              juryMember.push(result[i].value);
            }
          });
        });
      }
      this.setState({
        juryMember,
        thesis,
        direction,
        empty,
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
      return ('hello world');
    }
    if (!this.state.loading && this.state.empty) {
      return ('hello again');
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
              <div className="row d-flex justify-content-stretch">
                {
                  (this.state.thesis.title)
                    ? <div className={`col-md-6 ${classes.CardContainer}`}><div className={classes.isOa}><PublicationCard small language={this.props.language} data={this.state.thesis} /></div></div>
                    : null
                }
                {
                  (this.state.thesis.title)
                    ? <div className={`col-md-3 ${classes.CardContainer}`}><div className={classes.isOa}><IsOa className="p-3" language={this.props.language} oa={this.state.thesis.isOa} /></div></div>
                    : null
                }
                {
                  (this.state.thesis.title && this.state.thesis.isOa)
                    ? <div className={`col-md-3 ${classes.CardContainer}`}><OaLink className={classes.CardHeight} language={this.props.language} oaEvidence={this.state.thesis.oaEvidence} /></div>
                    : null
                }
              </div>
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
                  (this.state.juryMember && this.state.juryMember.length > 0)
                    ? (
                      <div className="p-1 col-md-6">
                        <ThesisParticipationsCard
                          title={(this.props.language === 'fr') ? 'participation à des jury' : 'jury participations'}
                          buttonLabel={(this.props.language === 'fr') ? 'Voir toutes' : 'All'}
                          dataHtml={this.state.juryMember.map(these => (<PublicationCard small language={this.props.language} data={these} />))}
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
  personName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
