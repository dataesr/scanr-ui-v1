/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';

/* Config */
/* Pagination */
import { PAGINATION_FROM, PAGINATION_STEP } from '../../config/config';
/* API */
import { API_END_POINT, API_BOUCHON, API_DATA } from '../../config/config';

/* Composants internes */
import Aux from '../../hoc/Aux';
import Structure from './Structure/Structure';
import StructureList from './StructureList/StructureList';
// import PaginationStructures from './PaginationStructures/PaginationStructures';

/* CSS */
// import classes from './Structures.css';



class Structures extends Component {
  state = {
    structureSelected: null,
    structures: [],
    pagination:
    {
      n_page: PAGINATION_FROM,
      n_hits: 0,
    },
  }

  render() {
    let content = 'Pas de structure !';
    let bt_nextContent = null;

    if (this.state.structureSelected) {
      content = (
        <Structure
          structure={this.state.structureSelected}
          returnButton={this.returnButtonHandler}
        />
      );
    } else if (this.state.structures) {
      content = (
        <StructureList
          structuresList={this.state.structures}
          structureSelected={this.structureSelectedHandler}
        />
      );

      const n_pages_max = Math.ceil(this.state.pagination.n_hits / PAGINATION_STEP);
      if (this.state.pagination.n_page < n_pages_max) {
        bt_nextContent = (
          <a
            onClick={() => this.nextContentButtonHandler()}
            className="button is-dark is-medium is-fullwidth is-rounded"
          >
            Charger la suite
          </a>
        );
      }
    }

    return (
      <Aux>
        {content}
        <div className="container">
          <div className="column is-half is-offset-one-quarter">
            {bt_nextContent}
          </div>
        </div>
      </Aux>
    );
  }// /render()


  nextContentButtonHandler() {
    const p = {
      init: false,
      pagination: true,
    };
    this.axiosCall(p);
  }


  returnButtonHandler = () => {
    // Suppression de la stucture sélectionnée du state
    const newState = { ...this.state };
    newState.structureSelected = null;

    this.setState(newState);
  }



  structureSelectedHandler = (obj) => {
    // Sauvegarde de la structure sélectionnée par click dans la liste
    const newState = { ...this.state };
    newState.structureSelected = obj.structure;

    this.setState(newState);
  }


  axiosCall(p) {
    // Appel de l'API
    let from; let to;
    if (p.pagination) {
      from = this.state.pagination.n_page * PAGINATION_STEP;
      to = (this.state.pagination.n_page + 1) * PAGINATION_STEP;
    } else {
      from = PAGINATION_FROM;
      to = PAGINATION_STEP;
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
      // url: `${API_END_POINT}structures?query=${this.props.searchText}&from=${from}&to=${to}`,
      axios(
        {
          method: 'get',
          url: `${API_END_POINT}structures/?query=${this.props.searchText}`,
          responseType: 'json',
        },
      ).then(

        (response) => {
          const newState = { ...this.state };
          if (p.init) {
            newState.structures = response.data.data;
          } else {
            Array.prototype.push.apply(newState.structures, response.data.data);
          }

          newState.pagination.n_hits = response.data.n_hits;
          if (p.pagination) {
            newState.pagination.n_page++;
          } else {
            newState.pagination.n_page = 1;
          }
          newState.structureSelected = null;

          this.setState(newState);

          // MAJ du header
          this.props.nStructures(response.data.n_hits);
        },
      );// /then
    }
  }// /axiosCall()


  componentDidMount() {
    // Récupération des structures initiales (API)
    const p = {
      init: true,
      pagination: false,
    };
    this.axiosCall(p);
  }// /componentDidMount()


  componentDidUpdate(prevProps, prevState) {
    // Récupération des structures sur MAJ searchBar (API)
    if (this.props.searchText !== prevProps.searchText) {
      const p = {
        init: true,
        pagination: false,
      };
      this.axiosCall(p);
    }
  }// /componentDidUpdate()
}


export default Structures;
