import React, { useState } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './HeaderTitle.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const HeaderTitle = (props) => {
  const [selected, setSelected] = useState();
  const SectionsList = {
    entity: ['Portrait', 'Network', 'Team', 'Projects', 'Productions',
      'Awards', 'Evaluations', 'Ecosystem', 'Similars'],
    projects: ['Informations', 'Financial', 'Programs',
      'Description', 'Productions', 'Participants', 'Similars'],
    persons: ['Informations', 'Production', 'CoAuthors', 'Similars'],
    publication: ['Publication', 'AccessType', 'Authors', 'Affiliations', 'Similars'],
    thesis: ['Identity', 'AccessType', 'Authors', 'Affiliations', 'Similars'],
    patent: ['Identity', 'Participants', 'Depots', 'Similars'],
  };
  const scrollTop = (props.isFull) ? -350 : -120;
  if (selected) {
    document.getElementById(selected).scrollIntoView(true);
    window.scrollBy({ top: scrollTop, behavior: 'smooth' });
    setSelected(null);
  }

  const renderBread = () => (
    <div className="col-12">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className={classes['breadcrumb-item']}>
            <a href="/">{messages[props.language].Home}</a>
          </li>
          <li className={classes['breadcrumb-item']}>
            <a href="/recherche/all">
              <FormattedHTMLMessage id="Search" />
            </a>
          </li>
          <li className={`${classes['breadcrumb-item']} ${classes.ItemActive}`}>
            <FormattedHTMLMessage id={props.idPage} />
          </li>
        </ol>
      </nav>
    </div>
  );

  let style = {};
  if (!props.isFull) {
    style = { position: 'fixed', zIndex: 1002, width: '100%' };
  }
  // sinon full
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.HeaderTitle} style={style}>
        <div className="container">
          {props.isFull ? renderBread() : null}
          <div className="row d-flex flex-nowrap justify-content-between align-items-center">
            <div className={classes.Title}>
              {props.label}
            </div>
            <div className={`form-group ${classes.NavBox}`}>
              <select
                id="headerTitleSelect"
                className="form-control"
                onChange={e => setSelected(e.target.value)}
                value={selected}
                defaultValue="nav"
              >
                <option
                  key="nav"
                  value="nav"
                  disabled
                >
                  {messages[props.language]['HeaderTitle.label1']}
                </option>
                {
                  SectionsList[props.idPage].map(item => (
                    <option
                      value={item}
                      key={item}
                    >
                      {messages[props.language][`${props.idPage}.${item}`]}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default HeaderTitle;

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  idPage: PropTypes.oneOf(['entity', 'projects',
    'persons', 'publication', 'thesis', 'patent']).isRequired,
  isFull: PropTypes.bool.isRequired,
};
