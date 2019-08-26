import React from 'react';
import { IntlProvider } from 'react-intl';
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

const HeaderTitle = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.HeaderTitle}>
      <div className="container">
        <div className="row">
          <div className="col">
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
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className={classes.Title}>
              {props.label}
            </div>
          </div>
          <div className="col-3 pr-0">
            <div className="form-group">
              <label htmlFor="headerTitleSelect">
                Naviguer par thème
                <select id="headerTitleSelect" className="form-control form-control-lg">
                  <option value="Portrait">Portrait</option>
                  <option value="Network">Appartenance, réseau</option>
                  <option value="Team">Equipe</option>
                  <option value="Projects">Projets</option>
                  <option value="Productions">Productions</option>
                  <option value="Ecosystem">Ecosystème</option>
                  <option value="Awards">Certifications & Prix</option>
                  <option value="SimilarEntities">Entités similaires</option>
                  <option value="LastEntityFocus">Derniers focus de l&#39;entité</option>
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
