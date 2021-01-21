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

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

function UIModal(props) {
  const {
    title, children, active,
  } = props;
  const [opened, setOpened] = useState(active);
  const context = useContext(GlobalContext);

  useEffect(() => {
    ReactModal.setAppElement('body');
    setOpened(active);
  }, [active]);

  const closeModal = () => {
    setOpened(false);
  };

  return (
    <IntlProvider locale={context.language} messages={msg[context.language]}>
      <ReactModal
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
              <div className="col-9">
                <article>
                  <div className="wrapper-title">
                    {title ? <h1 className="title pl-4">{title}</h1> : null}
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
        <section>
          {children}
        </section>
      </ReactModal>
    </IntlProvider>
  );
}

export default UIModal;

UIModal.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};

UIModal.defaultProps = {
  active: false,
};
