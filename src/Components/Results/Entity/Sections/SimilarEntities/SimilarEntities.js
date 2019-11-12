import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import EntityCard from '../../../../Search/SearchResults/ResultCards/EntityCard';
import { API_STRUCTURE_LIKE_END_POINT } from '../../../../../config/config';
import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../../translations/fr.json';
import messagesEntityEn from '../../translations/en.json';

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
  state= {
    data: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.getData();
    }
  }

  getData = () => {
    const url = API_STRUCTURE_LIKE_END_POINT;
    const data = {
      fields: ['publications.publication.title', 'websites.description', 'activities.label', 'description'],
      likeIds: [this.props.data.id],
      likeTexts: [],
      lang: 'default',
    };
    Axios.post(url, data).then((response) => {
      if (response.data.total > 0) {
        const data3 = [];
        for (let i = 0; i < response.data.total; i += 1) {
          if (response.data.results[i].value.id !== this.props.data.id) {
            data3.push(response.data.results[i]);
          }
          if (data3.length === 6) {
            break;
          }
        }
        this.setState({ data: data3 });
      }
    });
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

    if (!this.props.data || this.state.data === null) {
      return null;
    }

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.SimilarEntities}`} style={sectionStyle}>
            <div className="container">
              <div className={`row ${classes.SectionTitle}`}>
                <div className="col">
                  <i className="fas fa-th" />
                  <span className={classes.Label}>
                    {messagesEntity[this.props.language]['Entity.Section.SimilarEntities.label']}
                  </span>
                </div>
              </div>
              <ul className={`row ${classes.Ul}`}>
                {
                  this.state.data.map(item => (
                    <li key={item.value} className={`col-md-4 ${classes.Li}`}>
                      <EntityCard
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
