import React, { useState } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import Modal from 'react-bootstrap/Modal';
import classes from './Home.scss';

const WelcomeModal = () => {
  const [isActive, setActive] = useState(true);
  let displayWelcomeModal = true;
  const visited = localStorage.alreadyVisitedScanR;
  if (visited) {
    displayWelcomeModal = false;
  } else {
    localStorage.alreadyVisitedScanR = true;
  }
  return (
    <Modal
      show={displayWelcomeModal && isActive}
      onHide={() => setActive(!isActive)}
      size="lg"
    >
      <Modal.Header closeButton className={classes.Header}>
        <p className={classes.Title}>
          <i className="fas fa-bookmark" />
          <FormattedHTMLMessage id="Welcome.Title" />
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className={`d-flex flex-column align-items-center p-4 ${classes.Modal}`}>
          <i className="fas fa-lg-edit" />
          <FormattedHTMLMessage id="Welcome.Text" />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default WelcomeModal;
