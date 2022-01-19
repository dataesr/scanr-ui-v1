/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';
import classes from './GraphCard.scss';
import variablePieCss from './variablePie.scss';
import HighChartsVariablepie from '../../Shared/GraphComponents/Graphs/HighChartsVariablepie';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

export default class VariablePie extends Component {
  state = {
    data: null,
    nodes: [],
    currentId: 'nothing',
    exporting: true,
    isLoading: true,
    pilier: 'all',
    program: null,
    countryLevelPartBlackList: [],
  }

  componentDidMount() {
    this.getNodes();
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentId !== prevState.currentId) {
      this.getData();
    }
  }

  getNodes = () => {
    /* eslint-disable-next-line */
    const nodes = require('../../Focus/Data/h2020/nodes_fr.json');
    this.setState({ nodes });
  }

  getData = () => {
    if (this.state.currentId !== 'nothing') {
      /* eslint-disable-next-line */
      const data = require(`../../Focus/Data/h2020/${this.state.currentId}.json`);
      this.setState({ data, isLoading: false });
    }
  }

  getPiliers = () => (
    Object.keys(this.state.data)
  );

  getPrograms = pilier => (
    Object.keys(this.state.data[pilier])
  );

  getCountryLevelParts = (pilier, program) => {
    const newSet = new Set(this.state.data[pilier][program].map(el => (el.country_level_part)));
    return [...newSet];
  }

  onPilierChangeHandler = (pilier) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const allPrograms = Object.keys(this.state.data[pilier]);
    this.setState({
      pilier,
      program: allPrograms[0],
    });
  };

  onProgramChangeHandler = (program) => {
    this.setState({
      program,
    });
  }

  updateCountryLevelPartBlackList = (el) => {
    const oldCountryLevelPart = [...this.state.countryLevelPartBlackList];
    const index = oldCountryLevelPart.indexOf(el);
    if (index !== -1) {
      oldCountryLevelPart.splice(index, 1);
      this.setState({ countryLevelPartBlackList: oldCountryLevelPart });
    } else {
      oldCountryLevelPart.push(el);
      this.setState({ countryLevelPartBlackList: oldCountryLevelPart });
    }
  };

  renderFilters = () => {
    const pilersSelectorOptions = this.getPiliers()
      .map(el => <option key={el} value={el}>{el}</option>);

    const programsSelectorOptions = this.getPrograms(this.state.pilier)
      .map(el => <option key={el} value={el}>{el}</option>);

    const firstProgram = Object.keys(this.state.data[this.state.pilier])[0];

    const countryLevelPartCheckbox = this.getCountryLevelParts(this.state.pilier, (!this.state.program) ? firstProgram : this.state.program)
      .map(el => (
        <div key={el}>
          <input
            type="checkbox"
            value={el}
            id={el}
            name={el}
            checked={!this.state.countryLevelPartBlackList.includes(el)}
            onChange={e => this.updateCountryLevelPartBlackList(e.target.value)}
          />
          <label htmlFor={el} className="ml-2">{el}</label>
        </div>
      ));

    return (
      <>
        <p>
          Piliers
        </p>
        <select
          className="form-control"
          onChange={e => this.onPilierChangeHandler(e.target.value)}
        >
          {pilersSelectorOptions}
        </select>

        <p className="mt-3">
          Programmes
        </p>
        <select
          className="form-control"
          onChange={e => this.onProgramChangeHandler(e.target.value)}
        >
          {programsSelectorOptions}
        </select>

        <p className="mt-3">
          {countryLevelPartCheckbox}
        </p>
      </>
    );
  }

  render = () => {
    let filteredData = [];
    if (this.state.data && this.state.currentId && !this.state.isLoading) {
      const program = (this.state.program) ? this.state.program : Object.keys(this.state.data[this.state.pilier])[0];
      filteredData = this.state.data[this.state.pilier][program];

      // filtre sur country_level_part
      filteredData = filteredData.filter(el => !this.state.countryLevelPartBlackList.includes(el.country_level_part)).slice(0, 20);
    }

    return (
      <div>
        <Row className={classes.arrowRight}>
          <Col>
            <select
              className="form-control mb-2"
              onChange={e => this.setState({ currentId: e.target.value })}
            >
              {
                (this.state.currentId === 'nothing')
                  ? <option value="nothing" selected>Sélectionner une entité française pour voir ses principaux partenaires</option>
                  : <option value="nothing">Sélectionner une entité française pour voir ses principaux partenaires</option>
              }

              {
                this.state.nodes.map((el) => {
                  let ret = <option key={el.id} value={el.id}>{el.full_name}</option>;
                  if (el.id === this.state.currentId) {
                    ret = <option key={el.id} value={el.id} selected>{el.full_name}</option>;
                  }
                  return ret;
                })
              }
            </select>
          </Col>
        </Row>
        {

// this.state.nodes.filter(el => el.id === this.state.currentId)[0].nb_projects
        (filteredData.length > 0) ? (
          <Row className={classes.graphCard}>
            <Col md={3} className={variablePieCss.filters}>
              {this.renderFilters()}
            </Col>
            <Col>
              <GraphTitles
                lexicon={this.props.lexicon}
                language={this.props.language}
                title={this.props.subtitle.concat('', this.state.nodes.filter(el => el.id === this.state.currentId)[0].full_name)}
                subtitle={this.props.title}
              />
              <HighChartsVariablepie
                filename={this.state.nodes.filter(el => el.id === this.state.currentId)[0].full_name || ''}
                data={filteredData}
                exporting={this.state.exporting}
                language={this.props.language}
                tooltipText={this.props.language === 'fr' ? this.props.tooltipFr : this.props.tooltipEn}
              />
            </Col>
          </Row>
        ) : null
        }
      </div>
    );
  }
}

VariablePie.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  tooltipEn: PropTypes.string.isRequired,
  tooltipFr: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
};
