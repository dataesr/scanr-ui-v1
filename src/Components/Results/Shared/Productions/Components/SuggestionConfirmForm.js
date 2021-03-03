import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

/* SCSS */
import classes from '../../Projects/Components/FilterPanel.scss';
import styles from '../../../../../style.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const m = {
  fr: messagesFr,
  en: messagesEn,
};

const SuggestionConfirmForm = (props) => {
  const {
    language, productionsSuccessTextID, validate, emailSuccessTextID, fullName,
  } = props;
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const submitHandle = (e) => {
    e.preventDefault();
    validate({ email, message });
  };

  return (
    <IntlProvider locale={language} messages={m[language]}>
      <section className="container">
        <div className="row justify-content-lg-center">
          <div className="col-12 col-lg-10">
            <p className="mt-4 text-center"><FormattedHTMLMessage values={{ fullName }} id={productionsSuccessTextID} /></p>
            <section className="alert alert-dark">
              {emailSuccessTextID
                ? (
                  <FormattedHTMLMessage id={emailSuccessTextID} />
                )
                : (
                  <>
                    <div className="p-3"><FormattedHTMLMessage id="confirm_form_intro" /></div>
                    <form id="form" onSubmit={submitHandle}>
                      <div className="form-group">
                        <label htmlFor="email" className={`${classes.TitleFilter} w-100 col-form-label-sm`}>
                          <div><FormattedHTMLMessage id="email_label" /></div>
                          <input
                            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            type="text"
                            id="email"
                            name="email"
                            required
                            className={`form-control form-control-sm ${classes.SearchBar}`}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="form-group">
                        <label htmlFor="message" className={`${classes.TitleFilter} w-100 col-form-label-sm`}>
                          <div><FormattedHTMLMessage id="message_label" /></div>
                          <textarea
                            id="message"
                            maxLength="300"
                            name="message"
                            className={`form-control form-control-sm ${classes.SearchBar}`}
                            onChange={e => setMessage(e.target.value)}
                          />
                        </label>
                      </div>
                      <div className="text-right">
                        <button
                          type="submit"
                          className={`btn ${styles.btn_scanrBlue}`}
                        >
                          <FormattedHTMLMessage id="send" />
                        </button>
                      </div>
                    </form>
                  </>
                )
      }
            </section>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default SuggestionConfirmForm;

SuggestionConfirmForm.propTypes = {
  language: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  validate: PropTypes.func.isRequired,
  productionsSuccessTextID: PropTypes.string.isRequired,
  emailSuccessTextID: PropTypes.string.isRequired,
};
