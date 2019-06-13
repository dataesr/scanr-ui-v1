import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Productions.scss';

/**
 * Productions
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Productions = (props) => {
  if (!props.data) {
    return null;
  }
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className={`container-fluid ${classes.Productions}`}>
          <div className="container">
            <SectionTitle icon="fas fa-copy">
              <FormattedHTMLMessage id="Entity.productions.title" defaultMessage="Entity.productions.title" />
            </SectionTitle>
          </div>
        </section>
      </IntlProvider>
    </Fragment>
  );
};

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
