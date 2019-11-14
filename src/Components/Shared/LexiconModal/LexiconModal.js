import React, { Component, Fragment } from 'react';
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
  state={
    showModal: false,
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  render() {
    const messagesPanel = {
      fr: messagesPanelFr,
      en: messagesPanelEn,
    };

    if (this.props.target) {
      const termObject = glossaryTerms.find(el => el.key === this.props.target);
      const term = termObject.label[this.props.language];
      const definition = termObject.definition[this.props.language];
      return (
        <IntlProvider locale={this.props.language} messages={messagesPanel[this.props.language]}>
          <Fragment>
            <Modal
              show={this.state.showModal}
              onHide={this.handleCloseModal}
              className={classes.LexiconModal}
              size="lg"
            >
              <Modal.Header closeButton className={classes.Header}>
                <p className={classes.Title}>
                  <i className="fas fa-bookmark" />
                  <FormattedHTMLMessage id="lexicon" />
                </p>
              </Modal.Header>
              <Modal.Body className={classes.Content}>
                <p className={classes.Term}>
                  {term}
                </p>
                <p className={classes.Definition}>
                  {definition}
                </p>
              </Modal.Body>
              <Modal.Footer className={classes.Footer}>
                <a href="/glossaire" target="_blank" rel="noopener noreferrer">
                  <FormattedHTMLMessage id="fullLexicon" />
                  &nbsp;
                  <i className="fas fa-external-link-alt" />
                </a>
              </Modal.Footer>
            </Modal>
            {/* eslint-disable-next-line */}
            <span onClick={this.handleShowModal}>
              {this.props.children}
            </span>
          </Fragment>
        </IntlProvider>
      );
    }
    return null;
  }
}

export default LexiconModal;

LexiconModal.propTypes = {
  language: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  target: PropTypes.string.isRequired,
};
