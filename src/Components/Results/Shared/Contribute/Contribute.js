import React, { Fragment, useState } from 'react';
// import Axios from 'axios';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import FormContact from '../../../Shared/FormContact/FormContact';

/* SCSS */
import classes from './Contribute.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Contribute = (props) => {
  const [isActive, setActive] = useState(false);
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <Fragment>
        <Modal
          show={isActive}
          onHide={() => setActive(!isActive)}
          size="lg"
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <div className={`d-flex flex-column align-items-center p-4 ${classes.Modal}`}>
              <i className="fas fa-lg-edit" />
              <FormattedHTMLMessage id="Contribute.mainButton.label" />
              {props.sectionName}
            </div>
            <FormContact
              language={props.language}
              apiName="contribute"
              defaultInputs={{ id: props.objectId, type: props.objectType, section: props.sectionName }}
            />
          </Modal.Body>
        </Modal>
        {/* eslint-disable-next-line */}
        <span className="ml-auto" onClick={() => setActive(!isActive)}>
          <div className="d-flex flex-nowrap align-items-center">
            <p className={`m-0 ${classes.Text}`}>
              <FormattedHTMLMessage id="Contribute.contribute" defaultMessage="Contribute.contribute" />
            </p>
            <span className={`ml-2 btn ${classes.SquareButton} ${classes.btn_dark}`}>
              <i aria-hidden className="fas fa-pen" />
            </span>
          </div>
        </span>
      </Fragment>
    </IntlProvider>
  );
};

export default Contribute;

Contribute.propTypes = {
  language: PropTypes.string.isRequired,
  sectionName: PropTypes.any.isRequired,
  objectId: PropTypes.string.isRequired,
  objectType: PropTypes.string,
};
