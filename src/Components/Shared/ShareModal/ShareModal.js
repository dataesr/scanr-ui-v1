import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import classes from './ShareModal.scss';

const basesUrls = ['linkedin', 'twitter', 'facebook'];
basesUrls.linkedin = 'https://www.linkedin.com/sharing/share-offsite/?url=';
basesUrls.twitter = 'https://twitter.com/intent/tweet?text=';
basesUrls.facebook = 'https://www.facebook.com/sharer.php?u=';

const share = (socialMedia) => {
  const urlSite = window.location.href;
  const fistPartUrl = urlSite.split('/').slice(2, 4).join('/');
  const target = `${basesUrls[socialMedia]}https://${fistPartUrl}`;

  const win = window.open(target, '_blank');
  win.focus();
};

const ShareModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <h1 className={classes.Title}>
            <i className="fas fa-share-alt" />
            &nbsp;
            Partager
          </h1>
        </Modal.Header>

        <Modal.Body>
          <div className={`d-flex justify-content-around ${classes.Socials}`}>
            <button type="button" className={classes.ButtonNoStyled} onClick={() => share('linkedin')}>
              <i className="fab fa-linkedin" title="" />
            </button>
            <button type="button" className={classes.ButtonNoStyled} onClick={() => share('twitter')}>
              <i className="fab fa-twitter-square" title="" />
            </button>
            <button type="button" className={classes.ButtonNoStyled} onClick={() => share('facebook')}>
              <i className="fab fa-facebook-square" title="" />
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <span className={classes.Link} onClick={() => setShowModal(true)} onKeyPress={() => setShowModal(true)} role="button" tabIndex={0}>
        <i className="fas fa-share-alt" />
        &nbsp;
        Partager
      </span>
    </React.Fragment>
  );
};

export default ShareModal;
