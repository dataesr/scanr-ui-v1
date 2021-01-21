import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

/* SCSS */
import './UIModal.static.scss';

function UIModal(props) {
  const {
    title, children, toggleModal, active,
  } = props;
  useEffect(() => {
    ReactModal.setAppElement('body');
  });
  return (
    <ReactModal
      closeTimeoutMS={200}
      contentLabel={title}
      onRequestClose={toggleModal}
      isOpen={active}
      className="Modal"

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
              <button type="button" className="modal-close close pointer" onClick={toggleModal}>
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        {children}
      </section>
    </ReactModal>
  );
}

export default UIModal;

UIModal.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  toggleModal: PropTypes.func,
  children: PropTypes.any.isRequired,
};

UIModal.defaultProps = {
  active: false,
};
