import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './PersonNameCard.scss';
import getSelectKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * genderGraphCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PersonNameCard = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div>
      {props.data.fullName}
      {props.data.gender}
      {JSON.stringify(props.data.externalIds)}
    </div>
  </IntlProvider>
);


export default PersonNameCard;

PersonNameCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
