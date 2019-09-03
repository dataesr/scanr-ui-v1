import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
import messagesEntityFr from '../translations/fr.json';
import messagesEntityEn from '../translations/en.json';

/* SCSS */
import classes from './HeaderTitle.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const messagesEntity = {
  fr: messagesEntityFr,
  en: messagesEntityEn,
};

const HeaderTitle = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.HeaderTitle}>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className={classes['breadcrumb-item']}>
                  <a href="/">Accueil</a>
                </li>
                <li className={classes['breadcrumb-item']}>
                  <a href="/recherche/all">Recherche</a>
                </li>
                <li className={`${classes['breadcrumb-item']} ${classes.ItemActive}`}>Entité</li>
              </ol>
            </nav>
            <div className={classes.Title}>
              {props.label}
            </div>
          </div>
          <div className={`col pr-0 ${classes.ColToDelete}`}>
            <div className={`form-group ${classes.NavBox}`}>
              {/* eslint-disable-next-line */}
              <label htmlFor="headerTitleSelect">
                <FormattedHTMLMessage id="HeaderTitle.label1" />

                <select id="headerTitleSelect" className="form-control form-control-lg">
                  <option value="Portrait">{messagesEntity[props.language]['Entity.Section.Portrait.label']}</option>
                  <option value="Network">{messagesEntity[props.language]['Entity.Section.Network.label']}</option>
                  <option value="Team">{messagesEntity[props.language]['Entity.Section.Team.label']}</option>
                  <option value="Projects">{messagesEntity[props.language]['Entity.Section.Projects.label']}</option>
                  <option value="Productions">{messagesEntity[props.language]['Entity.Section.Productions.label']}</option>
                  <option value="Ecosystem">{messagesEntity[props.language]['Entity.Section.Ecosystem.label']}</option>
                  <option value="Awards">{messagesEntity[props.language]['Entity.Section.Awards.label']}</option>
                  <option value="SimilarEntities">{messagesEntity[props.language]['Entity.Section.SimilarEntities.label']}</option>
                  <option value="LastEntityFocus">{messagesEntity[props.language]['Entity.Section.LastEntityFocus.label']}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default HeaderTitle;

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
