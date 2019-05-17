import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './BreadCrumb.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const BreadCrumb = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <nav className={classes.BreadCrumb} aria-label="breadcrumb">
        <ol className={`breadcrumb ${classes.breadcrumb}`}>
          <li className={`breadcrumb-item ${classes.item}`}>
            <a href="/">
              <FormattedHTMLMessage
                id="breadcrumb.home"
                defaultMessage="breadcrumb.home"
              />
            </a>
          </li>
          <li className={`breadcrumb-item ${classes.active} active`} aria-current="page">
            <a href={props.url}>
              <FormattedHTMLMessage
                id={`breadcrumb.${props.label}`}
                defaultMessage={`breadcrumb.${props.label}`}
              />
            </a>
          </li>
        </ol>
      </nav>
    </IntlProvider>
  );
};

export default BreadCrumb;

BreadCrumb.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
