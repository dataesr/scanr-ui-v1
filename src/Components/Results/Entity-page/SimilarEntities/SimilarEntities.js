import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';
import { API_PROJECTS_SEARCH_END_POINT } from '../../../../config/config';
import getSelectKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../translations/fr.json';
import messagesEntityEn from '../translations/en.json';

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

  getData = () => {
    const url = 'https://scanr-preprod.sword-group.com/api/v2/structures/like';
    const searched = getSelectKey(this.props.data, 'label', this.props.language, 'fr');
    const data = {
      fields: [
        'label',
      ],
      likeIds: [],
      likeTexts: [searched],
      lang: 'fr',
    };
    Axios.post(url, data).then((response) => {
      if (response.data.total > 0) {
        const data3 = [];
        for (let i = 0; i < 4; i += 1) {
          if (response.data.results[i].value.id !== this.props.data.id) {
            data3.push(response.data.results[i]);
          }
          if (i === 3) {
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

    if (this.state.data === null) {
      this.getData();
    }

    if (!this.props.data || this.state.data === null) {
      return null;
    }

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.SimilarEntities}`}>
            <div className="container">
              <div className={`row ${classes.SectionTitle}`}>
                <div className="col">
                  <i className="fas fa-th" />
                  <span className={classes.Label}>
                    {messagesEntity[this.props.language]['Entity.Section.SimilarEntities.label']}
                  </span>
                </div>
              </div>
              <div className="row">
                {
                  this.state.data.map((item, i) => {
                    let address = null;
                    if (item.value.address && item.value.address.length > 0) {
                      address = item.value.address[0].city;
                      if (item.value.address[0].postcode) {
                        address += ` (${item.value.address[0].postcode.slice(0, 2)})`;
                      }
                    }

                    return (
                      /* eslint-disable-next-line */
                      <div className="col-md-4 p-0" key={`se_card_${item.value.id}_${i}`}>
                        <div className={classes.Card}>
                          <div className={classes.Title}>
                            {
                              getSelectKey(item.value, 'label', this.props.language, 'fr')
                            }
                          </div>
                          <div className={classes.Content}>
                            {
                              (address)
                                ? (
                                  <div>
                                    <i className="fas fa-map-marker" />
                                    <span>
                                      {
                                        address
                                      }
                                    </span>
                                  </div>
                                ) : null
                            }
                            {
                              (item.value.nature)
                                ? (
                                  <div>
                                    <i className="fas fa-flask" />
                                    <span>
                                      {item.value.nature}
                                    </span>
                                  </div>
                                ) : null
                            }
                            {
                              (item.value.id)
                                ? (
                                  <div>
                                    <i className="fas fa-th-large" />
                                    <span>
                                      {item.value.id}
                                    </span>
                                  </div>
                                ) : null
                            }
                            <div className={classes.ButtonContainer}>
                              <ButtonToPage
                                className={`${classes.btn_scanrBlue} ${classes.Button}`}
                                url={`entite/${item.value.id}`}
                              >
                                Fiche
                              </ButtonToPage>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
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
