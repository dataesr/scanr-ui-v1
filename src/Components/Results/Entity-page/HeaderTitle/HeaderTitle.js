import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import BreadCrumb from '../../../Shared/Ui/Breadcrumb/Breadcrumb';

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
      <div>
        <img
          className={`img-thumbnail ${classes.img}`}
          src="../img/logo-ministere.svg"
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
              id={`Page.title.${props.label}`}
              defaultMessage={`Page.title.${props.label}`}
            />
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
