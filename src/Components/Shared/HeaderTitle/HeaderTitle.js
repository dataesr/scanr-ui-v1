import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

// import BreadCrumb from '../Ui/Breadcrumb/Breadcrumb';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './HeaderTitle.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const HeaderTitle = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.HeaderTitle}>
      <div className="container">
        <div className="row">
          <nav className={classes.BreadCrumb} aria-label="breadcrumb">
            <ol className={`breadcrumb ${classes.Breadcrumb}`}>
              <li className={`breadcrumb-item ${classes.item}`}>
                <a href={props.url1}>
                  <FormattedHTMLMessage
                    id="breadcrumb.first"
                    defaultMessage="breadcrumb.first"
                  />
                </a>
              </li>
              <li className={`breadcrumb-item active ${classes.active}`} aria-current="page">
                <a href={props.url2}>
                  <FormattedHTMLMessage
                    id={`breadcrumb.second.${props.labelkey}`}
                    defaultMessage={`breadcrumb.second.${props.labelkey}`}
                  />
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className={classes.title}>
            {
              (props.title)
                ? props.title
                : (
                  <FormattedHTMLMessage
                    id={`Page.title.${props.labelkey}`}
                    defaultMessage={`Page.title.${props.labelkey}`}
                  />
                )
              }
          </div>
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default HeaderTitle;

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  labelkey: PropTypes.string.isRequired,
  title: PropTypes.string,
  url1: PropTypes.string,
  url2: PropTypes.string,
};
