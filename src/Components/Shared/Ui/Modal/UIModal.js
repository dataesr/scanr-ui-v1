import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/* Intl */
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../../GlobalContext';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import './UIModal.static.scss';
import classes from '../../../Search/Filters/ActiveFilterCard/ActiveFilterCard.scss';

const cssModal = {
  big: { height: '70vh', width: '70vw' },
  small: { height: '40vh', width: '40vw' },
};

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

function UIModal(props) {
  const {
    title, children, isOpened, size, modalHandler,
  } = props;
  const [opened, setOpened] = useState(isOpened);
  const { language } = useContext(GlobalContext);

  useEffect(() => {
    ReactModal.setAppElement('body');
    setOpened(isOpened);
  }, [isOpened]);

  const closeModal = () => {
    setOpened(false);
    if (modalHandler) {
      modalHandler();
    }
  };

  return (
    <IntlProvider locale={language} messages={msg[language]}>
      <ReactModal
        style={{ content: cssModal[size] }}
        closeTimeoutMS={200}
        contentLabel={title}
        onRequestClose={closeModal}
        isOpen={opened}
        className="Modal"
        overlayClassName="Overlay"
      >
        <section className="modal-header">
          <div className="container">
            <div className="row">
              <div className="col-9 pl-0">
                <article>
                  <div className="wrapper-title">
                    {title ? <h1 className="title">{title}</h1> : null}
                  </div>
                </article>
              </div>
              <div className="col-3">
                <button type="button" className="modal-close close pointer" onClick={closeModal}>
                  <span aria-hidden="true">
                    <i className={`fas fa-xs fa-times ${classes.closeIcon}`} />
                  </span>
                  <span className="sr-only"><FormattedHTMLMessage id="close" /></span>
                </button>
              </div>
            </div>
          </div>
        </section>
        {children}
      </ReactModal>
    </IntlProvider>
  );
}

export default UIModal;

UIModal.propTypes = {
  isOpened: PropTypes.bool,
  title: PropTypes.string,
  modalHandler: PropTypes.func,
  children: PropTypes.any.isRequired,
  size: PropTypes.string,
};

UIModal.defaultProps = {
  isOpened: false,
  size: 'big',
};
