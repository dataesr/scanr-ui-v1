/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Config */
import {
  API_BOUCHON,
  API_DATA,
  PAGE,
  PER_PAGE,
} from '../../../config/config';

/* Composants internes */
import axios from '../../../axios';
import Aux from '../../../hoc/Aux';
import Button from '../../../UI/Button/Button';
import StructuresListItems from './StructuresListItems/StructuresListItems';
import StructuresGridItems from './StructuresGridItems/StructuresGridItems';


/* CSS */
// import classes from './Structures.css';

class StructuresList extends Component {
  state = {
    structures: [],
    pagination:
    {
      n_page: PAGE,
      n_hits: 0,
    },
    displayStyle: 'grid',
  }

  componentDidMount() {
    // Récupération des structures initiales (API)
    const p = {
      init: true,
      pagination: false,
    };
    this.axiosCall(p);
  }// /componentDidMount()

  componentDidUpdate(prevProps) {
    // Récupération des structures sur MAJ searchBar (API)
    if (this.props.searchText !== prevProps.searchText) {
      const p = {
        init: true,
        pagination: false,
      };
      this.axiosCall(p);
    }
  }// /componentDidUpdate()

  nextContentButtonHandler = () => {
    const p = {
      init: false,
      pagination: true,
    };
    this.axiosCall(p);
  }

  selectDisplayStyle = (newDisplayStyle) => {
    this.setState({ displayStyle: newDisplayStyle });
  }

  axiosCall(p) {
    // Appel de l'API
    let page;
    if (p.pagination) {
      page = this.state.pagination.n_page + 1;
    } else {
      page = PAGE;
    }

    if (API_BOUCHON) {
      const response = API_DATA;
      const newState = { ...this.state };
      if (p.init) {
        newState.structures = response.data;
      } else {
        Array.prototype.push.apply(newState.structures, response.data);
      }

      newState.pagination.n_hits = response.n_hits;
      if (p.pagination) {
        newState.pagination.n_page++;
      } else {
        newState.pagination.n_page = 1;
      }
      newState.structureSelected = null;

      this.setState(newState);

      // MAJ du header
      this.props.nStructures(response.n_hits);
    } else {
      const url = `structures/?query=${this.props.searchText}&page=${page}&per_page=${PER_PAGE}`;
      axios.get(url)
        .then(
          (response) => {
            const newStructures = [...this.state.structures];
            Array.prototype.push.apply(newStructures, response.data.data);

            const newPagination = { ...this.state.pagination };
            newPagination.n_hits = response.data.n_hits;
            if (p.pagination) {
              newPagination.n_page++;
            } else {
              newPagination.n_page = 1;
            }
            this.setState({
              structures: newStructures,
              pagination: newPagination,
            });

            // MAJ du header
            this.props.nStructures(response.data.n_hits);
          },
        );// /then
    }
  }// /axiosCall()


  render() {
    let content = 'Pas de structure !';
    let btNextContent = null;
    if (this.state.structures) {
      switch (this.state.displayStyle) {
        case 'list':
          content = (
            <StructuresListItems
              structuresList={this.state.structures}
            />
          );
          break;
        case 'grid':
          content = (
            <StructuresGridItems
              structuresList={this.state.structures}
            />
          );
          break;
        default:
          content = (
            <StructuresListItems
              structuresList={this.state.structures}
            />
          );
      }// /switch

      const nPagesMax = Math.ceil(this.state.pagination.n_hits / PER_PAGE);
      if (this.state.pagination.n_page < nPagesMax) {
        btNextContent = (
          <button
            type="button"
            onClick={this.nextContentButtonHandler}
            className="button is-dark is-medium is-fullwidth is-rounded"
          >
            Charger la suite
          </button>
        );
      }
    }

    return (
      <Aux>
        <Button onClick={() => this.selectDisplayStyle('grid')}>
          <i className="fas fa-th" />
        </Button>
        <Button onClick={() => this.selectDisplayStyle('list')}>
          <i className="fas fa-bars" />
        </Button>
        {content}
        <div className="container">
          <div className="column is-half is-offset-one-quarter">
            {btNextContent}
          </div>
        </div>
      </Aux>
    );
  }// /render()
}


export default StructuresList;

StructuresList.propTypes = {
  searchText: PropTypes.string.isRequired,
  nStructures: PropTypes.func.isRequired,
};
