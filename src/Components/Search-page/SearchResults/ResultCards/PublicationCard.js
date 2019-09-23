import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const PublicationCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const ShouldRenderFoundIn = (res) => {
    if (res.highlights && res.highlights.length > 0) {
      return (
        <div className="d-flex flex-row flex-nowrap pt-1">
          <div className={classes.Icons}>
            <i className="fas fa-search" />
          </div>
          <div className="flex-grow-1">
            <div className={classes.FoundIn}>
              <FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" />
            </div>
            {
              res.highlights.map((h) => {
                const high = h.type.concat(': ').concat(h.value);
                return (<div key={h.value} className={classes.Highlights} dangerouslySetInnerHTML={{ __html: high }} />);
              })
            }
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    props.results.map((res) => {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const PubDate = (res.value.publicationDate) ? new Date(res.value.publicationDate) : 'NA';
      return (
        <div className={classes.card} key={res.value.id}>
          <IntlProvider locale={props.language} messages={messages[props.language]}>
            <div className={`d-flex flex-column pt-3 pl-4 pr-4 pb-4 ${classes.ResultCard}`}>
              <div className={`d-flex pb-1 ${classes.GreyTitle}`}>
                <div className={`${classes.Icons} ${classes.GreyTitle}`}>
                  <i className="fas fa-building" />
                </div>
                <div className="flex-grow-1">
                  Publication
                </div>
              </div>
              <a
                className={`mb-auto align-items-top ${classes.CardHeader}`}
                href={`entite/${res.value.id}`}
              >
                {(res.value.title) ? res.value.title.default : null}
              </a>
              <div className="d-flex">
                <div className={classes.Icons}>
                  <i className="fas fa-building" />
                </div>
                <div className="flex-grow-1">
                  {(res.value.authors && res.value.authors.length > 1) ? `${res.value.authors.length} co-authors` : res.value.authors[0].fullName}
                </div>
              </div>
              <div className="d-flex">
                <div className={classes.Icons}>
                  <i className="fas fa-atom" />
                </div>
                <div className="flex-grow-1">
                  {
                    (PubDate === 'NA') ? PubDate : PubDate.toLocaleDateString('fr-FR', options)
                   }
                </div>
              </div>
              <div className="d-flex">
                <div className={classes.Icons}>
                  <i className="fas fa-th-large" />
                </div>
                <div className={`flex-grow-1 ${classes.TextOverflow}`}>
                  {(res.value.source) ? res.value.source.title : 'NA'}
                </div>
              </div>
              {ShouldRenderFoundIn(res)}
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
