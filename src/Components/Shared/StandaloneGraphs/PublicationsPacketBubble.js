import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsPackedbubble from '../GraphComponents/Graphs/HighChartsPackedbubble';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

const deweydata = require('./Utils/dewey.json');

export default class PublicationsPacketBubble extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    exporting: true,
    aggregations: {
      domains: {
        field: 'domains.code',
        filters: {},
        min_doc_count: 1,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: 1000,
      },
    },
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(API_PUBLICATIONS_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        const newStateData = response.data.facets.find(item => item.id === 'domains') || { entries: [] };
        this.setState({ data: newStateData, isLoading: false });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  transformData = () => {
    const domainsCount = {};
    this.state.data.entries.forEach((e) => {
      let discipline = 'exclude';
      let subDiscipline = 'exclude';
      let subDisciplineCount = 0;
      const code = e.value;
      const label = deweydata[code] ? deweydata[code].fr : 'exclude';
      if (code.indexOf('00') !== -1) {
        discipline = label.split('(')[0];
      } else {
        subDiscipline = label.split('(')[0];
        discipline = deweydata[code.substring(0, 1).concat('00')].fr.split('(')[0];
        subDisciplineCount = e.count;
      }

      if (discipline !== 'exclude') {
        if (domainsCount[discipline] === undefined) {
          domainsCount[discipline] = { TOTALCount: 0 };
        }
        if (subDiscipline !== 'exclude') {
          if (domainsCount[discipline][subDiscipline] === undefined) {
            domainsCount[discipline][subDiscipline] = { count: subDisciplineCount };
          }
          domainsCount[discipline].TOTALCount += subDisciplineCount;
        }
      }
    });
    const data = [];
    Object.keys(domainsCount).forEach((discipline) => {
      const subdata = [];
      Object.keys(domainsCount[discipline]).forEach((subdiscipline) => {
        if (subdiscipline !== 'TOTALCount' && subdiscipline !== 'discipline') {
          const subCount = domainsCount[discipline][subdiscipline].count;
          if (subCount > 4) {
            subdata.push({ name: subdiscipline, value: subCount });
          }
        }
      });
      data.push({ name: discipline, data: subdata, total: domainsCount[discipline].TOTALCount });
    });
    return data.sort((a, b) => b.total - a.total).slice(0, 9);
  }

  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        lexicon={this.props.lexicon}
        title={this.props.title}
        language={this.props.language}
        subtitle={this.props.subtitle}
      />
      {
        (this.state.data !== [] && !this.state.isLoading)
          ? (
            <HighChartsPackedbubble
              filename={this.props.title}
              exporting={this.state.exporting}
              data={this.transformData()}
              language={this.props.language}
              tooltipText={this.props.language === 'fr' ? 'thèses soutenues en 2018' : 'thesis defended in 2018'}
            />
          )
          : (<GraphSpinner />)
      }
    </div>
  );
}

PublicationsPacketBubble.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  lexicon: PropTypes.string,
};
