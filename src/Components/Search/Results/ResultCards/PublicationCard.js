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

  const getLi = (iconClass, content) => {
    if (content) {
      return (
        <li>
          <i aria-hidden="true" className={`fas ${iconClass} ${classes.Icons}`} />
          <p className="m-0 d-inline">
            {content}
          </p>
        </li>
      );
    }
    return null;
  };

  // Auteurs
  const getAuthors = (data, maxAuthors) => {
    let authors = [];
    if (!data.authors) {
      return { authors: null, others: null };
    }
    const diff = data.authors.length - maxAuthors;
    let others = null;
    const personsFr = (data.productionType === 'publication') ? 'auteurs' : 'personnes';
    const personsEn = (data.productionType === 'publication') ? 'authors' : 'persons';
    const personFr = (data.productionType === 'publication') ? 'auteur' : 'personne';
    const personEn = (data.productionType === 'publication') ? 'author' : 'person';
    if (diff === 1) {
      others = `${(props.language === 'fr') ? ' et ' : ' and '} 1 ${(props.language === 'fr') ? `${personFr}` : `${personEn}`}`;
    } else if (diff > 1) {
      others = `${(props.language === 'fr') ? ' et ' : ' and '} ${diff} ${(props.language === 'fr') ? `${personsFr}` : `${personsEn}`}`;
    }
    if (data.productionType === 'publication') {
      authors = data.authors.map((author) => {
        if (author.person && author.person.fullName) {
          return (
            <React.Fragment>
              <a href={`person/${author.person.id}`} key={JSON.stringify(author)}>{author.fullName}</a>
              {others}
            </React.Fragment>
          );
        }
        return <span key={JSON.stringify(author)}>{author.fullName}</span>;
      });
    } else if (data.productionType === 'thesis') {
      authors = data.authors
        .filter(author => author.role === 'author')
        .map((author) => {
          if (author.person && author.person.fullName) {
            return <a key={JSON.stringify(author)} href={`person/${author.person.id}`}>{author.fullName}</a>;
          }
          return <span key={JSON.stringify(author)}>{author.fullName}</span>;
        });
    } else if (data.authors.length > 0) {
      authors = data.authors
        .filter(author => author.role === 'author')
        .map((author) => {
          if (author.person && author.person.fullName) {
            return <a href={`person/${author.person.id}`} key={JSON.stringify(author)}>{author.fullName}</a>;
          }
          return <span key={JSON.stringify(author)}>{author.fullName}</span>;
        });
    } else {
      return { authors: null, others: null };
    }
    const printedAuthors = authors;
    // const printedOthers = (props.data.productionType !== 'thesis') ? others : null;

    if (authors.length === 0) {
      return messages[props.language]['resultCard.production.noAuthors'];
    }

    // if (others) {
    //   const author = printedAuthors.slice(0, maxAuthors).reduce((prev, curr) => [prev, ', ', curr]);
    //   console.log(author);

    //   return `${author}`;
    // }
    return printedAuthors.slice(0, maxAuthors).reduce((prev, curr) => [prev, ', ', curr]);

    // return { authors: printedAuthors, others: printedOthers };
  };

  const getInventors = (data) => {
    if (!data.authors || data.authors.length === 0) {
      return { inventeurs: null, deposants: null };
    }

    // TODO : gerer auth.country !== 'None' dans les données
    let inventeurs = data.authors.filter((auth) => {
      if (auth.country !== 'None' && auth.rolePatent && auth.rolePatent.find(a => a.role === 'inv')) {
        return true;
      }
      return false;
    });
    inventeurs = [...new Set(inventeurs.map(i => JSON.stringify(i)))].length;

    // TODO : gerer auth.country !== 'None' dans les données
    let depos = data.authors.filter((auth) => {
      if (auth.country !== 'None' && auth.rolePatent && auth.rolePatent.find(role => role.role === 'dep')) {
        return true;
      }
      return false;
    }).map(deposant => (
      { label: deposant.fullName, id: (deposant.affiliations && deposant.affiliations.length) && deposant.affiliations[0].structure }
    ));

    depos = [...new Set(depos.map(i => JSON.stringify(i)))].map(i => JSON.parse(i));
    let deposants = 0;
    const ids = [];
    depos.forEach((deposant) => {
      if (deposant.id) {
        ids.push(deposant.id);
        if (ids.filter(id => id === deposant.id).length < 2) {
          deposants += 1;
        }
      } else {
        deposants += 1;
      }
    });

    if (inventeurs === 0 && deposants === 0) {
      return null;
    }

    return (
      <React.Fragment>
        {(inventeurs > 0) ? <FormattedHTMLMessage id="inventor" values={{ count: inventeurs }} /> : ''}
        {(inventeurs > 0 && deposants > 0) ? ', ' : null}
        {(deposants > 0) ? <FormattedHTMLMessage id="deposant" values={{ count: deposants }} /> : ''}
      </React.Fragment>
    );
  };

  const maxAuthors = 1;
  let coAuthors = null;
  if (props.data.productionType === 'publication' || props.data.productionType === 'thesis') {
    coAuthors = getLi('fa-users', getAuthors(props.data, maxAuthors));
  } else {
    coAuthors = getLi('fa-users', getInventors(props.data));
  }

  let publicationDateStr = '';
  if (props.data.publicationDate) {
    publicationDateStr = moment(props.data.publicationDate).format('LL');
    if (moment(props.data.publicationDate).format('L').slice(0, 5) === '01/01') {
      publicationDateStr = moment(props.data.publicationDate).format('L').slice(6, 10);
    }
  }

  let publicationDate = null;
  if (props.data.productionType === 'patent') {
    publicationDate = getLi('fa-calendar', moment(props.data.submissionDate).format('LL'));
  } else if (props.data.publicationDate) {
    publicationDate = getLi('fa-calendar', publicationDateStr);
  } else {
    publicationDate = getLi('fa-calendar', messages[props.language]['resultCard.production.noDate']);
  }

  const journal = (props.data.source && props.data.source.title && !props.small)
    ? getLi('fa-folder-open', props.data.source.title)
    : null;

  // let previousHighlight = '';
  let allHighlights = '';
  if (props.highlights && props.highlights.length > 0) {
    // previousHighlight = [...new Set(props.highlights.map(h => (highlights[props.language][h.type] || h.type)))].join(', ');
    let firstSource = '';
    for (let i = 0; i < props.highlights.length; i += 1) {
      const currentH = props.highlights[i];
      const source = highlights[props.language][currentH.type] || currentH.type;
      let value = currentH.value;
      if (value.length > 50) {
        value = value.concat('...');
      }
      if (i === 0) {
        allHighlights = source.concat(' : ', value, '<br/>');
        firstSource = source;
      } else if (i === 1) {
        let otherHighlights = [...new Set(props.highlights.slice(1).map(h => (highlights[props.language][h.type] || h.type)))];
        if (otherHighlights.length > 0 && otherHighlights[0] === firstSource) {
          otherHighlights = otherHighlights.slice(1);
        }
        if (otherHighlights.length > 0) {
          allHighlights = allHighlights.concat(messages[props.language]['resultCard.found.other'], otherHighlights.join(', '));
        }
      }
    }
  }
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
            <FormattedHTMLMessage defaultMessage={allHighlights} id="cardHighlight" />
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
            {getLi('fa-clipboard', (props.data.productionType) ? messages[props.language][`resultCard.production.${props.data.productionType}`] : null)}
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
