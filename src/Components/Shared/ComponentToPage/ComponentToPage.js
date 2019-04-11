import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './ComponentToPage.scss';

/* const messages = {
  fr: messagesFr,
  en: messagesEn,
};
*/


const ComponentToPage = props => (
/*  <IntlProvider locale={props.language} messages={messages[props.language]}> */
  <section className={`${classes.ComponentToPage} ${classes[props.cssClass]}`}>
    <div className="container">
      <div className="row">
        <div className="col-lg-10">
          <FormattedHTMLMessage
            id={`ComponentToPage.${props.labelKey}`}
            defaultMessage={`ComponentToPage.${props.labelKey}`}
          />
        </div>
        <div className="col-lg-2 text-right">
          <ButtonToPage
            className={`${classes.MarginTop} ${classes.Button}`}
            url={props.url}
          >
            <FormattedHTMLMessage
              id={`ButtonToPage.${props.btnText}`}
              defaultMessage={`ButtonToPage.${props.btnText}`}
            />
          </ButtonToPage>

        </div>
      </div>
    </div>
  </section>
/*  </IntlProvider> */
);

export default ComponentToPage;

ComponentToPage.propTypes = {
  cssClass: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  /*  language: PropTypes.string.isRequired, */
  url: PropTypes.string.isRequired,
};
