import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messageEntityFr from '../../Results/Entity-page/translations/fr.json';
import messageEntityEn from '../../Results/Entity-page/translations/en.json';

import classes from './SubmitBox.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
const messagesEntity = {
  fr: messageEntityFr,
  en: messageEntityEn,
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
    showModifyModal: false,
    buttons: {
      enrich: true,
      revise: false,
    },
  };


  toggleModifyModal = () => {
    this.setState(prevState => ({ showModifyModal: !prevState.showModifyModal }));
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
        <div className={`d-flex align-self-center ${classes.SubmitBox}`}>
          <button className="btn" type="button" onClick={this.toggleModifyModal}>
            <FormattedHTMLMessage id="SubmitBox.mainButton.label" defaultMessage="SubmitBox.mainButton.label" />
          </button>

          <Modal show={this.state.showModifyModal} onHide={this.toggleModifyModal} size="lg">
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

                  <button
                    className={`btn ${(this.state.buttons.revise) ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}
                    type="button"
                    onClick={() => this.changeTypeHandler('revise')}
                  >
                    <FormattedHTMLMessage id="SubmitBox.revise.label" />
                  </button>
                </div>
                <div className={`text-center ${classes.Text3}`}>
                  <span className={classes.Important}>
                    {
                      messagesEntity[this.props.language][`Entity.Section.${this.props.masterKey.split('.')[0]}.label`].toUpperCase()
                    }
                  </span>
                  <FormattedHTMLMessage id="for" />
                  <span className={classes.Important}>
                    {this.props.label}
                  </span>
                </div>
                <div className="container">
                  <form>
                    <div className="form-row">
                      <div className="form-group">
                        { /* eslint-disable-next-line */ }
                        <label for="commentInput">
                          <FormattedHTMLMessage id="SubmitBox.commentInput.label" />
                        </label>
                        <textarea className="form-control" id="commentInput" name="commentInput" rows="5" />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        { /* eslint-disable-next-line */ }
                        <label for="nameInput">
                          <FormattedHTMLMessage id="SubmitBox.nameInput.label" />
                        </label>
                        <input type="text" className="form-control" id="nameInput" name="nameInput" />
                      </div>
                      <div className="form-group col-md-6">
                        captcha
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        { /* eslint-disable-next-line */ }
                        <label for="emailInput">
                          <FormattedHTMLMessage id="SubmitBox.emailInput.label" />
                        </label>
                        <input type="email" className="form-control" id="emailInput" name="emailInput" />
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
        </div>
      </IntlProvider>
    );
  }
}


export default SubmitBox;

SubmitBox.propTypes = {
  language: PropTypes.string.isRequired,
  masterKey: PropTypes.string.isRequired, // Utilisée pour le mode modifier/enrichir
  label: PropTypes.string.isRequired,
};
