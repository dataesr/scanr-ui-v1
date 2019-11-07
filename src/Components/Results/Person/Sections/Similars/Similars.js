import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import SimilarCard from '../../../../Search/SearchResults/ResultCards/PersonCard';
import { API_PERSON_LIKE_END_POINT } from '../../../../../config/config';
import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

import classes from './Similars.scss';

/**
 * SimilarEntities
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class SimilarPersons extends Component {
  state= {
    data: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.getData();
    }
  }

  getData = () => {
    const url = API_PERSON_LIKE_END_POINT;
    const data = {
      fields: ['publications.publication.title', 'keywords.fr', 'keywords.en'],
      likeIds: [this.props.data.id],
      likeTexts: [],
      lang: 'default',
      pageSize: 100,
    };
    Axios.post(url, data).then((response) => {
      const forbiddenSimilars = (this.props.data.coContributors) ? this.props.data.coContributors.map(co => co.id) : null;
<<<<<<< HEAD
      if (response.data.total && response.data.total > 0) {
        const data3 = [];
        for (let i = 0; i < Math.min(response.data.total, 10); i += 1) {
=======
      if (response.data.total > 0) {
        const data4 = [];
        for (let i = 0; i < response.data.results.length; i += 1) {
>>>>>>> 09cc2944edd1ff15032deb5f309445bfa4e2c27f
          const isCo = forbiddenSimilars.includes(response.data.results[i].value.id);
          if (response.data.results[i].value.id !== this.props.data.id && !isCo) {
            data4.push(response.data.results[i]);
          }
          if (data4.length === 4) {
            break;
          }
        }
        this.setState({ data: data4 });
      }
    });
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };


    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };

    if (!this.props.data || !this.state.data || this.state.data.length === 0) {
      return null;
    }

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Similar}`} style={sectionStyle}>
            <div className="container">
              <div className={`row ${classes.SectionTitle}`}>
                <div className="col">
                  <i className="fas fa-th" />
                  <span className={classes.Label}>
                    {messages[this.props.language]['Person.similars.title']}
                  </span>
                </div>
              </div>
              <ul className={`row px-2 ${classes.Ul}`}>
                {
                  this.state.data.map(item => (
                    <li key={item.value} className={`col-3 col-s-12 ${classes.Li}`}>
                      <SimilarCard
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

export default SimilarPersons;

SimilarPersons.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
