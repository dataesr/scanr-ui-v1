import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { SyncLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import useForms from '../../../Hooks/useForms';


/* SCSS */
import classes from './FormContact.scss';
import styles from '../../../style.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * FormContact component
 * Url :
 * Description : Formulaire de contact : label, input, textarea, btn submit,text
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */
const Contact = (props) => {
  const {
    handleSubmit,
    handleInputChange,
    inputs,
    sent,
    isSending,
    error,
  } = useForms(props.apiName, props.defaultInputs);

  let disabled = false;
  if (isSending || sent) {
    disabled = true;
  }

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-5">
            <label htmlFor="name" className="w-100">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="name"
                  defaultMessage="name"
                />
              </div>
              <input
                className={`form-control ${classes.scanrInput}`}
                type="text"
                onChange={handleInputChange}
                value={inputs.name}
                id="name"
                name="name"
                required
              />
            </label>
            <label htmlFor="organisation" className="w-100">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="organisation"
                  defaultMessage="organisation"
                />
              </div>
              <input
                className={`form-control ${classes.scanrInput}`}
                type="text"
                onChange={handleInputChange}
                value={inputs.organisation}
                id="organisation"
                name="organisation"
              />
            </label>
            <label htmlFor="fonction" className="w-100">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="fonction"
                  defaultMessage="fonction"
                />
              </div>
              <input
                className={`form-control ${classes.scanrInput}`}
                type="text"
                onChange={handleInputChange}
                value={inputs.fonction}
                id="fonction"
                name="fonction"
              />
            </label>
            <label htmlFor="email" className="w-100">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="email"
                  defaultMessage="email"
                />
              </div>
              <input
                className={`form-control ${classes.scanrInput}`}
                type="email"
                onChange={handleInputChange}
                value={inputs.email}
                id="email"
                name="email"
                required
              />
            </label>
            <label htmlFor="confirmEmail" className={`w-100 ${classes.ConfirmEmail}`}>
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="confirmEmail"
                  defaultMessage="confirmEmail"
                />
              </div>
              <input
                className={`form-control ${classes.scanrInput}`}
                type="email"
                onChange={handleInputChange}
                value={inputs.confirmEmail}
                id="confirmEmail"
                name="confirmEmail"
              />
            </label>
          </div>
          <div className="col-lg-7">
            <label htmlFor="message" className="h-100 w-100">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="message"
                  defaultMessage="message"
                />
              </div>
              <textarea
                className={`form-control ${classes.scanrTextArea}`}
                onChange={handleInputChange}
                value={inputs.message}
                id="message"
                name="message"
                rows="10"
                required
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className={classes.Texte}>
              <FormattedHTMLMessage
                id="text"
                defaultMessage="text"
              />
            </div>
          </div>
          <div className="col-lg-7 d-flex align-items-center justify-content-end">
            {
              (error) ? <div className={classes.Texte}>Une erreur est survenue</div> : null
            }
            {
              (sent) ? <div className={classes.Texte}>Merci de votre contribution</div> : null
            }
            <button
              type="submit"
              className={`ml-3 btn py-2 px-3 d-flex flex-nowrap align-items-center ${classes.btn_scanrGrey}`}
              disabled={disabled}
            >
              {
              (isSending)
                ? (<SyncLoader color={styles.$scanrdeepblueColor} />)
                : (
                  <React.Fragment>
                    <FormattedHTMLMessage
                      id="btnText"
                      defaultMessage="btnText"
                    />
                    <i className="fas fa-paper-plane pl-2" color="white" />
                  </React.Fragment>
                )
            }
            </button>
          </div>
        </div>
      </form>
    </IntlProvider>
  );
};

export default Contact;

Contact.propTypes = {
  language: PropTypes.string.isRequired,
  defaultInputs: PropTypes.object,
  apiName: PropTypes.string,
};
