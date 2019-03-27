import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import LogoCard from '../Ui/LogoCard/LogoCard';
import BreadCrumb from '../Ui/Breadcrumb/Breadcrumb';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './HeaderTitle.scss';

const HeaderTitle = (props) => {
  const frActive = (props.language === 'fr') ? classes.ActiveLink : '';
  const enActive = (props.language === 'en') ? classes.ActiveLink : '';

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return(
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.HeaderTitle}>
        <div>
          <img
            className={`img-thumbnail ${classes.img}`}
            src="./img/logo-ministere.svg"
            alt="logo ministère"
          />
        </div>
        <div className="container">
          <div className="row">
            <BreadCrumb />
          </div>
          <div className="row">
            <div className={classes.title}>
              <FormattedHTMLMessage
                id={`Page.title.${props.schema}`}
                defaultMessage={`Page.title.${props.schema}`}
              />
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
  switchLanguage: PropTypes.func.isRequired,
  schema: PropTypes.string.isRequired,
};
