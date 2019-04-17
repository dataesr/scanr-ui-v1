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
    <div className={`col-lg-6 ${classes.MediasCard}`}>
      <div className={classes.Content}>
        <div className={`container ${classes.TopCard} `}>
          <div className={classes.Title}>
            <FormattedHTMLMessage
              id={`${props.article}.Title`}
              defaultMessage={`${props.article}.Title`}
            />
          </div>
        </div>
        <div className={`container ${classes.BottomCard}`}>
          <div className="row">
            <div className={`col-9 ${classes.Origine}`}>
              <div className={classes.Source}>
                <div className={classes.TitleSource}>
                  <FormattedHTMLMessage
                    id={`${props.article}.Source`}
                    defaultMessage={`${props.article}.Source`}
                  />
                </div>
              </div>
              <div className={classes.Date}>
                <FormattedHTMLMessage
                  id={`${props.article}.Date`}
                  defaultMessage={`${props.article}.Date`}
                />
              </div>
            </div>
            <div className={`col-3 ${classes.ButtonPosition}`}>
              <ButtonToPage
                className={classes.Button}
                url={props.url}
                target="_blank"
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
    </div>
  </IntlProvider>
);
export default CardWithButton;
CardWithButton.propTypes = {
  language: PropTypes.string.isRequired,
  article: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
