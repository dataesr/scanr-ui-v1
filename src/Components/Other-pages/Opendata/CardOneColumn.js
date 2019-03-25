import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';

import classes from './CardOneColumn.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardOneColumn = (props) => {
  const bgColor = classes[`${props.schema}BgColor`];

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="col-lg-3">
        <div className={`${classes.CardOneColumn} ${bgColor}`}>
          <div className={classes.Title}>
            <FormattedHTMLMessage
              id={props.title}
              defaultMessage={props.title}
            />
          </div>
          <div className={classes.Button}>
            <ButtonToPage
              className={classes.MarginTop}
              url={props.url}
            >
              Voir
            </ButtonToPage>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};


export default CardOneColumn;

CardOneColumn.propTypes = {
  language: PropTypes.string.isRequired,
  schema: PropTypes.string,
  title: PropTypes.string.isRequired,
};
