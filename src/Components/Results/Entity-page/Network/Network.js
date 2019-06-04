import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import Axios from 'axios';
import PropTypes from 'prop-types';

import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import SimpleCountListCard from '../../../Shared/Ui/SimpleCountListCard/SimpleCountListCard';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import { API_STRUCTURES_END_POINT } from '../../../../config/config';

import classes from './Network.scss';

/**
 * Network
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Network extends Component {
  state = {
    dataSupervisorOf: {},
  };

  componentDidMount() {
    this.getDataSupervisorOf();
  }

  getDataSupervisorOf = () => {
    const url = `${API_STRUCTURES_END_POINT}/search`;
    const obj = {
      filters: {
        'institutions.structure.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: ['200711886U'],
        },
      },
    };
    Axios.post(url, obj)
      .then((response) => {
        console.log('response:', response.data.result);
      })
      .catch(e => console.log('error:', e));
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Network}`}>
            <div className="container">
              <SectionTitle icon="fas fa-network-wired">
                <FormattedHTMLMessage id="Entity.network.title" defaultMessage="Entity.network.title" />
              </SectionTitle>
              <div className="row">
                {
                  (this.props.data.institutions.length > 0) ? (
                    <div className={`col-4 ${classes.NoSpace}`}>
                      <SimpleCountListCard
                        language={this.props.language}
                        data={this.props.data.institutions}
                        title={messages[this.props.language]['Entity.network.supervisors.title']}
                        label={(this.props.data.institutions.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                        tooltip=""
                        modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                        modalButtonTitle={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.title']}
                      />
                    </div>
                  ) : null
                }
                {
                  (this.props.data.children.length > 0) ? (
                    <div className={`col-4 ${classes.NoSpace}`}>
                      <SimpleCountListCard
                        language={this.props.language}
                        data={this.props.data.children}
                        title={messages[this.props.language]['Entity.network.headOf.title']}
                        label={(this.props.data.children.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                        tooltip=""
                        modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                        modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                      />
                    </div>
                  ) : null
                }
                {
                  (this.state.dataSupervisorOf.length > 0) ? (
                    <div className={`col-4 ${classes.NoSpace}`}>
                      <SimpleCountListCard
                        language={this.props.language}
                        data={this.state.dataSupervisorOf}
                        title={messages[this.props.language]['Entity.network.supervisorOf.title']}
                        label={(this.state.dataSupervisorOf.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                        tooltip=""
                        modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                        modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                      />
                    </div>
                  ) : null
                }
              </div>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default Network;

Network.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
