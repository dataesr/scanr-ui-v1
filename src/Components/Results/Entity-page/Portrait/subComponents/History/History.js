import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import SimpleCard from '../../../../../Shared/Ui/SimpleCard/SimpleCard';
import HistoryListCard from './HistoryListCard';

import classes from './History.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * History
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class History extends Component {
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
    return (
      <div className="col-6">
        <div className={classes.History}>
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={messages[this.props.language]['Entity.portrait.history.title']} />
            </div>
          </div>

          <div className="row">
            <div className={`col-lg-6 ${classes.NoSpace}`}>
              <SimpleCard
                language={this.props.language}
                logo="fas fa-id-card"
                title={messages[this.props.language]['Entity.portrait.history.createdDate.title']}
                label={this.props.creationYear}
                tooltip=""
                masterKey={this.props.masterKey}
                modifyMode={this.props.modifyMode}
                allData={this.props.allData}
              />
            </div>
            <div className={`col-lg-6 ${classes.NoSpace}`}>
              <HistoryListCard
                language={this.props.language}
                title={messages[this.props.language]['Entity.portrait.history.history.title']}
                list={this.props.predecessors}
                labelListButton={messages[this.props.language]['Entity.portrait.history.history.labelListButton']}
                tooltip={messages[this.props.language]['Entity.portrait.history.history.tooltip']}
                masterKey={this.props.masterKey}
                modifyMode={this.props.modifyMode}
                allData={this.props.allData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default History;

History.propTypes = {
  creationYear: PropTypes.string,
  language: PropTypes.string.isRequired,
  predecessors: PropTypes.array,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
