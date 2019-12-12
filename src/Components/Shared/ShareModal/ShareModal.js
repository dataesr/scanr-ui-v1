import React, { useState } from 'react';
import queryString from 'query-string';
import Modal from 'react-bootstrap/Modal';

import classes from './ShareModal.scss';

const basesUrls = ['linkedin', 'twitter', 'facebook'];
basesUrls.linkedin = 'https://www.linkedin.com/sharing/share-offsite/?url=';
basesUrls.twitter = 'https://twitter.com/intent/tweet?text=';
basesUrls.facebook = 'https://www.facebook.com/sharer.php?u=';

const share = (socialMedia) => {
  const urlSite = window.location.href;
  const splitedUrl = urlSite.split('/');
  const protocole = `${splitedUrl[0]}//`;
  const domaine = splitedUrl[2];
  const route = splitedUrl[3];
  let params = splitedUrl[4];

  if (route === 'recherche' && params.split('?')[1]) {
    const parsedURL = queryString.parse(params.split('?')[1]);
    params = `${params.split('?')[0]}?query=${parsedURL.query}`;
  }

  const target = `${basesUrls[socialMedia]}${protocole}${domaine}/${route}${params ? '/' : ''}${params || ''}`;

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
            <button type="button" className={classes.ButtonNoStyled} onClick={() => { share('linkedin'); setShowModal(false); }}>
              <i className="fab fa-linkedin" title="" />
            </button>
            <button type="button" className={classes.ButtonNoStyled} onClick={() => { share('twitter'); setShowModal(false); }}>
              <i className="fab fa-twitter-square" title="" />
            </button>
            <button type="button" className={classes.ButtonNoStyled} onClick={() => { share('facebook'); setShowModal(false); }}>
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
