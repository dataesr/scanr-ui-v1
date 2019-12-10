import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import SimilarCard from '../../../../Search/Results/ResultCards/ProjectCard';
import { API_PROJECT_LIKE_END_POINT } from '../../../../../config/config';
import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';
import SectionTitle from '../../../Shared/SectionTitle';

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
      this.getData();
    }
  }

  getData = () => {
    const url = API_PROJECT_LIKE_END_POINT;
    const data = {
      fields: ['publications.title', 'description', 'title', 'domains.label', 'label'],
      likeIds: [this.props.data.id],
      likeTexts: [],
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
        this.setState({ data: data6 });
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
              <SectionTitle
                icon="fa-th"
                language={this.props.language}
                title={messages[this.props.language]['Project.similars.title']}
              />
              <ul className={`row ${classes.Ul}`}>
                {
                  this.state.data.map(item => (
                    <li key={item.value} className={`col-md-4 ${classes.Li}`}>
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
