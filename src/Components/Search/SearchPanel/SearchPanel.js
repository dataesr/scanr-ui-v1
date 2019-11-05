import React, { Fragment } from 'react';
import { IntlProvider, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchPanel.scss';
import BreadCrumb from './BreadCrumb/BreadCrumb';
// import Background from './poudre-header-home-yellow.jpg';
import ButtonMiniDarkToSearch from '../../Shared/Ui/Buttons/ButtonMiniDarkToSearch';
import LogoScanrWhiteSVG from '../../Shared/svg/logo-scanr-white';

/* COULEURS */
import {
  ENTITY_COLOR,
  PERSON_COLOR,
  PROJECT_COLOR,
  PUBLICATION_COLOR,
} from '../../../config/config';


const SearchPanel = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const randomNumber = Math.floor(Math.random() * 4);
  const schemasColors = [ENTITY_COLOR, PERSON_COLOR, PROJECT_COLOR, PUBLICATION_COLOR];
  const color = schemasColors[randomNumber];
  const bgUrl = `./img/poudre-header-home-${props.api}.jpg`;
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
    backgroundSize: '35%',
  };
  const ShouldRenderLogo = () => {
    if (props.isHome) {
      return (
        <div className={classes.Logo}>
          <LogoScanrWhiteSVG fill={color} />
        </div>
      );
    }
    return (
      <BreadCrumb
        language={props.language}
        label="search"
        url="#"
      />
    );
  };
  const ShouldRenderHelper = () => {
    if (props.isHome) {
      return (
        <div className={classes.HowTo}>
          <FormattedHTMLMessage id="Search.HowTo" defaultMessage="Search.HowTo" />
        </div>
      );
    }
    return (<Fragment />);
  };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section style={sectionStyle} className={classes.SearchBar}>
        <div className={`container ${classes.MainContainer}`}>
          {ShouldRenderLogo()}
          <form onSubmit={props.submitResearch}>
            <div className="d-flex align-items-center mb-2">
              <div className="d-flex flex-column flex-grow-1 pl-0">
                <FormattedMessage id="Search.TitleSearchBar" defaultMessage="Search.TitleSearchBar">
                  {/* eslint-disable-next-line */}
                  { label => <label className={`pl-2 ${classes.TitleSearchBar}`} htmlFor="query">{label}</label> }
                </FormattedMessage>
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
              <div className="d-flex flex-column pr-1 pl-1">
                <FormattedMessage id="Search.SearchPerimeter" defaultMessage="Search.SearchPerimeter">
                  {/* eslint-disable-next-line */}
                  { label => <label className={`pl-2 pr-4 ${classes.SearchPerimeter}`} htmlFor="api">{label}</label> }
                </FormattedMessage>
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
              <div className="d-flex flex-column pr-0 pl-1">
                <button
                  type="submit"
                  className={`btn ${classes.btn_dark} ${classes.btn_dark_margin}`}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
          {ShouldRenderHelper()}
          <div className={classes.Suggest}>
            <FormattedHTMLMessage id="Search.Suggest" defaultMessage="Search.Suggest" />
            <span>
              {
                props.suggests.map(suggest => (<ButtonMiniDarkToSearch key={suggest.label}>{suggest.label}</ButtonMiniDarkToSearch>))
              }
            </span>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default SearchPanel;

SearchPanel.propTypes = {
  language: PropTypes.string.isRequired,
  suggests: PropTypes.array,
  /* eslint-disable-next-line */
  isHome: PropTypes.bool,
  currentQueryText: PropTypes.string,
  api: PropTypes.string,
  queryTextChangeHandler: PropTypes.func,
  apiChangeHandler: PropTypes.func,
  submitResearch: PropTypes.func,
};
SearchPanel.defaultProps = {
  suggests: [
    {
      label: '5G',
      url: '',
    },
    {
      label: 'Biotechnologie',
      url: '',
    },
    {
      label: 'openData',
      url: '',
    },
    {
      label: 'PIA',
      url: '',
    },
  ],
};
