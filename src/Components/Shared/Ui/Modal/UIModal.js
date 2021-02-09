import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/* Intl */
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../../GlobalContext';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './UIModal.scss';

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
    titleID, children, isOpened, size, modalHandler,
  } = props;
  const [opened, setOpened] = useState(isOpened);
  const { language } = useContext(GlobalContext);

  useEffect(() => {
    ReactModal.setAppElement('body');
    setOpened(isOpened);
  }, [isOpened]);

  const toggleAnimation = (visible = true) => {
    const overlay = document.querySelector(`.${classes.Overlay}`);
    overlay.style.opacity = visible ? 1 : 0;
    overlay.style.transition = 'opacity 200ms ease-out';
  };

  const onRequestClose = () => {
    toggleAnimation(false);

    setOpened(false);
    if (modalHandler) {
      modalHandler();
    }
  };
  return (
    <IntlProvider locale={language} messages={msg[language]}>
      <ReactModal
        onAfterOpen={toggleAnimation}
        style={{ content: cssModal[size] }}
        closeTimeoutMS={200}
        onRequestClose={onRequestClose}
        isOpen={opened}
        className={`${classes.Modal} Modal`}
        overlayClassName={`${classes.Overlay}`}
        bodyOpenClassName={`${classes.ReactModal__BodyOpen}`}
      >
        <section className={`${classes.Header} modal-header`}>
          <div className="container">
            <div className="row">
              <div className="col-9 pl-0">
                <article>
                  <div>
                    {titleID ? <h1 className={classes.Title}><FormattedHTMLMessage id={titleID} /></h1> : null}
                  </div>
                </article>
              </div>
              <div className="col-3">
                <button type="button" className={`${classes.Close} ${classes.pointer} modal-close close`} onClick={onRequestClose}>
                  <span aria-hidden="true">
                    <i className="fas fa-xs fa-times" />
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
  titleID: PropTypes.string.isRequired,
  modalHandler: PropTypes.func,
  children: PropTypes.any.isRequired,
  size: PropTypes.string,
};

UIModal.defaultProps = {
  isOpened: false,
  size: 'big',
};
