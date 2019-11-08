import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import SubmitBox from '../../SubmitBox/SubmitBox';

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
        {(props.modifyMode) ? (
          <SubmitBox
            language={props.language}
            masterKey={props.masterKey}
            label="empty"
            emptySection
            autoLaunch={props.modifyMode}
            modifyModeHandle={props.modifyModeHandle}
          />
        ) : null}
      </div>
    </IntlProvider>
  </Fragment>
);

export default EmptySection;

EmptySection.propTypes = {
  language: PropTypes.string.isRequired,
  masterKey: PropTypes.string,
  modifyMode: PropTypes.bool,
  modifyModeHandle: PropTypes.func,
  color: PropTypes.string,
};
