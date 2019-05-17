import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import classes from './ButtonWithModal.scss';

class ButtonWithModal extends Component {
  state={
    showModal: false,
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  logoFunction = logo => (
    (logo) ? <div className={classes.Logo}><i className={logo} /></div> : null
  );

  titleFunction = title => (
    (title) ? <div className={classes.Title}>{title}</div> : null
  );

  render() {
    return (
      <div className={classes.ButtonWithModal}>
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton />

          <Modal.Body>
            <div className={classes.Header}>
              {this.logoFunction(this.props.logo)}
              {this.titleFunction(this.props.title)}
            </div>
            <div className={`container ${classes.Content}`}>
              {this.props.dataHtml}
            </div>
          </Modal.Body>
        </Modal>

        <button className={`btn ${classes.Button}`} onClick={this.handleShowModal} onKeypress={this.handleShowModal} type="button" tabIndex={0}>
          {this.props.buttonLabel}
          <i className="fas fa-expand" />
        </button>
      </div>
    );
  }
}

export default ButtonWithModal;


ButtonWithModal.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  buttonLabel: PropTypes.string,
  dataHtml: PropTypes.string,
};
