import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */

import ButtonToPage from '../Ui/Buttons/ButtonToPage';
import classes from './MediasCard2.scss';

const CardWithButton = props => (
  <IntlProvider locale={props.language} messages={props.messages[props.language]}>
    <div className={`col-lg-12 ${classes.MediasCard}`}>
      <div className={classes.Content}>
        <div className={`container ${classes.TopCard} `}>
          <div className={classes.Title}>
            {props.title}
          </div>
        </div>
        <div className={`container ${classes.BottomCard}`}>
          <div className="row">
            <div className="col-9">
              <div className={classes.Source}>
                <div className={classes.TitleSource}>
                  {props.source}
                </div>
              </div>
              <div className={classes.Date}>
                {props.date}
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
  messages: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
