import React, { Component } from 'react';
import {
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';
import classes from './GraphCard.scss';
import HighChartsVariablepie from '../../Shared/GraphComponents/Graphs/HighChartsVariablepie';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

export default class VariablePie extends Component {
  state = {
    data: [],
    nodes: [],
    currentId: 'nothing',
    exporting: true,
    isLoading: true,
  }

  componentDidMount() {
    this.getNodes();
    // this.getData();
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
    /* eslint-disable-next-line */
    const data = require(`../../Focus/Data/h2020/${this.state.currentId}.json`);
    this.setState({ data, isLoading: false });
  }

  render = () => (
    <div>
      <Row className={classes.arrowRight}>
        <select
          className="form-control mx-3 mb-2"
          onChange={e => this.setState({ currentId: e.target.value, data: [] })}
        >
          {
            (this.state.currentId === 'nothing')
              ? <option value="nothing" selected>Sélectionner une entité française pour voir ses principaux partenaires</option>
              : <option value="nothing">Sélectionner une entité française pour voir ses principaux partenaires</option>
          }

          {
            this.state.nodes.map((el) => {
              let ret = <option value={el.id}>{el.name}</option>;
              if (el.id === this.state.currentId) {
                ret = <option value={el.id} selected>{el.name}</option>;
              }
              return ret;
            })
          }
        </select>
      </Row>
      {
          (this.state.data !== [] && !this.state.isLoading && this.state.nodes !== [] && this.state.currentId)
            ? (
              <div className={`w-100 ${classes.graphCard}`}>
                <GraphTitles
                  lexicon={this.props.lexicon}
                  language={this.props.language}
                  title={this.props.title.concat(' ', this.state.nodes.filter(el => el.id === this.state.currentId)[0].full_name, ' ', this.state.nodes.filter(el => el.id === this.state.currentId)[0].nb_projects, ' projets')}
                  subtitle={this.props.subtitle}
                />
                <HighChartsVariablepie
                  filename={this.state.nodes.filter(el => el.id === this.state.currentId)[0].full_name || ''}
                  data={this.state.data.slice(0, 20)}
                  exporting={this.state.exporting}
                  language={this.props.language}
                  tooltipText={this.props.language === 'fr' ? this.props.tooltipFr : this.props.tooltipEn}
                />
              </div>
            )
            : (<GraphSpinner />)
        }
    </div>
  )
}

VariablePie.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  tooltipEn: PropTypes.string.isRequired,
  tooltipFr: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
};
