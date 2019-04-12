import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';
import classes from './MediasCard.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardWithButton = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className="col-lg-6">
      <div className={classes.MediasCard}>
        <div className="container">
          <div className="row">
            <div className={classes.Article}>
              <FormattedHTMLMessage
                id={`${props.article}.Title`}
                defaultMessage={`${props.article}.Title`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className={classes.Site}>
                <FormattedHTMLMessage
                  id={`${props.article}.Site`}
                  defaultMessage={`${props.article}.Site`}
                />
              </div>
              <div className={classes.Date}>
                <FormattedHTMLMessage
                  id={`${props.article}.Date`}
                  defaultMessage={`${props.article}.Date`}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <ButtonToPage
                className={classes.Button}
                url={props.url}
              >
                <FormattedHTMLMessage
                  id="Lire"
                  defaultMessage="Lire"
                />
              </ButtonToPage>
            </div>
          </div>
        </div>
      </div>
    </section>
  </IntlProvider>
);


export default CardWithButton;

CardWithButton.propTypes = {
  language: PropTypes.string.isRequired,
  article: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
