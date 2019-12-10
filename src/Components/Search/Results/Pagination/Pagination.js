import React, { Component } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './Pagination.scss';


class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: this.props.currentPage || 1,
    };
  }


  shouldHideButton = (position, lastIndex) => {
    if (position === 'previous' && this.state.nextPage < 2) {
      return classes.NoDisplay;
    }
    if (position === 'next' && this.state.nextPage >= lastIndex) {
      return classes.NoDisplay;
    }
    return '';
  }

  handlePageInputChange = (e) => {
    this.setState({ nextPage: e.target.value });
  }

  render() {
    const currentPage = this.props.currentPage || 1;
    const lastIndex = Math.ceil(this.props.totalDocuments / (this.props.currentPageSize || 20)) || 1;
    return (
      <section className={`row mb-3 p-3 d-flex flex-row justify-content-around ${classes.Section}`}>
        <div
          className={`row d-flex justify-content-center align-items-center m-1 pl-2 pr-2 ${this.shouldHideButton('previous', lastIndex)} ${classes.Buttons}`}
          onClick={() => this.props.handlePagination(currentPage - 1)}
          onKeyPress={() => this.props.handlePagination(currentPage - 1)}
          role="button"
          tabIndex={0}
        >
          <i aria-label="previous page" className="fas fa-chevron-left mr-3" />
          <FormattedHTMLMessage id="Search.Results.Pagination.previous" />
        </div>
        <form className="mr-3 ml-3 d-flex align-items-center" onSubmit={() => this.props.handlePagination(this.state.nextPage)}>
          <input
            className={`mr-1 ${classes.PageInput}`}
            value={this.state.nextPage}
            onChange={e => this.handlePageInputChange(e)}
          />
          <div className={`mr-1 ${classes.MaxPage}`}>
            /
          </div>
          <div className={classes.MaxPage}>
            {lastIndex}
          </div>
        </form>
        <div
          className={`row d-flex justify-content-center align-items-center m-1 pl-2 pr-2 ${this.shouldHideButton('next', lastIndex)} ${classes.Buttons}`}
          onClick={() => this.props.handlePagination(currentPage + 1)}
          onKeyPress={() => this.props.handlePagination(currentPage + 1)}
          role="button"
          tabIndex={0}
        >
          <FormattedHTMLMessage id="Search.Results.Pagination.next" />
          <i aria-hidden="true" className="fas fa-chevron-right ml-3" />
        </div>
      </section>
    );
  }
}

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  totalDocuments: PropTypes.number,
  handlePagination: PropTypes.func,
};
