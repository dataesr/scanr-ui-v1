/* Composants externes */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
/* Config */
import { PER_PAGE } from '../../../config/config';

/* Composants internes */
import Button from '../../../UI/Button/Button';
import SearchListItems from './SearchListItems/SearchListItems';

import classes from '../Search.scss';

class SearchResults extends Component {
  state = {
    displayStyle: 'grid',
  };

  selectDisplayStyle = (newDisplayStyle) => {
    this.setState({ displayStyle: newDisplayStyle });
  }

  render() {
    let content = (
      <div className={classes.NoResult}>
        {`Pas de ${this.props.label} !`}
      </div>);
    if (this.props.noResultFound) {
      content = (
        <div className={classes.NoResult}>
          Aucun résultat ne correspond à votre recherche. Vérifiez que vous avez bien entré un mot complet
        </div>);
    }
    let btNextContent = null;
    if (this.props.searchResults && this.props.searchResults.length > 0) {
      switch (this.state.displayStyle) {
        case 'list':
          content = <SearchListItems {...this.props} data={this.props.searchResults} />;
          break;
        case 'grid':
          content = React.cloneElement(this.props.gridComponent, {
            ...this.props,
            data: this.props.searchResults,
          });
          break;
        default:
          content = <SearchListItems {...this.props} data={this.props.searchResults} />;
      }

      const nPagesMax = Math.ceil(this.props.pagination.n_hits / PER_PAGE);
      if (this.props.pagination.n_page < nPagesMax) {
        btNextContent = (
          <button
            type="button"
            onClick={this.props.nextContentButtonHandler}
            className="button is-dark is-medium is-fullwidth is-rounded"
          >
            Charger la suite
          </button>
        );
      }
    }

    return (
      <Fragment>
        <div className={classes.Bg}>
          <Button onClick={() => this.selectDisplayStyle('grid')}>
            <i className="fas fa-th" />
          </Button>
          <Button onClick={() => this.selectDisplayStyle('list')}>
            <i className="fas fa-bars" />
          </Button>
        </div>
        {content}
        <div className="container">
          <div className="column is-half is-offset-one-quarter">
            {btNextContent}
          </div>
        </div>
      </Fragment>
    );
  }
}


export default SearchResults;

SearchResults.propTypes = {
  entity: PropTypes.string.isRequired,
  gridComponent: PropTypes.any,
  label: PropTypes.string.isRequired,
  nextContentButtonHandler: PropTypes.func.isRequired,
  noResultFound: PropTypes.bool.isRequired,
  pagination: PropTypes.object,
  searchResults: PropTypes.array,
};
