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
      this.setCounts();
    }
  }

  setCounts = () => {
    const countsObj = {};
    let searchTarget = '';
    if (this.props.data.publications && this.props.data.publications.length > 0) {
      searchTarget = 'publications.publication.title';
      for (let i = 0; i < this.props.data.publications.length; i += 1) {
        if (this.props.data.publications[i].publication && this.props.data.publications[i].publication.title) {
          const splitTab = this.props.data.publications[i].publication.title.default.toLowerCase().split(' ');
          for (let j = 0; j < splitTab.length; j += 1) {
            if (splitTab[j].length > 3) {
              if (!countsObj[splitTab[j]]) {
                countsObj[splitTab[j]] = 0;
              }
              countsObj[splitTab[j]] += 1;
            }
          }
        }
      }
    }
    /* eslint-disable */
    const countsObjSorted = [];
    for (var item in countsObj) {
        countsObjSorted.push([item, countsObj[item]]);
    }

    countsObjSorted.sort(function(a, b) {
        return b[1] - a[1];
    });
    const searchTextTab = [];
    for (let k = 0; k < Math.min(50,countsObjSorted.length); k += 1) {
      searchTextTab.push(countsObjSorted[k][0]);
    }
    const searchText = searchTextTab.join(' ');
    /* eslint-enable */
    if (searchTarget) {
      this.getData(searchText, searchTarget);
    }
  }

  getData = (searchText, searchTarget) => {
    const url = API_PERSON_LIKE_END_POINT;
    const data = {
      fields: [
        searchTarget,
      ],
      likeIds: [],
      likeTexts: [searchText],
      lang: 'default',
    };
    Axios.post(url, data).then((response) => {
      const forbiddenSimilars = (this.props.data.coContributors) ? this.props.data.coContributors.map(co => co.id) : null;
      if (response.data.total > 0) {
        const data3 = [];
        for (let i = 0; i < response.data.total; i += 1) {
          const isCo = forbiddenSimilars.includes(response.data.results[i].value.id);
          if (response.data.results[i].value.id !== this.props.data.id && !isCo) {
            data3.push(response.data.results[i]);
          }
          if (data3.length === 4) {
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


    const sectionStyle = {
      backgroundImage: `url(${Background})`,
    };

    if (!this.props.data || this.state.data === null) {
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
  data: PropTypes.string.isRequired,
};
