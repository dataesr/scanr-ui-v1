import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Contribute.scss';

class Contribute extends Component {
  state={
    showModal: false,
    postError: false,
    data: {
      id: null,
      type: null,
      created_at: new Date().toISOString(),
      email: '',
      name: '',
      action_type: 'comment',
      modifications: '',
    },
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(prevState => ({ data: { ...prevState.data, id: this.props.objectId, type: this.props.objectType } }));
    }
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  commentChangeHandler = (e) => {
    e.persist();
    this.setState(prevState => (
      {
        data:
        {
          ...prevState.data,
          modifications: e.target.value,
          id: this.props.objectId,
          type: this.props.objectType,
        },
      }
    ));
  }

  nameChangeHandler = (e) => {
    e.persist();
    this.setState(prevState => ({ data: { ...prevState.data, name: e.target.value } }));
  }

  emailChangeHandler = (e) => {
    e.persist();
    this.setState(prevState => ({ data: { ...prevState.data, email: e.target.value } }));
  }

  submitForm = (e) => {
    e.preventDefault();
    const url = 'http://185.161.45.213/datastore/crowdsourcing';
    const now = new Date();
    const postData = { ...this.state.data, created_at: moment(now).format('YYYY-MM-DDThh:mm:ss') };
    Axios.post(url, postData)
      .then(() => {
        this.handleCloseModal();
      });
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          <Modal
            show={this.state.showModal}
            onHide={this.handleCloseModal}
            className={classes.Contribute}
            size="lg"
          >
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
                <div className={`text-center ${classes.Text3}`}>
                  <span className={classes.Important}>
                    {this.props.sectionName}
                    {this.props.objectId}
                  </span>
                </div>
                <div className="container">
                  <form onSubmit={this.submitForm}>
                    <div className="form-row">
                      <div className="form-group w-100">
                        <p>
                          <FormattedHTMLMessage id="SubmitBox.commentInput.label" />
                        </p>
                        <textarea
                          className="form-control w-100"
                          value={this.state.data.modifications}
                          name="modifications"
                          title={messages[this.props.language]['SubmitBox.commentInput.label']}
                          rows="5"
                          onChange={e => this.commentChangeHandler(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <p>
                          <FormattedHTMLMessage id="SubmitBox.nameInput.label" />
                        </p>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.data.name}
                          name="name"
                          title={messages[this.props.language]['SubmitBox.nameInput.label']}
                          onChange={e => this.nameChangeHandler(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <p>
                          <FormattedHTMLMessage id="SubmitBox.emailInput.label" />
                        </p>
                        <input
                          type="email"
                          className="form-control"
                          value={this.state.data.email}
                          name="email"
                          title={messages[this.props.language]['SubmitBox.emailInput.label']}
                          onChange={e => this.emailChangeHandler(e)}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6" style={{ position: 'relative' }}>
                        <button type="submit" className={`btn ${classes.btn_scanrGrey} ${classes.Submit}`}>
                          <FormattedHTMLMessage id="SubmitBox.submit.label" />
                          <i className="fas fa-paper-plane" />
                        </button>
                        {
                          (this.state.postError)
                            ? (<span>Erreur lors du post</span>)
                            : null
                        }
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          {/* eslint-disable-next-line */}
          <span className="ml-auto" onClick={this.handleShowModal}>
            <div className="d-flex flex-nowrap align-items-center">
              <p className={`m-0 ${classes.Text}`}>
                Contribuer
              </p>
              <span className={`ml-2 btn ${classes.SquareButton} ${classes.btn_dark}`}>
                <i aria-hidden className="fas fa-pen" />
              </span>
            </div>
          </span>
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Contribute;

Contribute.propTypes = {
  language: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: PropTypes.string,
};
