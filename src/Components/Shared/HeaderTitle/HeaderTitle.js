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

        <div className="container">
          <div className="row">
            <div className="col-lg-11">
              <BreadCrumb />
            </div>
          </div>
          <div className="row">
            <div className={classes.Title}>
              <FormattedHTMLMessage
                id="Page.title.legal"
                defaultMessage="Page.title.legal"
              />
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
);
};

export default HeaderTitle;
