import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../../../GlobalContext';

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
const EmptySection = (props) => {
  const context = useContext(GlobalContext);
  return (
    <Fragment>
      <IntlProvider locale={context.language} messages={messages[context.language]}>
        <div className={`container ${classes.EmptySection}`} style={{ color: props.color }}>
          <FormattedHTMLMessage id="EmptySection.message" />
        </div>
      </IntlProvider>
    </Fragment>
  );
};

export default EmptySection;

EmptySection.propTypes = {
  color: PropTypes.string,
};
