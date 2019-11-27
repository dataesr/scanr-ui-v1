import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import classes from './GraphCard.scss';
import HighChartsPackedbubble from '../GraphComponents/Graphs/HighChartsPackedbubble';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

export default class OpendataPackedBubble extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    /* eslint-disable-next-line */
    const opendata = require('../../Focus/Data/'.concat(`${this.props.opendata}`));
    const disciplines = {};
    const data = [];
    opendata.records.forEach((e) => {
      const mainDiscipline = e.fields.arborescence_disciplinaire.split('>')[0];
      if (disciplines[mainDiscipline] === undefined) {
        disciplines[mainDiscipline] = {};
      }
      const subDiscipline = e.fields.arborescence_disciplinaire.split('>')[2];
      if (disciplines[mainDiscipline][subDiscipline] === undefined) {
        disciplines[mainDiscipline][subDiscipline] = { count: 0 };
      }
      disciplines[mainDiscipline][subDiscipline].count += 1;
    });
    Object.keys(disciplines).forEach((discipline) => {
      const subdata = [];
      Object.keys(disciplines[discipline]).forEach((subdiscipline) => {
        const subCount = disciplines[discipline][subdiscipline].count;
        subdata.push({ name: subdiscipline, value: subCount });
      });
      data.push({ name: discipline, data: subdata });
    });
    this.setState({ data, isLoading: false });
  }


  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      {
        (this.state.data !== [] && !this.state.isLoading)
          ? (
            <HighChartsPackedbubble
              filename="Mot-clé des publications"
              data={this.state.data}
              language={this.props.language}
              tooltipText={this.props.language === 'fr' ? 'lauréat.e.s IUF' : 'laureates'}
            />
          )
          : (<GraphSpinner />)
      }
    </div>
  );
}

OpendataPackedBubble.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
