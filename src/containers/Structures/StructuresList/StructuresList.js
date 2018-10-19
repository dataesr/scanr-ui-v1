/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
/* Config */
import {
  PAGE,
  PER_PAGE,
} from '../../../config/config';

/* Composants internes */
import axios from '../../../axios';
import Aux from '../../../hoc/Aux';
import Button from '../../../UI/Button/Button';
import StructuresListItems from './StructuresListItems/StructuresListItems';
import StructuresGridItems from './StructuresGridItems/StructuresGridItems';


class StructuresList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      structures: [],
      pagination:
      {
        n_page: PAGE,
        n_hits: 0,
      },
      displayStyle: 'grid',
      noResultFound: false,
    };
    this.search = debounce(this.axiosCall, 1000);
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
      this.search(p, true);
    }
  }// /componentDidUpdate()

  nextContentButtonHandler = () => {
    const params = {
      init: false,
      pagination: true,
    };
    this.axiosCall(params);
  }

  selectDisplayStyle = (newDisplayStyle) => {
    this.setState({ displayStyle: newDisplayStyle });
  }

  axiosCall(params, search) {
    let page;
    if (params.pagination) {
      page = this.state.pagination.n_page + 1;
    } else {
      page = PAGE;
    }

    const url = `structures/?query=${this.props.searchText}&page=${page}&per_page=${PER_PAGE}`;
    axios.get(url)
      .then(
        (response) => {
          this.setState((prevState) => {
            let newStructures = response.data.data;
            if (!search) {
              newStructures = [...prevState.structures];
              Array.prototype.push.apply(newStructures, response.data.data);
            }
            const newPagination = { ...prevState.pagination };
            newPagination.n_hits = response.data.meta.total;
            if (params.pagination) {
              newPagination.n_page += 1;
            } else {
              newPagination.n_page = 1;
            }
            return {
              structures: newStructures,
              pagination: newPagination,
            };
          });
          this.props.nStructures(response.data.meta.total);
        },
      )
      .catch(() => this.setState({ noResultFound: true, structures: null }));
  }


  render() {
    let content = <div>Pas de structure !</div>;
    if (this.state.noResultFound) {
      content = (
        <div>
          Aucun résultat ne correspond à votre recherche. Vérifiez que vous avez bien entré un mot complet
        </div>);
    }
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
