import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { API_PERSONS_SEARCH_END_POINT } from '../../../../../../config/config';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';
import NbPersonsCard from './nbPersonsCard';
import GenderGraphCard from './genderGraphCard';
import PersonCard from '../../../../../Search/SearchResults/ResultCards/PersonCard';

import classes from '../Team.scss';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

/**
 * TeamComposition
 * Url : ex: /entite/200711886U
 * Description : Contient le nombre de personnes + graph par genre
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

class TeamComposition extends Component {
  state = {
    nbPersons: 0,
    nbMales: 0,
    nbFemales: 0,
    nbUnknown: 0,
  };

  componentDidMount() {
    this.getData();
  }

  getCountFromKey = (entries, searchedKey, searchedKeyValue, returnKey) => {
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i][searchedKey] === searchedKeyValue) {
        return entries[i][returnKey];
      }
    }
    return 0;
  }

  getData = () => {
    // Récupération des données par api search
    const url = API_PERSONS_SEARCH_END_POINT;
    const data = {
      pageSize: 0,
      filters: {
        'affiliations.structure.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: [this.props.id],
        },
      },
      aggregations: {
        gender: {
          field: 'gender',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 10000,
        },
      },
    };
    Axios.post(url, data).then((response) => {
      let nbMales = 0;
      let nbFemales = 0;
      if (response.data.facets && response.data.facets[0] && response.data.facets[0].id === 'gender') {
        nbMales = this.getCountFromKey(response.data.facets[0].entries, 'value', 'M', 'count');
        nbFemales = this.getCountFromKey(response.data.facets[0].entries, 'value', 'F', 'count');
      }
      const nbUnknown = response.data.total - nbMales - nbFemales;
      this.setState({
        nbPersons: response.data.total,
        nbMales,
        nbFemales,
        nbUnknown,
      });
    });
  }

  render() {
    const teamModalData = (
      <ul className={`${classes.noListStyle} d-flex flex-column justify-content-between align-content-stretch p-0 m-0`}>
        {
          this.props.persons.map(person => (
            <li key={person.id} className={`${classes.OneFourth} ${classes.noListStyle}`}>
              <PersonCard
                language={this.props.language}
                data={person.person}
                small
                onlyExisting
              />
            </li>
          ))
        }
      </ul>
    );

    let styleCss = null;
    if (this.props.persons.length === 0) {
      styleCss = {
        display: 'none',
      };
    }

    return (
      <div className="col-md-6" style={styleCss}>
        <div className={classes.TeamComposition}>
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={messages[this.props.language]['Entity.team.teamComposition.title']} />
            </div>
          </div>
          <div className="row">
            <div className={`col-md-7 ${classes.NoSpace}`}>
              {
                (this.state.nbMales > 0 || this.state.nbFemales > 0 || this.state.nbFemales > 0) ? (
                  <GenderGraphCard
                    language={this.props.language}
                    nbMales={this.state.nbMales}
                    nbFemales={this.state.nbFemales}
                    nbUnknown={this.state.nbUnknown}
                  />
                ) : null
              }
            </div>
            <div className={`col-md-5 ${classes.NoSpace}`}>
              <NbPersonsCard
                language={this.props.language}
                nbPersons={this.state.nbPersons}
                personsModalList={teamModalData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamComposition;
TeamComposition.defaultProps = {
  persons: [],
};
TeamComposition.propTypes = {
  language: PropTypes.string.isRequired,
  persons: PropTypes.array,
  id: PropTypes.string,
  // masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  // modifyMode: PropTypes.bool,
  // allData: PropTypes.object.isRequired,
};
