import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import Axios from 'axios';
import PropTypes from 'prop-types';

import EmptySection from '../../../../Shared/Results/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/SectionTitle';
import SimpleCountListCard from '../../../../Shared/Ui/SimpleCountListCard/SimpleCountListCard';

import getSelectKey from '../../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../../translations/fr.json';
import messagesEntityEn from '../../translations/en.json';

import { API_STRUCTURES_END_POINT } from '../../../../../config/config';

import classes from './Network.scss';

const messagesEntity = {
  fr: messagesEntityFr,
  en: messagesEntityEn,
};

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
    satt: [],
    dataSupervisorOfTotal: 0,
  };

  componentDidMount() {
    this.getDataSupervisorOf();
    this.getLinksOf();
    if (this.props.data.relations) {
      const satt = this.props.data.relations.filter(item => item.type === 'satt_actionnaire');
      this.setState({ satt });
      const incubateur = this.props.data.relations.filter(item => item.type === 'incubateur_public');
      this.setState({ incubateur });
      const carnot = this.props.data.relations.filter(item => item.type === 'membre_carnot');
      this.setState({ carnot });
      const spinoff = this.props.data.relations.filter(item => item.type.indexOf('spinoff') !== -1);
      this.setState({ spinoff });
      const rachete = this.props.data.relations.filter(item => item.type === 'rachete_par');
      this.setState({ rachete });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.id !== this.props.data.id) {
      this.getDataSupervisorOf();
    }
  }

  getDataSupervisorOf = () => {
    if (this.props.data.id) {
      const url = `${API_STRUCTURES_END_POINT}/search`;
      const obj = {
        filters: {
          'institutions.structure.id': {
            type: 'MultiValueSearchFilter',
            op: 'all',
            values: [`${this.props.data.id}`],
          },
        },
        pageSize: 10000,
      };
      Axios.post(url, obj)
        .then((response) => {
          const newData = response.data.results.map((item) => {
            const o = { label: getSelectKey(item.value, 'label', this.props.language, 'fr') };
            return o;
          });
          this.setState({ dataSupervisorOf: newData, dataSupervisorOfTotal: response.data.total });
        });
    }
  }

  getLinksOf = () => {
    if (this.props.data.id) {
      const url = `${API_STRUCTURES_END_POINT}/search`;
      const obj = {
        filters: {
          'relations.structure.id': {
            type: 'MultiValueSearchFilter',
            op: 'all',
            values: [`${this.props.data.id}`],
          },
        },
        sourceFields: ['relations', 'label', 'id'],
        pageSize: 10000,
      };
      Axios.post(url, obj)
        .then((response) => {
          const newData = response.data.results.map((item) => {
            const o = {
              label: getSelectKey(item.value, 'label', this.props.language, 'fr'),
              id: item.value.id,
              relations: item.value.relations.filter(r => r.structure && r.structure.id === this.props.data.id),
            };
            return o;
          });
          const appartientCarnot = newData.filter(r => r.relations[0].type === 'membre_carnot');
          const actionnaireSatt = newData.filter(r => r.relations[0].type === 'satt_actionnaire');
          const aRachete = newData.filter(r => r.relations[0].type === 'rachete_par');
          const aIncube = newData.filter(r => r.relations[0].type === 'incubateur_public');
          const spinoffFrom = newData.filter(r => r.relations[0].type.indexOf('spinoff') !== -1);
          const inverseRelations = [].concat(appartientCarnot, actionnaireSatt, aRachete, aIncube, spinoffFrom);
          const hasNoInverseRelation = (inverseRelations.length === 0);
          this.setState({
            appartientCarnot, actionnaireSatt, aRachete, spinoffFrom, aIncube, hasNoInverseRelation,
          });
        });
    }
  }


  componentDidCatch(error, info) {
    /* eslint-disable-next-line */
    console.log('catch : ', error, info);
  }

  renderTitle = () => (
    <Fragment>
      <div className="container">
        <SectionTitle
          icon="fa-network-wired"
          objectType="structures"
          language={this.props.language}
          id={this.props.id}
          title={messagesEntity[this.props.language]['Entity.Section.Network.label']}
        />
      </div>
    </Fragment>
  );

  renderEmptySection = messages => (
    <Fragment>
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section className={`container-fluid ${classes.Network}`}>
          <div className="container">
            <SectionTitle
              icon="fa-network-wired"
              objectType="structures"
              language={this.props.language}
              id={this.props.id}
              title={messagesEntity[this.props.language]['Entity.Section.Network.label']}
            />
            <div className="row">
              <div className="col">
                <EmptySection
                  language={this.props.language}
                />
              </div>
            </div>
          </div>
        </section>
      </IntlProvider>
    </Fragment>
  );

  renderSection = messages => (
    <Fragment>
      {this.renderTitle(messages)}
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section className={`container-fluid ${classes.Network}`}>
          <div className="container">
            <div className="row">
              {
                (this.props.data.institutions && this.props.data.institutions.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      maxList={10}
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
                (this.props.data.children && this.props.data.children.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.props.data.children}
                      maxList={5}
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
                (this.state.dataSupervisorOf && this.state.dataSupervisorOf.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.dataSupervisorOf}
                      maxList={5}
                      count={this.state.dataSupervisorOfTotal}
                      title={messages[this.props.language]['Entity.network.supervisorOf.title']}
                      label={(this.state.dataSupervisorOf.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.satt && this.state.satt.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.satt}
                      maxList={5}
                      count={this.state.satt.length}
                      title={messages[this.props.language]['Entity.network.satt.title']}
                      label={(this.state.satt.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.carnot && this.state.carnot.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.carnot}
                      maxList={5}
                      count={this.state.carnot.length}
                      title={messages[this.props.language]['Entity.network.carnot.title']}
                      label={(this.state.carnot.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.incubateur && this.state.incubateur.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.incubateur}
                      maxList={5}
                      count={this.state.incubateur.length}
                      title={messages[this.props.language]['Entity.network.incubateur.title']}
                      label={(this.state.incubateur.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.spinoff && this.state.spinoff.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.spinoff}
                      maxList={5}
                      count={this.state.spinoff.length}
                      title={messages[this.props.language]['Entity.network.spinoff.title']}
                      label={(this.state.spinoff.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.rachete && this.state.rachete.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.rachete}
                      maxList={5}
                      count={this.state.rachete.length}
                      title={messages[this.props.language]['Entity.network.rachete.title']}
                      label={(this.state.rachete.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.aRachete && this.state.aRachete.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.aRachete}
                      maxList={5}
                      count={this.state.aRachete.length}
                      title={messages[this.props.language]['Entity.network.aRachete.title']}
                      label={(this.state.aRachete.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.aIncube && this.state.aIncube.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.aIncube}
                      maxList={5}
                      count={this.state.aIncube.length}
                      title={messages[this.props.language]['Entity.network.aIncube.title']}
                      label={(this.state.aIncube.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.appartientCarnot && this.state.appartientCarnot.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.appartientCarnot}
                      maxList={5}
                      count={this.state.appartientCarnot.length}
                      title={messages[this.props.language]['Entity.network.appartientCarnot.title']}
                      label={(this.state.appartientCarnot.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.actionnaireSatt && this.state.actionnaireSatt.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.actionnaireSatt}
                      maxList={5}
                      count={this.state.actionnaireSatt.length}
                      title={messages[this.props.language]['Entity.network.actionnaireSatt.title']}
                      label={(this.state.actionnaireSatt.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
                      tooltip=""
                      modalButtonLabel={messages[this.props.language]['Entity.network.supervisors.SimpleCountListCard.label']}
                      modalButtonTitle={messages[this.props.language]['Entity.network.entities.SimpleCountListCard.title']}
                    />
                  </div>
                ) : null
              }
              {
                (this.state.spinoffFrom && this.state.spinoffFrom.length > 0) ? (
                  <div className={`col-md-4 ${classes.NoSpace}`}>
                    <SimpleCountListCard
                      language={this.props.language}
                      data={this.state.spinoffFrom}
                      maxList={5}
                      count={this.state.spinoffFrom.length}
                      title={messages[this.props.language]['Entity.network.spinoffFrom.title']}
                      label={(this.state.spinoffFrom.length > 1) ? messages[this.props.language]['Entity.network.supervisors.label.plural'] : messages[this.props.language]['Entity.network.supervisors.label.singular']}
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


  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const childrenHasNoData = (!this.props.data.children || this.props.data.children.length === 0);
    const relationsHasNoData = ((!this.props.data.relations || this.props.data.relations.length === 0)) && (this.state.hasNoInverseRelation);
    const institutionsHasNoData = (!this.props.data.institutions || this.props.data.institutions.length === 0);
    if (!this.props.data
      || (this.state.dataSupervisorOfTotal === 0
        && childrenHasNoData
        && relationsHasNoData
        && institutionsHasNoData)) {
      return this.renderEmptySection(messages);
    }

    return this.renderSection(messages);
  }
}

export default Network;

Network.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
