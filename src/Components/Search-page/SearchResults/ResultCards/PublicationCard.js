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
  const ShouldRenderFoundIn = (data, highlight) => {
    if (highlight && data.highlights && data.highlights.length > 0) {
      return (
        <div className="d-flex flex-row flex-nowrap">
          <div className={classes.Icons}>
            <i className="fas fa-search" />
          </div>
          <div className="flex-grow-1 pl-1">
            <div className={classes.FoundIn}>
              <FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" />
            </div>
            {
              data.highlights.map((h) => {
                const high = h.type.concat(': ').concat(h.value);
                // eslint-disable-next-line
                return (<div key={h.value} className={classes.Highlights} dangerouslySetInnerHTML={{ __html: high }} />);
              })
            }
          </div>
        </div>
      );
    }
    return null;
  };
  const ShouldRenderSmall = () => {
    if (props.size !== 'small') {
      return (
        <React.Fragment>
          <div className="d-flex">
            <div className={classes.Icons}>
              <i className="fas fa-th-large" />
            </div>
            <div className={`flex-grow-1 ${classes.TextOverflow}`}>
              {(props.data.value.source) ? props.data.value.source.title : 'NA'}
            </div>
          </div>
        </React.Fragment>
      );
    }
    return null;
  };
  const isSmall = (props.size === 'small') ? { minHeight: '175px' } : { minHeight: '275px' };
  if (props.bgColor) {
    isSmall.backgroundColor = props.bgColor;
  }
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const PubDate = (props.data.value.publicationDate) ? new Date(props.data.value.publicationDate) : 'NA';
  return (
    <div>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className={`d-flex flex-column pt-3 pl-4 pr-4 pb-4 ${classes.ResultCard}`} style={isSmall}>
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
            href={`entite/${props.data.value.id}`}
          >
            {(props.data.value.title) ? props.data.value.title.default : null}
          </a>
          <div className="d-flex">
            <div className={classes.Icons}>
              <i className="fas fa-building" />
            </div>
            <div className="flex-grow-1">
              {
                (props.data.value.authors && props.data.value.authors.length && props.data.value.authors.length > 1)
                  ? `${props.data.value.authors.length} co-authors`
                  : props.data.value.authors[0].fullName
              }
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
          {ShouldRenderSmall()}
          {ShouldRenderFoundIn(props.data, props.highlights)}
        </div>
      </IntlProvider>
    </div>
  );
};

export default PublicationCard;

PublicationCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  size: PropTypes.string.isRequired,
  highlights: PropTypes.bool,
  bgColor: PropTypes.string,
};
