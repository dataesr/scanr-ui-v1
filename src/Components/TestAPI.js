import React, { Component } from 'react';
import Axios from 'axios';

/**
 * testAPI
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class testAPI extends Component {
  state = {};

  getData = () => {
    /* eslint-disable-next-line */
    console.log('getData');
    const query = {
      query: 'beta',
      lang: 'fr',
    };
    const queryPublication = {
      query: 'beta',
      lang: 'default',
    };

    const apis = ['structures', 'persons', 'publications', 'projects'];
    apis.forEach((api) => {
      const url = `https://scanr-preprod.sword-group.com/api/v2/${api}/search`;
      Axios.post(url, (api === 'publications') ? queryPublication : query)
        .then((response) => {
          /* eslint-disable-next-line */
          console.log(api, '=>', response.data.total);
          /* eslint-disable-next-line */
        }).catch(e => console.log(api, 'error', e));
    });
  }

  render() {
    this.getData();
    return (
      <div>
        testAPI
      </div>
    );
  }
}

export default testAPI;
