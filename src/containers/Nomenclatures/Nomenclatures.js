import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../axios';

import NomenclatureField from '../Fields/NomenclatureField/NomenclatureField';
import Menu from '../Menu/Menu';

import classes from './Nomenclatures.scss';

class Nomenclatures extends Component {
  state = {
    data: [],
    links: {},
    sort: {
      field: this.props.defaulSortfield,
      direction: 1,
    },
    total: 0,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort.field !== this.state.sort.field
      || prevState.sort.direction !== this.state.sort.direction
      || prevProps.schemaName !== this.props.schemaName) {
      if (prevProps.schemaName !== this.props.schemaName) {
        // MAJ du state car en retard sur les props
        this.setState({
          sort: {
            field: this.props.defaulSortfield,
            direction: 1,
          },
        });
      }

      this.getData();
    }
  }

  changeDirection = (field) => {
    this.setState(prevState => ({
      sort: {
        field,
        direction: prevState.sort.field === field ? prevState.sort.direction * (-1) : 1,
      },
    }));
  }

  getData = (
    pagination = null,
  ) => {
    let url = `${this.props.schemaName}?sort=[("${this.state.sort.field}",${this.state.sort.direction})]`;

    if (pagination) {
      if (this.state.links[pagination]) {
        url = this.state.links[pagination].href;
      }
    }

    axios.get(url)
      .then((response) => {
        this.setState({
          data: response.data.data,
          links: response.data.links,
          total: response.data.meta.total,
        });
      });
  }

  render() {
    if (this.state.data.length > 0) {
      return (
        <div className={classes.Layout}>
          <div className={classes.Menu}>
            <Menu />
          </div>
          <div id="content" className={classes.Content}>
            <div className={classes.Bg} />
            <NomenclatureField
              changeDirection={this.changeDirection}
              data={this.state.data}
              description={this.props.description}
              refreshFunction={this.getData}
              infoMessage={this.props.infoMessage}
              label={this.props.labelAdd}
              schemaName={this.props.schemaName}
              url={this.props.urlAPI}
              title={this.props.title}
              total={this.state.total}
              sortField={this.state.sort.field}
              sortDirection={this.state.sort.direction}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={classes.NoResult}>
        Pas de panel ERC
      </div>
    );
  }
}

export default Nomenclatures;

Nomenclatures.propTypes = {
  description: PropTypes.string.isRequired,
  defaulSortfield: PropTypes.string.isRequired,
  infoMessage: PropTypes.string.isRequired,
  labelAdd: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  urlAPI: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
