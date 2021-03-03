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

const SuggestionForm = (props) => {
  const [suggestionDataActive, setSuggestionDataActive] = useState([]);
  const {
    isLoading, language, suggestionData, validate, children, productionErrorTextID, loadMoreAction, fullName,
  } = props;

  const checkItem = (id) => {
    if (suggestionDataActive.indexOf(id) > -1) {
      setSuggestionDataActive(() => suggestionDataActive.filter(dataItem => dataItem !== id));
    } else {
      setSuggestionDataActive(prevData => [...prevData, id]);
    }
  };

  return (
    <IntlProvider locale={language} messages={message[language]}>
      <section className="container">
        <div className="row justify-content-lg-center">
          <div className="col-12 col-lg-11 d-flex content-header pt-3">
            <div className="col-9 p-0">
              <p>
                <FormattedHTMLMessage values={{ fullName }} id="suggestion_intro" />
              </p>
            </div>
            <div className="col-3 p-0 text-right">
              <button
                onClick={() => validate(suggestionDataActive)}
                type="submit"
                className={`btn ${styles.btn_scanrBlue} ${!suggestionDataActive.length ? 'disabled' : ''}`}
              >
                <FormattedHTMLMessage id="validate" />
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-lg-center">
          <div className="col-12 col-lg-11">
            {children}
          </div>
        </div>
        {productionErrorTextID ? (
          <div className="d-flex justify-content-center">
            <div className="row align-self-center">
              <p className="mt-4 text-center">
                <FormattedHTMLMessage id={productionErrorTextID} />
              </p>
            </div>
          </div>
        ) : (
          <ProductionList
            styleList={{ classWidth: 'col-12 col-lg-11', theme: 'skinny', defaultHeight: 'auto' }}
            checkBoxItems
            checkItem={checkItem}
            itemsActive={suggestionDataActive}
            loading={isLoading}
            language={language}
            data={suggestionData}
            loadMoreAction={loadMoreAction}
          />
        )}
      </section>
    </IntlProvider>
  );
};

export default SuggestionForm;

SuggestionForm.propTypes = {
  children: PropTypes.any.isRequired,
  language: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  suggestionData: PropTypes.array.isRequired,
  productionErrorTextID: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  validate: PropTypes.func.isRequired,
  loadMoreAction: PropTypes.func,
};
