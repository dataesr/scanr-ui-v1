import React, { Component, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import Axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SubmitBox.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * SubmitBox
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class SubmitBox extends Component {
  state = {
    showModifyModal: this.props.autoLaunch,
    buttons: {
      enrich: true,
      revise: false,
    },
    // id: this.props.id,
    // type: this.props.type,
    created_at: moment(new Date()).format(),
    email: null,
    name: null,
    action_type: 'enrich',
    modifications: null,
  };

  toggleModifyModal = () => {
    this.setState(prevState => ({ showModifyModal: !prevState.showModifyModal }));
    if (this.props.autoLaunch) {
      this.props.modifyModeHandle();
    }
  }

  sendForm = () => {
    const data = { ...this.state };
    delete data.showModifyModal;
    delete data.buttons;
    data.action_type = (this.state.buttons.enrich) ? 'enrich' : 'revise';
    Axios.post('http://185.161.45.213/datastore/crowdsourcing', data);
  }

  changeTypeHandler = (type) => {
    if (type === 'enrich') {
      this.setState({
        buttons: {
          enrich: true,
          revise: false,
        },
      });
    } else {
      this.setState({
        buttons: {
          enrich: false,
          revise: true,
        },
      });
    }
  }

  render() {
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          {
            (!this.props.emptySection) ? (
              <div className={`d-flex align-self-center ${classes.SubmitBox}`}>
                <button className="btn" type="button" onClick={this.toggleModifyModal}>
                  <FormattedHTMLMessage id="SubmitBox.mainButton.label" defaultMessage="SubmitBox.mainButton.label" />
                </button>
              </div>
            ) : null
          }

          <Modal show={this.state.showModifyModal || this.props.autoLaunch} onHide={this.toggleModifyModal} size="lg" aria-label={messages[this.props.language]['SubmitBox.mainButton.label']}>
            <Modal.Header closeButton />
            <Modal.Body>
              <div className={classes.Modal}>
                <div className={`text-center ${classes.Text1}`}>
                  <i className="fas fa-edit" />
                  <span>
                    <FormattedHTMLMessage id="SubmitBox.mainButton.label" />
                  </span>
                </div>
                <div className={`text-center ${classes.Text2}`}>
                  <FormattedHTMLMessage id="SubmitBox.text2" />
                </div>
                <div className="text-center">
                  <button
                    className={`btn ${(this.state.buttons.enrich) ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}
                    type="button"
                    onClick={() => this.changeTypeHandler('enrich')}
                  >
                    <FormattedHTMLMessage id="SubmitBox.enrich.label" />
                  </button>
                  {
                    (!this.props.emptySection) ? (
                      <button
                        className={`btn ${(this.state.buttons.revise) ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}
                        type="button"
                        onClick={() => this.changeTypeHandler('revise')}
                      >
                        <FormattedHTMLMessage id="SubmitBox.revise.label" />
                      </button>
                    ) : null
                  }
                </div>
                <div className={`text-center ${classes.Text3}`}>
                  <span className={classes.Important}>
                    {
                      messages[this.props.language][`Section.${this.props.masterKey.split('.')[0]}.label`].toUpperCase()
                    }
                  </span>
                  {
                    (!this.props.emptySection) ? (
                      <Fragment>
                        <FormattedHTMLMessage id="for" />
                        <span className={classes.Important}>
                          {this.props.label}
                        </span>
                      </Fragment>
                    ) : null
                  }
                </div>
                <div className="container">
                  <form>
                    <div className="form-row">
                      <div className="form-group">
                        <p>
                          <FormattedHTMLMessage id="SubmitBox.commentInput.label" />
                        </p>
                        <textarea className="form-control" name="commentInput" title={messages[this.props.language]['SubmitBox.commentInput.label']} rows="5" required />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <p>
                          <FormattedHTMLMessage id="SubmitBox.nameInput.label" />
                        </p>
                        <input type="text" className="form-control" name="nameInput" title={messages[this.props.language]['SubmitBox.nameInput.label']} required />
                      </div>
                      <div className="form-group col-md-6">
                        captcha
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <p>
                          <FormattedHTMLMessage id="SubmitBox.emailInput.label" />
                        </p>
                        <input type="email" className="form-control" name="emailInput" title={messages[this.props.language]['SubmitBox.emailInput.label']} required />
                      </div>
                      <div className="form-group col-md-6" style={{ position: 'relative' }}>
                        <button type="submit" className={`btn ${classes.btn_scanrGrey} ${classes.Submit}`}>
                          <FormattedHTMLMessage id="SubmitBox.submit.label" />
                          <i className="fas fa-paper-plane" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Fragment>
      </IntlProvider>
    );
  }
}


export default SubmitBox;


SubmitBox.defaultProps = {
  emptySection: false,
  autoLaunch: false,
};

SubmitBox.propTypes = {
  language: PropTypes.string.isRequired,
  masterKey: PropTypes.string.isRequired, // Utilisée pour le mode modifier/enrichir
  label: PropTypes.string.isRequired,
  emptySection: PropTypes.bool,
  autoLaunch: PropTypes.bool,
  modifyModeHandle: PropTypes.func,
};
