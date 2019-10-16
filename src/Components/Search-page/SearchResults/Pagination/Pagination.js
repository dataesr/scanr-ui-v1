import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Pagination.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: this.props.currentPage || 1,
    };
  }


  ShouldDisabled = (position) => {
    if (position === 'previous' && this.state.nextPage < 2) {
      return classes.NoDisplay;
    }
    if (position === 'next' && this.state.nextPage >= this.state.lastIndex) {
      return classes.NoDisplay;
    }
    return '';
  }

  HandlePageInputChange = (e) => {
    this.setState({ nextPage: e.target.value });
  }

  render() {
    const currentPage = this.props.currentPage || 1;
    const lastIndex = Math.ceil(this.props.totalDocuments / (this.props.currentPageSize || 20)) || 1;
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section className={`row mb-3 p-3 d-flex flex-row justify-content-around ${classes.Section}`}>
          <div
            className={`row d-flex justify-content-center align-items-center m-1 pl-2 pr-2 ${this.ShouldDisabled('previous')} ${classes.Buttons}`}
            onClick={() => this.props.paginationHandler(currentPage - 1)}
            onKeyPress={() => this.props.paginationHandler(currentPage - 1)}
            role="button"
            tabIndex={0}
          >
            <i aria-label="previous page" className="fas fa-chevron-left mr-3" />
            <FormattedHTMLMessage id="pagination.previous" defaultMessage="pagination.previous" />
          </div>
          <form className="mr-3 ml-3 d-flex align-items-center" onSubmit={() => this.props.paginationHandler(this.state.nextPage)}>
            <input
              className={`mr-1 ${classes.PageInput}`}
              value={this.state.nextPage}
              onChange={e => this.HandlePageInputChange(e)}
            />
            <div className={`mr-1 ${classes.MaxPage}`}>
              /
            </div>
            <div className={classes.MaxPage}>
              {lastIndex}
            </div>
          </form>
          <div
            className={`row d-flex justify-content-center align-items-center m-1 pl-2 pr-2 ${this.ShouldDisabled('next')} ${classes.Buttons}`}
            onClick={() => this.props.paginationHandler(currentPage + 1)}
            onKeyPress={() => this.props.paginationHandler(currentPage + 1)}
            role="button"
            tabIndex={0}
          >
            <FormattedHTMLMessage id="pagination.next" defaultMessage="pagination.next" />
            <i aria-hidden="true" className="fas fa-chevron-right ml-3" />
          </div>
        </section>
      </IntlProvider>
    );
  }
}

export default Pagination;

Pagination.propTypes = {
  language: PropTypes.string.isRequired,
  currentPage: PropTypes.number,
  currentPageSize: PropTypes.number,
  totalDocuments: PropTypes.number,
  paginationHandler: PropTypes.func,
};
