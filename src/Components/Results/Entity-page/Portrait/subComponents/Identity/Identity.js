import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import LogoCard from '../../../../../Shared/Ui/LogoCard/LogoCard';
import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleListCard from '../../../../../Shared/Ui/SimpleListCard/SimpleListCard';
import DescriptionCard from '../../../../../Shared/Ui/DescriptionCard/DescriptionCard';

import getSelectKey from '../../../../../../Utils/getSelectKey';

import classes from './Identity.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * Identity
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Identity extends Component {
  state = {
    modifyMode: false,
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    // nom
    const name = getSelectKey(this.props, 'name', this.props.language, 'fr');

    // acronym
    const acronym = getSelectKey(this.props, 'acronym', this.props.language, 'fr');

    // label
    const label = (acronym) ? `${name} (${acronym})` : name;

    // description
    const description = getSelectKey(this.props, 'description', this.props.language, 'fr');

    return (
      <div className="col-md-6">
        <div className={classes.Identity}>
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={messages[this.props.language]['Entity.portrait.identity.title']} />
            </div>
          </div>

          <div className="row">
            <div className={`col-lg-6 ${classes.CardContainer}`}>
              <SimpleCard
                language={this.props.language}
                logo="fas fa-id-card"
                title={messages[this.props.language]['Entity.portrait.identity.name']}
                label={label}
                tooltip=""
                masterKey={this.props.masterKey}
                modifyMode={this.props.modifyMode}
                allData={this.props.allData}
              />
            </div>
            <div className={`col-lg-6 ${classes.CardContainer}`}>
              <LogoCard
                language={this.props.language}
                src={`https://scanr.enseignementsup-recherche.gouv.fr/static/logos/${this.props.id}.png`}
                url={`https://scanr-preprod.sword-group.com/api/v2/structures/screenshot/${this.props.id}`}
                cssClass="Height150"
                masterKey={this.props.masterKey}
                modifyMode={this.props.modifyMode}
                allData={this.props.allData}
              />
            </div>
            <div className={`col-lg-6 ${classes.CardContainer}`}>
              <SimpleListCard
                language={this.props.language}
                logo="fas fa-qrcode"
                title={messages[this.props.language]['Entity.portrait.identity.id']}
                label={this.props.id}
                list={this.props.externalIds}
                labelListButton={messages[this.props.language]['Entity.portrait.identity.externalIdsButtons']}
                tooltip={messages[this.props.language]['Entity.portrait.identity.id.tooltip']}
                masterKey={this.props.masterKey}
                modifyMode={this.props.modifyMode}
                allData={this.props.allData}
              />
            </div>
            <div className={`col-lg-6 ${classes.CardContainer}`}>
              <SimpleCard
                language={this.props.language}
                logo="fas fa-flask"
                title={messages[this.props.language]['Entity.portrait.identity.nature']}
                label={this.props.nature || ''}
                tooltip=""
                masterKey={this.props.masterKey}
                modifyMode={this.props.modifyMode}
                allData={this.props.allData}
              />
            </div>
            {
              (description)
                ? (
                  <div className={`col-lg-12 ${classes.CardContainer}`}>
                    <DescriptionCard
                      language={this.props.language}
                      title={messages[this.props.language]['Entity.portrait.identity.description.title']}
                      text={`${description}`}
                      tooltip=""
                      masterKey={this.props.masterKey}
                      modifyMode={this.props.modifyMode}
                      allData={this.props.allData}
                    />
                  </div>
                ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Identity;
/* eslint-disable */
Identity.propTypes = {
  language: PropTypes.string.isRequired,
  acronym: PropTypes.array,
  description: PropTypes.object,
  externalIds: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.object,
  nature: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
