import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsPackedbubble from '../../Shared/GraphComponents/Graphs/HighChartsPackedbubble';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

const deweydata = require('./Utils/dewey.json');

export default class PublicationsPacketBubble extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
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
    const url = 'https://scanr-preprod.sword-group.com/api/v2/publications/search';
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(url, transformRequest(request))
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
    // const tooltipText = 'thèses soutenues en 2018';
  }

  render() {
    const scanRcolor = '#3778bb';
    if (this.state.data !== [] && !this.state.isLoading) {
      return (
        <div className={`w-100 ${classes.graphCard}`}>
          <GraphTitles
            title={this.props.title}
            subtitle={this.props.subtitle}
          />
          <HighChartsPackedbubble
            filename="Mot-clé des publications"
            data={this.transformData()}
            language={this.props.language}
            tooltipText={this.props.language === 'fr' ? 'thèses' : 'thesis'}
          />
        </div>
      );
    }
    return (
      <div className={`w-100 ${classes.graphCard}`}>
        <GraphTitles
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
        <div className="row justify-content-center p-4">
          <GridLoader
            color={scanRcolor}
            loading={this.state.isLoading}
          />
        </div>
      </div>
    );
  }
}

PublicationsPacketBubble.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
