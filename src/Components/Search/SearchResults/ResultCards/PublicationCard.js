import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/fr';
/* Gestion des langues */
import getSelectedKey from '../../../../Utils/getSelectKey';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
import highlightsFr from './translations/highlights_fr.json';
import highlightsEn from './translations/highlights_en.json';

import classes from './Cards.scss';

const PublicationCard = (props) => {
  moment.locale(props.language);
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const highlights = {
    fr: highlightsFr,
    en: highlightsEn,
  };

  // Auteurs
  const getAuthors = (data) => {
    const maxAuthors = 1;
    let authors = [];
    if (!data.authors) {
      return authors;
    }
    const diff = data.authors.length - maxAuthors;
    let others = '';
    if (diff === 1) {
      others = `${(props.language === 'fr') ? 'et ' : 'and '} 1 ${(props.language === 'fr') ? 'auteur' : 'author'}`;
    } else if (diff > 1) {
      others = `${(props.language === 'fr') ? 'et ' : 'and '} ${diff} ${(props.language === 'fr') ? 'auteurs' : 'authors'}`;
    }
    if (data.productionType === 'publication') {
      authors = data.authors.map((author) => {
        if (author.person) {
          return <a href={`person/${author.person.id}`} key={JSON.stringify(author)}>{author.fullName}</a>;
        }
        return <span key={JSON.stringify(author)}>{author.fullName}</span>;
      });
    } else if (data.productionType === 'thesis') {
      authors = data.authors
        .filter(author => author.role === 'author')
        .map((author) => {
          if (author.person) {
            return <a key={JSON.stringify(author)} href={`person/${author.person.id}`}>{author.fullName}</a>;
          }
          return <span key={JSON.stringify(author)}>{author.fullName}</span>;
        });
    } else {
      return null;
    }
    const printedAuthors = authors.slice(0, maxAuthors).reduce((prev, curr) => [prev, ', ', curr]);
    const printedOthers = (props.data.productionType !== 'thesis') ? others : null;
    return { authors: printedAuthors, others: printedOthers };
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

  const auth = getAuthors(props.data);
  const coAuthors = (auth.authors && auth.authors.length > 0)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-users" />
        </div>
        <p className="m-0">
          {auth.authors}
          {' '}
          {auth.others}
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
        <p className="m-0">
          {moment(props.data.publicationDate).format('LL')}
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
        <p className="m-0">
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
            <a href={`publication/${props.data.id.replace(new RegExp('/', 'g'), '%25252f')}`}>
              {getSelectedKey(props.data, 'title', props.language, 'default')}
            </a>
          </h3>
          <ul className="m-0 p-0">
            {productionType}
            {(props.small === 'noAuthors') ? null : coAuthors}
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
