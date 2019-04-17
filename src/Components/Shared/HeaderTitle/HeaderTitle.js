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
            <ol className={`breadcrumb ${classes.breadcrumb}`}>
              <li className={`breadcrumb-item ${classes.item}`}>
                <a href="/">
                  <FormattedHTMLMessage
                    id={`breadcrumb.first`}
                    defaultMessage={`breadcrumb.first`}
                  />
                </a>
              </li>
              <li className={`breadcrumb-item active ${classes.active}`} aria-current="page">
                <a href="#">
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
            <FormattedHTMLMessage
              id={`Page.title.${props.label}`}
              defaultMessage={`Page.title.${props.label}`}
            />
          </div>
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default HeaderTitle;

HeaderTitle.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelkey: PropTypes.string.isRequired,
};
