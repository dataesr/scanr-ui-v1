import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './SourceCard.scss';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * SourceCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SourceCard = (props) => {
  const publisher = (props.data.publisher) ? (
    <Fragment>
      <div className={classes.Title}>
        <FormattedHTMLMessage id="Publication.source.publisher" defaultMessage="Publication.source.publisher" />
      </div>
      <div className={`${classes.Value} ${classes.Publisher}`}>
        {props.data.publisher}
      </div>
    </Fragment>
  ) : null;

  const title = (props.data.title) ? (
    <Fragment>
      <div className={classes.Title}>
        <FormattedHTMLMessage id="Publication.source.title" defaultMessage="Publication.source.title" />
      </div>
      <div className={`flex-grow-1 ${classes.Value}`}>
        {props.data.title}
      </div>
    </Fragment>
  ) : null;

  let issns = null;
  if (props.data.journalIssns) {
    issns = (
      <div>
        <div className={classes.Title}>
          <FormattedHTMLMessage id="Publication.source.issns" defaultMessage="Publication.source.issns" />
        </div>
        <div className={classes.Value}>
          {
            props.data.journalIssns.map(issn => <div>{issn}</div>)
          }
        </div>
      </div>
    );
  }

  const pagination = (props.data.pagination) ? (
    <div>
      <div className={classes.Title}>
        <FormattedHTMLMessage id="Publication.source.pagination" defaultMessage="Publication.source.pagination" />
      </div>
      <div className={classes.Value}>
        {props.data.pagination}
      </div>
    </div>
  ) : null;

  if (!publisher && !title && !issns && !pagination) {
    return null;
  }


  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`d-flex align-items-center flex-column ${classes.SourceCard}`}>
        {publisher}
        {title}
        <div className="d-flex pr-4 pl-4 w-100 justify-content-between">
          {issns}
          {(issns && pagination) ? <div className={classes.Border} /> : null}
          {pagination}
        </div>
      </div>
    </IntlProvider>
  );
};

export default SourceCard;

SourceCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
