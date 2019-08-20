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
                  <a href="/recherche">Recherche</a>
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
             <label for="exampleFormControlSelect1">
               Naviguer par thème
             </label>
             <select className="form-control form-control-lg" id="exampleFormControlSelect1">
               <option>Portrait</option>
               <option>Appartenance, réseau</option>
               <option>Equipe</option>
               <option>Productions</option>
               <option>Ecosystème</option>
               <option>Certifications & Prix</option>
               <option>Entités similaires</option>
               <option>Derniers focus de l'entité</option>
             </select>
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
