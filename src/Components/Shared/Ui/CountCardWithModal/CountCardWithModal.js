import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

import classes from './CountCardWithModal.scss';

/**
 * SimpleCountListCard component
 * Url : .
 * Description : Carte avec count, titre, label, list et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
export function CountCardModalItem({ title }) {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
}

CountCardModalItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function CountCardWithModal({
  children,
  title,
  buttonLabel,
  modalTitle,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`d-flex flex-column justify-content-around ${classes.CountCardWithModal}`}>
      <div className={classes.Title}>
        {title}
      </div>
      <div className={classes.ButtonWithModal}>
        <Modal show={isOpen} onHide={() => setIsOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>

        <button className={`btn ${classes.Button}`} onClick={() => setIsOpen(true)} onKeyPress={() => setIsOpen(true)} type="button" tabIndex={0}>
          {buttonLabel}
          <i className="fas fa-expand" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

CountCardWithModal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttonLabel: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
};
