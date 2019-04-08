import React from 'react';
import { IntlProvider, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Search.scss';
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

const Search = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const randomNumber = Math.floor(Math.random() * 4);
  const schemasPowders = ['entities', 'persons', 'projects', 'publications'];
  const schemasColors = [ENTITY_COLOR, PERSON_COLOR, PROJECT_COLOR, PUBLICATION_COLOR];
  const color = schemasColors[randomNumber];
  const bgUrl = `./img/poudre-header-home-${schemasPowders[randomNumber]}.jpg`;
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
    backgroundSize: '35%',
  };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section style={sectionStyle} className={classes.Search}>
        <div className="container">
          <div className={classes.Logo}>
            <LogoScanrWhiteSVG fill={color} />
          </div>

          <form>
            <div className="form-row">
              <div className="form-group col-md-8">
                <FormattedMessage id="Search.TitleSearchBar" defaultMessage="Search.TitleSearchBar">
                  { label => <label className={classes.TitleSearchBar} htmlFor="inputCity">{label}</label> }
                </FormattedMessage>
                <FormattedMessage id="Search.PlaceHolder" defaultMessage="Search.PlaceHolder">
                  { placeholder => <input type="text" className="form-control" id="inputCity" placeholder={placeholder} /> }
                </FormattedMessage>
              </div>
              <div className="form-group col-md-3">
                <FormattedMessage id="Search.SearchPerimeter" defaultMessage="Search.SearchPerimeter">
                  { label => <label className={classes.SearchPerimeter} htmlFor="inputCity">{label}</label> }
                </FormattedMessage>
                <select id="inputState" className={`form-control ${classes.Select}`}>
                  <FormattedMessage id="Search.Select.All" defaultMessage="Search.Select.All">
                    { option => <option className={classes.btn_dark} value="All">{option}</option> }
                  </FormattedMessage>
                  <FormattedMessage id="Search.Select.Entities" defaultMessage="Search.Select.Entities">
                    { option => <option className={classes.btn_dark} value="Entities">{option}</option> }
                  </FormattedMessage>
                  <FormattedMessage id="Search.Select.Persons" defaultMessage="Search.Select.Persons">
                    { option => <option className={classes.btn_dark} value="Persons">{option}</option> }
                  </FormattedMessage>
                  <FormattedMessage id="Search.Select.Projects" defaultMessage="Search.Select.Projects">
                    { option => <option className={classes.btn_dark} value="Projects">{option}</option> }
                  </FormattedMessage>
                  <FormattedMessage id="Search.Select.Publications" defaultMessage="Search.Select.Publications">
                    { option => <option className={classes.btn_dark} value="Publications">{option}</option> }
                  </FormattedMessage>
                </select>
              </div>
              <div className="form-group col-md-1">
                <button type="submit" className={`btn ${classes.btn_dark} ${classes.btn_dark_margin}`}>
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </form>
          <div className={classes.HowTo}>
            <FormattedHTMLMessage id="Search.HowTo" defaultMessage="Search.HowTo" />
          </div>
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

export default Search;

Search.propTypes = {
  language: PropTypes.string.isRequired,
  suggests: PropTypes.array,
};
Search.defaultProps = {
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
