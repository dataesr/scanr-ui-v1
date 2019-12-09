import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { API_PERSONS_SEARCH_END_POINT } from '../../../config/config';
import PersonCard from './PersonYoutubeCard';
import transformRequest from '../../../Utils/transformRequest';
import classes from './GraphCard.scss';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

export default class YoutubeList extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.getData();
  }

  shuffleArray = (array) => {
    const ans = array.slice();
    /* eslint-disable-next-line */
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = ans[i];
      ans[i] = ans[j];
      ans[j] = temp;
    }
    return ans;
  }

  getData = () => {
    const request = { ...this.props.request };
    /* eslint-disable-next-line */
    Axios.post(API_PERSONS_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        let data = [];
        for (let i = 0; i < response.data.results.length; i += 1) {
          const links = response.data.results[i].value.links.filter(item => item.type.toLowerCase() === 'youtube').map(item => (item.url));
          const element = { url: links[0], data: response.data.results[i] };
          data = data.concat(element);
        }
        data = this.shuffleArray(data);
        this.setState({ data });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      <div className="container">
        <ul className={`row ${classes.Ul}`}>
          {
            this.state.data.map(item => (
              /* eslint-disable-next-line */
              <div className={`col-md-6 ${classes.Li}`}>
                <PersonCard
                  data={item.data.value}
                  url={item.url}
                  language={this.props.language}
                />
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

YoutubeList.propTypes = {
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
};
