import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import SimilarCard from '../../../../Search/SearchResults/ResultCards/ProjectCard';
import { API_PROJECT_LIKE_END_POINT } from '../../../../../config/config';
import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import getSelectKey from '../../../../../Utils/getSelectKey';

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
class SimilarProjects extends Component {
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
      searchTarget = 'publications.title';
      for (let i = 0; i < this.props.data.publications.length; i += 1) {
        if (this.props.data.publications[i] && this.props.data.publications[i].title) {
          const splitTab = this.props.data.publications[i].title.default.toLowerCase().split(' ');
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
    } else if (getSelectKey(this.props.data, 'description', this.props.language, 'en')) {
      searchTarget = 'description';
      const splitTab = getSelectKey(this.props.data, 'description', this.props.language, 'en').toLowerCase().split(' ');
      for (let j = 0; j < splitTab.length; j += 1) {
        if (splitTab[j].length > 3) {
          if (!countsObj[splitTab[j]]) {
            countsObj[splitTab[j]] = 0;
          }
          countsObj[splitTab[j]] += 1;
        }
      }
    } else if (this.props.data.domains && this.props.data.domains.length > 0) {
      searchTarget = 'domains.label';
      for (let i = 0; i < this.props.data.domains.length; i += 1) {
        if (this.props.data.domains[i] && this.props.data.domains[i].label) {
          const splitTab = this.props.data.domains[i].label.default.toLowerCase().split(' ');
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
    const url = API_PROJECT_LIKE_END_POINT;
    const data = {
      fields: [
        searchTarget,
      ],
      likeIds: [],
      likeTexts: [searchText],
      lang: 'default',
    };
    Axios.post(url, data).then((response) => {
      if (response.data.total > 0) {
        const data3 = [];
        for (let i = 0; i < 7; i += 1) {
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
                    {messages[this.props.language]['Project.similars.title']}
                  </span>
                </div>
              </div>
              <ul className={`row ${classes.Ul}`}>
                {
                  this.state.data.map(item => (
                    <li key={item.value} className={`col-4 ${classes.Li}`}>
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

export default SimilarProjects;

SimilarProjects.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
