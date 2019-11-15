import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import SectionTitle from '../../../Shared/SectionTitle';

/* Gestion des langues */
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

import classes from './LastEntityFocus.scss';

/**
 * LastEntityFocus
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const LastEntityFocus = (props) => {
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
        <section className={`container-fluid ${classes.LastEntityFocus}`}>
          <div className="container">
            <SectionTitle
              icon="fa-compress-arrows-alt"
              objectType="structures"
              language={props.language}
              id={props.data.id}
              title={messages[props.language]['Entity.Section.LastEntityFocus.label']}
            />
          </div>
        </section>
      </IntlProvider>
    </Fragment>
  );
};

export default LastEntityFocus;

LastEntityFocus.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
