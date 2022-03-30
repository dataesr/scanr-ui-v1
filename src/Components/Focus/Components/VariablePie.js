/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import Axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import classes from './GraphCard.scss';
import variablePieCss from './variablePie.scss';
import HighChartsVariablepie from '../../Shared/GraphComponents/Graphs/HighChartsVariablepie';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

// Traductions
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const msg = { fr: messagesFr, en: messagesEn };

export default class VariablePie extends Component {
  state = {
    data: null,
    nodes: [],
    currentId: 'nothing',
    exporting: true,
    isLoading: true,
    pilier: 'all',
    program: 'all',
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

  getNodes = async () => {
    /* eslint-disable-next-line */
    const nodes = await Axios.get('https://storage.gra.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/scanR/static/data/h2020/nodes_fr.json');
    this.setState(prevState => ({
      ...prevState,
      nodes: nodes.data,
      currentId: nodes.data[Math.floor(Math.random() * 19)].id,
    }));
  }

  getData = async () => {
    if (this.state.currentId !== 'nothing') {
      /* eslint-disable-next-line */
      const data = await Axios.get(`https://storage.gra.cloud.ovh.net/v1/AUTH_32c5d10cb0fe4519b957064a111717e3/scanR/static/data/h2020/${this.state.currentId}.json`);
      console.log('MAJ getData!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      this.setState(prevState => ({ ...prevState, data: data.data, isLoading: false }));
    }
  }

  getPiliers = () => {
    if (!this.state.data) return [];

    return (Object.keys(this.state.data));
  }

  getPrograms = (pilier) => {
    if (!this.state.data || !this.state.data[pilier]) return [];

    return (Object.keys(this.state.data[pilier]));
  }

  getCountryLevelParts = (pilier, program) => {
    if (!this.state.data || !this.state.data[pilier] || !this.state.data[pilier][program]) return [];

    const newSet = new Set(this.state.data[pilier][program].map(el => (el.country_level_part)));
    return [...newSet];
  }

  onPilierChangeHandler = (pilier) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const allPrograms = Object.keys(this.state.data[pilier]);
    this.setState(prevState => ({
      ...prevState,
      pilier,
      program: allPrograms[0],
    }));
  };

  onProgramChangeHandler = (program) => {
    this.setState(prevState => ({
      ...prevState,
      program,
    }));
  }

  updateCountryLevelPartBlackList = (el) => {
    const oldCountryLevelPart = [...this.state.countryLevelPartBlackList];
    const index = oldCountryLevelPart.indexOf(el);
    if (index !== -1) {
      oldCountryLevelPart.splice(index, 1);
      this.setState(prevState => ({ ...prevState, countryLevelPartBlackList: oldCountryLevelPart }));
    } else {
      oldCountryLevelPart.push(el);
      this.setState(prevState => ({ ...prevState, countryLevelPartBlackList: oldCountryLevelPart }));
    }
  };

  renderFilters = () => {
    const pilersSelectorOptions = this.getPiliers()
      .map((el) => {
        if (el === 'all') {
          return (
            <option key={el} value={el}>
              {msg[this.props.language]['Focus.piliers.all']}
            </option>
          );
        }
        return <option key={el} value={el}>{el}</option>;
      });

    const programsSelectorOptions = this.getPrograms(this.state.pilier)
      .map((el) => {
        if (el === 'all') {
          return (
            <option key={el} value={el}>
              {msg[this.props.language]['Focus.programs.all']}
            </option>
          );
        }
        return <option key={el} value={el}>{el}</option>;
      });

    const firstProgram = (this.state.data) ? Object.keys(this.state.data[this.state.pilier])[0] : [];

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
        <p className="pt-3">
          <FormattedHTMLMessage id="Focus.piliers.title" />
        </p>
        <select
          className="form-control"
          onChange={e => this.onPilierChangeHandler(e.target.value)}
        >
          {pilersSelectorOptions}
        </select>

        <p className="mt-3">
          <FormattedHTMLMessage id="Focus.programs.title" />
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
    const uniqueProjects = [];
    if (this.state.data && this.state.currentId && !this.state.isLoading) {
      // const program = (this.state.program) ? this.state.program : Object.keys(this.state.data[this.state.pilier])[0];
      // const program = (this.state.program) ? this.state.program : 'all';

      console.log(this.state.data);

      filteredData = this.state.data[this.state.pilier][this.state.program].sort((a, b) => a.y > b.y).slice(0, 2);

      // filtre sur country_level_part
      // filteredData = filteredData.filter(el => !this.state.countryLevelPartBlackList.includes(el.country_level_part));

      // filteredData.forEach((el) => {
      //   el.projects.forEach((idProject) => {
      //     if (uniqueProjects.indexOf(idProject) === -1) {
      //       uniqueProjects.push(idProject);
      //     }
      //   });
      // });
    }

    return (
      <div>
        <Row>
          <Col className={variablePieCss.info}>
            <p>
              Au premier chargement scanR vous propose de visualier aléatoirement le réseau de coopération via
              {' '}
              <span title="Horizon 2020">H2020</span>
              {' '}
              des 20 plus importants acteurs, publics ou privés français de ce programme.
            </p>
            <p>
              Utilisez le menu déroulant ci-dessous pour visualiser le réseau de collaboration au sein d&lsquo;H2020 de l&lsquo;ensemble des acteurs français actifs dans ce programme.
            </p>
            <select
              className="form-control mb-2"
              onChange={e => this.setState(prevState => ({ ...prevState, currentId: e.target.value, data: null }))}
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

        <Row className={classes.graphCard}>
          <Col md={3} className={variablePieCss.filters}>
            {this.renderFilters()}
          </Col>
          <Col>
            {
              (filteredData.length > 0) ? (
                <>
                  <GraphTitles
                    lexicon={this.props.lexicon}
                    language={this.props.language}
                    title={`${this.props.subtitle}${this.state.nodes.filter(el => el.id === this.state.currentId)[0].full_name} - ${uniqueProjects.length} projets collaboratifs`}
                    subtitle={this.props.title}
                  />
                  <HighChartsVariablepie
                    data={filteredData}
                    exporting={this.state.exporting}
                    filename={this.state.nodes.filter(el => el.id === this.state.currentId)[0].full_name || ''}
                    language={this.props.language}
                    tooltipText={this.props.language === 'fr' ? this.props.tooltipFr : this.props.tooltipEn}
                  />
                </>
              ) : <div>no data</div>
            }
          </Col>
        </Row>

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
