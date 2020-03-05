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
    this.getEntitiesWhereIMParent();
    if (this.props.data.relations) {
      const satt = this.props.data.relations.filter(item => item.type === 'satt_actionnaire');
      this.setState({ satt });
      const incubateur = this.props.data.relations.filter(item => item.type === 'incubateur_public');
      this.setState({ incubateur });
      const carnot = this.props.data.relations.filter(item => item.type === 'membre_carnot');
      this.setState({ carnot });
      const spinoff = this.props.data.relations.filter(item => ((item.type || '').indexOf('spinoff') !== -1) || false);
      this.setState({ spinoff });
      const rachete = this.props.data.relations.filter(item => item.type === 'rachete_par');
      this.setState({ rachete });
      const doctoralSchool = this.props.data.relations.filter(item => item.type === 'DS_LABS').filter(item => item.structure);
      this.setState({ doctoralSchool });
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
          status: {
            type: 'MultiValueSearchFilter',
            op: 'all',
            values: ['active'],
          },
        },
        pageSize: 100,
      };
      Axios.post(url, obj)
        .then((response) => {
          const newData = response.data.results.map((item) => {
            const o = { label: getSelectKey(item.value, 'label', this.props.language, 'fr'), id: item.value.id };
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
          const doctoralSchoolOf = newData.filter(r => r.relations[0].type === 'DS_LABS');
          const aIncube = newData.filter(r => r.relations[0].type === 'incubateur_public');
          const spinoffFrom = newData.filter(r => r.relations[0].type.indexOf('spinoff') !== -1);

          const inverseRelations = [].concat(appartientCarnot, actionnaireSatt, aRachete, aIncube, spinoffFrom, doctoralSchoolOf);
          const hasNoInverseRelation = (inverseRelations.length === 0);
          this.setState({
            appartientCarnot, actionnaireSatt, aRachete, spinoffFrom, aIncube, hasNoInverseRelation, doctoralSchoolOf,
          });
        });
    }
  }

  getEntitiesWhereIMParent = () => {
    if (this.props.data.id) {
      const url = `${API_STRUCTURES_END_POINT}/search`;
      const obj = {
        filters: {
          'parents.structure.id': {
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
            };
            return o;
          });
          this.setState({ entitiesWhereIMParent: newData });
        });
    }
  }

  renderSection = () => {
    let parents = null;
    if (this.props.data.parents) {
      parents = this.props.data.parents.filter(entity => entity.structure.status === 'active') || null;
    }
    return (
      <Fragment>
        <div className="row">
          {
            (this.props.data.institutions && this.props.data.institutions.length > 0) ? (
              <div className={`col-md-4 ${classes.NoSpace}`}>
                <SimpleCountListCard
                  language={this.props.language}
                  data={this.props.data.institutions}
                  title={<FormattedHTMLMessage id="Entity.Network.supervisors.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.props.data.institutions.length }} />}
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
                  title={<FormattedHTMLMessage id="Entity.Network.headOf.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.props.data.children.length }} />}
                  modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                  modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
                />
              </div>
            ) : null
          }
          {
            (parents) ? (
              <div className={`col-md-4 ${classes.NoSpace}`}>
                <SimpleCountListCard
                  language={this.props.language} // participe à
                  data={parents}
                  title={<FormattedHTMLMessage id="Entity.Network.parents.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.parents.label" values={{ count: parents.length }} />}
                  modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.parents.SimpleCountListCard.label" />}
                  modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.parents.SimpleCountListCard.title" />}
                />
              </div>
            ) : null
          }
          {
            (this.state.entitiesWhereIMParent && this.state.entitiesWhereIMParent.length > 0) ? (
              <div className={`col-md-4 ${classes.NoSpace}`}>
                <SimpleCountListCard
                  language={this.props.language} // participe à
                  data={this.state.entitiesWhereIMParent}
                  title={<FormattedHTMLMessage id="Entity.Network.entitiesWhereIMParent.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.entitiesWhereIMParent.label" values={{ count: this.state.entitiesWhereIMParent.length }} />}
                  modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.entitiesWhereIMParent.SimpleCountListCard.label" />}
                  modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entitiesWhereIMParent.SimpleCountListCard.title" />}
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
                  count={this.state.dataSupervisorOfTotal}
                  title={<FormattedHTMLMessage id="Entity.Network.supervisorOf.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.dataSupervisorOf.length }} />}
                  entityLabel={getSelectKey(this.props.data, 'label', this.props.language, 'fr')}
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
                  count={this.state.satt.length}
                  title={<FormattedHTMLMessage id="Entity.Network.satt.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.satt.length }} />}
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
                  count={this.state.carnot.length}
                  title={<FormattedHTMLMessage id="Entity.Network.carnot.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.carnot.length }} />}
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
                  count={this.state.incubateur.length}
                  title={<FormattedHTMLMessage id="Entity.Network.incubateur.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.incubateur.length }} />}
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
                  count={this.state.spinoff.length}
                  title={<FormattedHTMLMessage id="Entity.Network.spinoff.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.spinoff.length }} />}
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
                  count={this.state.rachete.length}
                  title={<FormattedHTMLMessage id="Entity.Network.rachete.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.rachete.length }} />}
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
                  count={this.state.aRachete.length}
                  title={<FormattedHTMLMessage id="Entity.Network.aRachete.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.aRachete.length }} />}
                  modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                  modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
                />
              </div>
            ) : null
          }
          {
            (this.state.doctoralSchool && this.state.doctoralSchool.length > 0) ? (
              <div className={`col-md-4 ${classes.NoSpace}`}>
                <SimpleCountListCard
                  language={this.props.language}
                  data={this.state.doctoralSchool}
                  count={this.state.doctoralSchool.length}
                  title={<FormattedHTMLMessage id="Entity.Network.doctoralSchool.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.doctoralSchool.length }} />}
                  modalButtonLabel={<FormattedHTMLMessage id="Entity.Network.supervisors.SimpleCountListCard.label" />}
                  modalButtonTitle={<FormattedHTMLMessage id="Entity.Network.entities.SimpleCountListCard.title" />}
                />
              </div>
            ) : null
          }
          {
            (this.state.doctoralSchoolOf && this.state.doctoralSchoolOf.length > 0) ? (
              <div className={`col-md-4 ${classes.NoSpace}`}>
                <SimpleCountListCard
                  language={this.props.language}
                  data={this.state.doctoralSchoolOf}
                  count={this.state.doctoralSchoolOf.length}
                  title={<FormattedHTMLMessage id="Entity.Network.doctoralSchoolOf.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.doctoralSchoolOf.length }} />}
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
                  count={this.state.aIncube.length}
                  title={<FormattedHTMLMessage id="Entity.Network.aIncube.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.aIncube.length }} />}
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
                  count={this.state.appartientCarnot.length}
                  title={<FormattedHTMLMessage id="Entity.Network.appartientCarnot.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.appartientCarnot.length }} />}
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
                  count={this.state.actionnaireSatt.length}
                  title={<FormattedHTMLMessage id="Entity.Network.actionnaireSatt.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.actionnaireSatt.length }} />}
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
                  count={this.state.spinoffFrom.length}
                  title={<FormattedHTMLMessage id="Entity.Network.spinoffFrom.title" />}
                  label={<FormattedHTMLMessage id="Entity.Network.supervisors.label" values={{ count: this.state.spinoffFrom.length }} />}
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
                  logo="fas fa-project-diagram fa-3x"
                  color={styles.personColor}
                  className={classes.PrizeCardStyle}
                />
              </div>
            ))
          }
        </div>
      </Fragment>
    );
  };

  render() {
    const childrenHasNoData = (!this.props.data.children || this.props.data.children.length === 0);
    const parentsHasNoData = (!this.props.data.parents || this.props.data.parents.length === 0);
    const relationsHasNoData = ((!this.props.data.relations || this.props.data.relations.length === 0)) && (this.state.hasNoInverseRelation);
    const institutionsHasNoData = (!this.props.data.institutions || this.props.data.institutions.length === 0);
    const noNetworkBadge = (this.state.networkBadges.length === 0);
    if (!this.props.data
      || (this.state.dataSupervisorOfTotal === 0
        && noNetworkBadge
        && childrenHasNoData
        && parentsHasNoData
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
