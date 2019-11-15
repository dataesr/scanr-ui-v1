import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './EmptySection.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * EmptySection
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const EmptySection = props => (
  <Fragment>
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`container ${classes.EmptySection}`} style={{ color: props.color }}>
        <FormattedHTMLMessage id="EmptySection.message" />
      </div>
    </IntlProvider>
  </Fragment>
);

export default EmptySection;

EmptySection.propTypes = {
  language: PropTypes.string.isRequired,
  color: PropTypes.string,
};
