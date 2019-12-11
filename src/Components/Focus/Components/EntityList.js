import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { API_STRUCTURES_SEARCH_END_POINT } from '../../../config/config';
import EntityCard from '../../Search/SearchResults/ResultCards/EntityCard';
import transformRequest from '../../../Utils/transformRequest';
import classes from './GraphCard.scss';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

export default class EntityList extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    /* eslint-disable-next-line */
    Axios.post(API_STRUCTURES_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        this.setState({ data: response.data.results });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        lexicon={this.props.lexicon}
        title={this.props.title}
        language={this.props.language}
        subtitle={this.props.subtitle}
      />
      <div className="container">
        <ul className={`row ${classes.Ul}`}>
          {
            this.state.data.map((item, i) => (
              /* eslint-disable-next-line */
              <li key={`${item.value}_${i}`} className={`col-md-4 ${classes.Li}`}>
                <EntityCard
                  data={item.value}
                  small
                  language={this.props.language}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

EntityList.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
};
