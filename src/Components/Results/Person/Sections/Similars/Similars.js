import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import SimilarCard from '../../../../Search/SearchResults/ResultCards/PersonCard';
import { API_PERSON_LIKE_END_POINT } from '../../../../../config/config';
import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';

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
    const request = {
      fields: ['publications.publication.title', 'keywords.fr', 'keywords.en'],
      likeIds: [this.props.data.id],
      likeTexts: [],
      lang: 'default',
      pageSize: 100,
    };
    Axios.post(url, request).then((response) => {
      const forbiddenSimilars = (this.props.data.coContributors) ? this.props.data.coContributors.map(co => co.id) : [];
      if (response.data.total && response.data.total > 0) {
        const pushData = [];
        for (let i = 0; i < Math.min(response.data.total, 10); i += 1) {
          const isCo = forbiddenSimilars.includes(response.data.results[i].value.id);
          if (response.data.results[i].value.id !== this.props.data.id && !isCo) {
            pushData.push(response.data.results[i]);
          }
          if (pushData.length === 4) {
            break;
          }
        }
        this.setState({ data: pushData });
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
              <SectionTitle
                icon="fas fa-th"
                modifyModeHandle={this.props.modifyModeHandle}
                modifyModeKey=""
                modifyMode={this.props.modifyMode}
              >
                <FormattedHTMLMessage id="Person.similars.title" defaultMessage="Person.similars.title" />
              </SectionTitle>
              <ul className={`row px-2 ${classes.Ul}`}>
                {
                  this.state.data.map(item => (
                    <li key={item.value} className={`col-sm-6 col-lg-3 ${classes.Li}`}>
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
  modifyModeHandle: PropTypes.func.isRequired,
  modifyMode: PropTypes.string.isRequired,
};
