import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ButtonToPage from '../Buttons/ButtonToPage2';

import classes from './SimpleCardWithButton.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * SimpleCardWithButton component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimpleCardWithButton = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} aria-hidden="true" /></div> : null;
  const title = (props.title) ? <h3 className={classes.Title}>{props.title}</h3> : null;
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;
  const url = props.url;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SimpleCardWithButton}>
      {logo}
      {title}
      {label}
      {tooltip}
      {
          (url)
            ? (
              <div className="mt-auto">
                <ButtonToPage
                  className={`${classes.Button} ${classes.btn_scanrBlue}`}
                  url={url}
                  target="_blank"
                >
                  <IntlProvider locale={props.language} messages={messages[props.language]}>
                    <FormattedHTMLMessage
                      id={props.link}
                      defaultMessage="Voir le site"
                    />
                  </IntlProvider>
                </ButtonToPage>
              </div>
            )
            : null
        }
    </div>
  );
};

export default SimpleCardWithButton;

SimpleCardWithButton.propTypes = {
  logo: PropTypes.string,
  language: PropTypes.string,
  url: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
};
