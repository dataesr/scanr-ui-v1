import React, { Fragment } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchPanel.scss';

const SearchPanel = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  // const bgUrl = `./img/poudre-header-home-${props.api}.jpg`;
  // const headerPosition = (props.isFull) ? 'relative' : 'fixed';
  const headerPosition = 'fixed';
  const sectionStyle = {
    // backgroundImage: `url(${bgUrl})`,
    backgroundSize: '35%',
    position: headerPosition,
    width: '100vw',
    zIndex: '1001',
  };

  const renderForm = (
    <form onSubmit={props.submitResearch}>
      <div className="row d-flex flex-nowrap align-items-end my-2">
        <div className="flex-grow-1">
          <FormattedMessage id="Search.PlaceHolder" defaultMessage="Search.PlaceHolder">
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
            <FormattedMessage id="Search.Select.All" defaultMessage="Search.Select.All">
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
            <FormattedMessage id="Search.Select.Entities" defaultMessage="Search.Select.Entities">
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
            <FormattedMessage id="Search.Select.Persons" defaultMessage="Search.Select.Persons">
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
            <FormattedMessage id="Search.Select.Projects" defaultMessage="Search.Select.Projects">
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
            <FormattedMessage id="Search.Select.Publications" defaultMessage="Search.Select.Publications">
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
        </div>
      </div>
    </form>
  );

  // const renderFull = (
  //   <IntlProvider locale={props.language} messages={messages[props.language]}>
  //     <section style={sectionStyle} className={`animated fadeIn faster ${classes.SearchBar}`}>
  //       <div className="container pt-3">
  //         <BreadCrumb
  //           language={props.language}
  //           label="search"
  //           url="#"
  //         />
  //         {renderForm}
  //       </div>
  //     </section>
  //   </IntlProvider>
  // );

  const renderMini = (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section style={sectionStyle} className={`animated slideInDown faster ${classes.SearchBar}`}>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md">
              {renderForm}
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );

  // const content = props.isFull ? renderFull : renderMini;

  return (<Fragment>{renderMini}</Fragment>);
};

export default SearchPanel;

SearchPanel.propTypes = {
  language: PropTypes.string.isRequired,
  currentQueryText: PropTypes.string,
  api: PropTypes.string,
  queryTextChangeHandler: PropTypes.func,
  apiChangeHandler: PropTypes.func,
  submitResearch: PropTypes.func,
  // isFull: PropTypes.bool,
};
// SearchPanel.defaultProps = {
//   isFull: true,
// };
