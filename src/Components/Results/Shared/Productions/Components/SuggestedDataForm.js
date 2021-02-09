import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import ProductionList from './ProductionList';

/* SCSS */
import styles from '../../../../../style.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const message = {
  fr: messagesFr,
  en: messagesEn,
};

const SuggestedDataForm = (props) => {
  const [suggestedDataActive, setData] = useState([]);
  const {
    isLoading, language, suggestedData, validate, children, suggestedDataMessageID, loadMoreAction,
  } = props;

  const checkItem = (id) => {
    if (suggestedDataActive.indexOf(id) > -1) {
      setData(() => suggestedDataActive.filter(dataItem => dataItem !== id));
    } else {
      setData(prevData => [...prevData, id]);
    }
  };

  return (
    <IntlProvider locale={language} messages={message[language]}>
      <div className="container">
        <section className="content-header pt-3">
          <div className="row">
            <div className="col-9">
              <p>
                <FormattedHTMLMessage id="intro_suggested_production" />
              </p>
            </div>
            <div className="col-3 text-right">
              <button
                onClick={() => validate(suggestedDataActive)}
                type="submit"
                className={`btn ${styles.btn_scanrBlue} ${!suggestedDataActive.length ? 'disabled' : ''}`}
              >
                <FormattedHTMLMessage id="validate" />
              </button>
            </div>
          </div>
        </section>
        {children}
        {suggestedDataMessageID ? (
          <div className="test container d-flex justify-content-center h-50">
            <div className="row align-self-center">
              <p className="text-center">
                <FormattedHTMLMessage id={suggestedDataMessageID} />
              </p>
            </div>
          </div>
        ) : (
          <ProductionList
            styleList={{ width: 'col-lg-12', theme: 'skinny', defaultHeight: 'auto' }}
            checkBoxItems
            checkItem={checkItem}
            itemsActive={suggestedDataActive}
            loading={isLoading}
            language={language}
            data={suggestedData}
            loadMoreAction={loadMoreAction}
          />
        )}
      </div>
    </IntlProvider>
  );
};

export default SuggestedDataForm;

SuggestedDataForm.propTypes = {
  children: PropTypes.any.isRequired,
  language: PropTypes.string.isRequired,
  suggestedData: PropTypes.array.isRequired,
  suggestedDataMessageID: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  loadMoreAction: PropTypes.func,
};
