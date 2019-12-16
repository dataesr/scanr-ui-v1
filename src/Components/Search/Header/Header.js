import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';

import classes from './Header.scss';

const SearchPanel = (props) => {
  const sectionStyle = {
    backgroundSize: '35%',
    position: 'fixed',
    width: '100vw',
    zIndex: '1001',
  };

  const renderForm = (
    <form onSubmit={props.submitResearch}>
      <div className="row d-flex flex-nowrap align-items-end my-2">
        <div className="flex-grow-1">
          <FormattedMessage id="Search.Header.PlaceHolder" defaultMessage="Search.Header.PlaceHolder">
            { placeholder => (
              <input
                type="text"
                className={`pl-2 ${classes.SearchBar2}`}
                id="query"
                placeholder={placeholder}
                value={props.currentQueryText}
                onChange={props.queryTextChangeHandler}
              />
            )}
          </FormattedMessage>
        </div>
        <div className={`pl-1 ${classes.onlyMobile}`}>
          <select
            id="api"
            className={`form-control ${classes.Select}`}
            onChange={props.apiChangeHandler}
          >
            <FormattedMessage id="Search.Global.All" defaultMessage="Search.Global.All">
              { option => (
                <option
                  className={classes.btn_dark}
                  value="All"
                  selected={(props.api === 'all')}
                >
                  {option}
                </option>
              )}
            </FormattedMessage>
            <FormattedMessage id="Search.Global.Entities" defaultMessage="Search.Global.Entities">
              { option => (
                <option
                  className={classes.btn_dark}
                  value="Structures"
                  selected={(props.api === 'structures')}
                >
                  {option}
                </option>
              )}
            </FormattedMessage>
            <FormattedMessage id="Search.Global.Persons" defaultMessage="Search.Global.Persons">
              { option => (
                <option
                  className={classes.btn_dark}
                  value="Persons"
                  selected={(props.api === 'persons')}
                >
                  {option}
                </option>
              )}
            </FormattedMessage>
            <FormattedMessage id="Search.Global.Projects" defaultMessage="Search.Global.Projects">
              { option => (
                <option
                  className={classes.btn_dark}
                  value="Projects"
                  selected={(props.api === 'projects')}
                >
                  {option}
                </option>
              )}
            </FormattedMessage>
            <FormattedMessage id="Search.Global.Publications" defaultMessage="Search.Global.Publications">
              { option => (
                <option
                  className={classes.btn_dark}
                  value="Publications"
                  selected={(props.api === 'publications')}
                >
                  {option}
                </option>
              )}
            </FormattedMessage>
          </select>
        </div>
        <div className="pl-1 pr-3">
          <button
            type="submit"
            className={`btn ${classes.btn_dark} ${classes.btn_dark_margin54} ${classes.BtnSearch}`}
          >
            <i className="fas fa-search" />
          </button>
          &nbsp;
          <LexiconModal language={props.language} target="Search">
            <i className="fa fa-info-circle" />
          </LexiconModal>
        </div>
      </div>
    </form>
  );

  return (
    <section style={sectionStyle} className={`animated slideInDown faster ${classes.SearchBar}`}>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md">
            {renderForm}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPanel;

SearchPanel.propTypes = {
  currentQueryText: PropTypes.string,
  api: PropTypes.string,
  language: PropTypes.string,
  queryTextChangeHandler: PropTypes.func,
  apiChangeHandler: PropTypes.func,
  submitResearch: PropTypes.func,
};
