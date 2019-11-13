import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

/* Gestion des langues */
import messagesPanelFr from './translations/panel/fr.json';
import messagesPanelEn from './translations/panel/en.json';

/* Chargement du lexique */
import glossaryTerms from './translations/terms/glossary.json';

/* SCSS */
import classes from './LexiconModal.scss';

class LexiconModal extends Component {
  state = {
    show: false,
    filter: null,
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps.show !== this.props.show) {
  //     this.setState({ show: this.props.show });
  //   }
  // }

  shouldComponentUpdate() {
    if (this.state.show) {
      return true;
    }
    if (this.props.show) {
      this.setState({ show: true });
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.target !== this.state.target) {
      if (this.props.target) {
        this.setState({ target: this.props.target, show: true });
      } else {
        this.setState({ target: null, show: true });
      }
    }
    if (this.state.show) {
      const panelHeight = document.getElementById('modal').offsetHeight;
      const targetTop = (this.props.target) ? document.getElementById(this.props.target).offsetTop : 0;
      document.getElementById('terms').scrollTop = (panelHeight - targetTop);
    }
  }

  handleCloseModal = () => {
    this.setState({ show: false });
  }

  handleSearchedTerm = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const messagesPanel = {
      fr: messagesPanelFr,
      en: messagesPanelEn,
    };

    let filteredGlossaryTerms = glossaryTerms;
    if (this.state.filter) {
      filteredGlossaryTerms = glossaryTerms.filter(el => (el.label[this.props.language].toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1));
    }

    return (
      <IntlProvider locale={this.props.language} messages={messagesPanel[this.props.language]}>
        <Modal
          show={this.state.show}
          onHide={this.handleCloseModal}
          className={classes.LexiconModal}
          size="lg"
          id="modal"
        >
          <Modal.Header closeButton className={classes.Header}>
          </Modal.Header>

          <Modal.Body className={classes.Content}>
            <p className={classes.Title}>
              <FormattedHTMLMessage id="lexicon" />
            </p>
            <p className={classes.SearchTermLabel}>
              <FormattedHTMLMessage id="searcheTerm" />
            </p>
            <input
              type="text"
              id="searchedTerm"
              className="form-control"
              onChange={event => this.handleSearchedTerm(event)}
            />
            <ul id="terms" className={classes.Terms}>
              {
                filteredGlossaryTerms.map(term => (
                  <li key={term.key} id={term.key} className={classes.Li}>
                    <p>
                      <i className={term.icon} />
                      <span className={classes.Term}>
                        {term.label[this.props.language]}
                      </span>
                    </p>
                    <p className={classes.Definition}>{term.definition[this.props.language]}</p>
                  </li>
                ))
              }
            </ul>
          </Modal.Body>

        </Modal>
      </IntlProvider>
    );
  }
}

export default LexiconModal;

LexiconModal.defaultProps = {
  target: null,
  show: false,
};
LexiconModal.propTypes = {
  language: PropTypes.string.isRequired,
  show: PropTypes.bool,
  target: PropTypes.string,
};
