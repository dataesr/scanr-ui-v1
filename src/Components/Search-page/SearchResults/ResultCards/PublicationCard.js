import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import getSelectedKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
import highlightsFr from './translations/highlights_fr.json';
import highlightsEn from './translations/highlights_en.json';

import classes from './Cards.scss';

const PublicationCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const highlights = {
    fr: highlightsFr,
    en: highlightsEn,
  };
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const productionType = (props.data.productionType)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-clipboard" />
        </div>
        <p className="m-0">
          {messages[props.language][`resultCard.production.${props.data.productionType}`]}
        </p>
      </li>
    )
    : null;

  const coAuthors = (props.data.authors && props.data.authors.length > 0)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-users" />
        </div>
        <p className="m-0">
          {`${props.data.authors.length} ${messages[props.language]['resultCard.production.coAuthors']}`}
        </p>
      </li>
    )
    : (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-users" />
        </div>
        <p className={`m-0 ${classes.UnknownData}`}>
          {messages[props.language]['resultCard.production.noAuthors']}
        </p>
      </li>
    );

  const publicationDate = (props.data.publicationDate)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-calendar" />
        </div>
        <p p className="m-0">
          {new Date(props.data.publicationDate).toLocaleDateString('fr-FR', options)}
        </p>
      </li>
    )
    : (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-calendar" />
        </div>
        <p className={`m-0 ${classes.UnknownData}`}>
          {messages[props.language]['resultCard.production.noDate']}
        </p>
      </li>
    );

  const journal = (props.data.source && props.data.source.title && !props.small)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-folder-open" />
        </div>
        <p p className="m-0">
          {props.data.source.title}
        </p>
      </li>
    )
    : null;

  const highlight = (props.highlights && props.highlights.length > 0)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-search" />
        </div>
        <div className="m-0 flex-grow-1 pl-1">
          <p className={`m-0 ${classes.FoundIn}`}>
            <FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" />
          </p>
          <p className={`d-flex m-0 ${classes.Highlights}`}>
            {
              [...new Set(props.highlights.map(h => (highlights[props.language][h.type] || h.type)))].join(', ')
            }
          </p>
        </div>
      </li>
    )
    : null;


  return (
    <React.Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <article className={`d-flex flex-column ${classes.ResultCard} ${classes[props.cardColor]}`}>
          <h3 className={`mb-auto pb-3 ${classes.CardTitle}`}>
            <a href={`publication/${props.data.id.replace('/', '%25252f')}`}>
              {getSelectedKey(props.data, 'title', props.language, 'default')}
            </a>
          </h3>
          <ul className="m-0 p-0">
            {productionType}
            {coAuthors}
            {publicationDate}
            {journal}
            <hr className={`mb-2 mt-2 ${classes.HighlightProductionSep}`} aria-hidden="true" />
            {highlight}
          </ul>
        </article>
      </IntlProvider>
    </React.Fragment>
  );
};

export default PublicationCard;

PublicationCard.defaultProps = {
  cardColor: 'CardWhite',
  small: false,
};

PublicationCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  highlights: PropTypes.array,
  cardColor: PropTypes.string,
  small: PropTypes.bool,
};
