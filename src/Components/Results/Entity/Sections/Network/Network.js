import React, { Component, Fragment } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import Axios from 'axios';
import PropTypes from 'prop-types';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import SimpleCountListCard from '../../../../Shared/Ui/SimpleCountListCard/SimpleCountListCard';
import PrizeCard from '../../../../Shared/Ui/PrizeCard/PrizeCard';

import getSelectKey from '../../../../../Utils/getSelectKey';

import { API_STRUCTURES_END_POINT } from '../../../../../config/config';
import styles from '../../../../../style.scss';
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
    satt: [],
    networkBadges: [],
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
    if (this.props.data.badges) {
      const networkBadges = this.props.data.badges.filter(b => ['carnot', 'gican', 'gifas', 'gicat', 'rescurie', 'allenvi', 'itagricole', 'irt', 'polecompetitivite', 'satt'].includes(b.code.toLowerCase()));
      this.setState({ networkBadges });
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
        pageSize: 100,
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

  renderSection = () => (
    <Fragment>
      <div className="row">
        {
          (this.props.data.institutions && this.props.data.institutions.length > 0) ? (
            <div className={`col-md-4 ${classes.NoSpace}`}>
              <SimpleCountListCard
                language={this.props.language}
                maxList={10}
                data={this.props.data.institutions}
                title={<FormattedHTMLMessage id="Entity.Network.supervisors.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.props.data.institutions.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.headOf.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.props.data.children.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.supervisorOf.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.dataSupervisorOf.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.satt.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.satt.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.carnot.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.carnot.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.incubateur.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.incubateur.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.spinoff.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.spinoff.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.rachete.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.rachete.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.aRachete.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.aRachete.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.aIncube.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.aIncube.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.appartientCarnot.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.appartientCarnot.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.Network.actionnaireSatt.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.actionnaireSatt.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
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
                title={<FormattedHTMLMessage id="Entity.network.spinoffFrom.title" />}
                label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.spinoffFrom.length }} />}
                tooltip=""
                modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
              />
            </div>
          ) : null
        }
      </div>
      <div className="row">
        {
          this.state.networkBadges.map(badge => (
            <div className={`col-md-4 ${classes.CardContainer}`}>
              <PrizeCard
                date={null}
                title={<FormattedHTMLMessage id="Entity.Network.prizeCard.title" />}
                language={this.props.language}
                label={getSelectKey(badge, 'label', this.props.language, 'fr')}
                icon="prize"
                color={styles.personColor}
              />
            </div>
          ))
        }
      </div>
    </Fragment>
  );


  render() {
    const childrenHasNoData = (!this.props.data.children || this.props.data.children.length === 0);
    const relationsHasNoData = ((!this.props.data.relations || this.props.data.relations.length === 0)) && (this.state.hasNoInverseRelation);
    const institutionsHasNoData = (!this.props.data.institutions || this.props.data.institutions.length === 0);
    if (!this.props.data
      || (this.state.dataSupervisorOfTotal === 0
        && childrenHasNoData
        && relationsHasNoData
        && institutionsHasNoData)) {
      return <EmptySection />;
    }

    return this.renderSection();
  }
}

export default Network;

Network.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
