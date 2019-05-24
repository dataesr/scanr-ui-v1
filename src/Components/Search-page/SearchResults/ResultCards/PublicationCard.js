import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const isEven = (value) => {
  if (value % 2 === 0) {
    return classes.cardIsLeft;
  }
  return classes.cardIsRight;
};

const PublicationCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  return (
    props.results.map((res, index) => {
      const sideClass = isEven(index);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const PubDate = (res.value.publicationDate) ? new Date(res.value.publicationDate) : 'NA';
      return (
        <div className={`col-12 col-md-6 ${sideClass}`} key={res.value.id}>
          <IntlProvider locale={props.language} messages={messages[props.language]}>
            <div className={`d-flex flex-column ${classes.ResultCard}`}>
              <div className={`d-flex flex-row pr-3 pt-3 pl-4 align-items-start ${classes.GreyTitle}`}>
                <div className={`pr-2 ${classes.Icons} ${classes.GreyTitle}`}>
                  <i className="fas fa-building" />
                </div>
                <div className="flex-grow-1">
                  Publication
                </div>
              </div>
              <a
                className={`mb-auto p-1 pl-4 align-items-top ${classes.CardHeader}`}
                href={`entite/${res.value.id}`}
              >
                {(res.value.title) ? res.value.title.default : null}
              </a>
              <div className="d-flex flex-row pr-3 pb-1 pl-4 align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-building" />
                </div>
                <div className="flex-grow-1">
                  {(res.value.authors.length > 1) ? `${res.value.authors.length} co-authors` : res.value.authors[0].fullName}
                </div>
              </div>
              <div className="d-flex flex-row pr-3 pb-1 pl-4 align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-atom" />
                </div>
                <div className="flex-grow-1">
                  {
                    (PubDate === 'NA') ? PubDate : PubDate.toLocaleDateString('fr-FR', options)
                   }
                </div>
              </div>
              <div className="d-flex flex-row pr-3 pb-1 pl-4 align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-th-large" />
                </div>
                <div className={`flex-grow-1 ${classes.TextOverflow}`}>
                  {(res.value.source) ? res.value.source.title : 'NA'}
                </div>
              </div>
              <div className={`pt-2 pr-3 pl-4 pb-4 d-flex align-items-center ${classes.CardFooter}`}>
                <div className={classes.Icons}>
                  <i className="fas fa-question" />
                </div>
                <div className="col-6">
                  <u><FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" /></u>
                </div>
                <div className="ml-auto">
                  <a href={`entite/${res.value.id}`}>
                    <div className="container">
                      <div className={`row d-flex align-items-center ${classes.ButtonToPage}`}>
                        <div className={`col float-left ${classes.Text}`}>
                          <FormattedHTMLMessage id="resultCard.toPage" defaultMessage="resultCard.toPage" />
                        </div>
                        <div className={`col float-right ${classes.Text}`}>
                          <i className="fas fa-chevron-right" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </IntlProvider>
        </div>
      );
    })
  );
};

export default PublicationCard;

PublicationCard.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
};
