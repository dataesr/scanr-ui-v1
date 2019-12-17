import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import getSelectedKey from '../../../../Utils/getSelectKey';
import highlightsFr from './translations/highlights_fr.json';
import highlightsEn from './translations/highlights_en.json';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const ProjectCard = (props) => {
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
  };

  const type = (props.data.type)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-building" />
        </div>
        <p className="m-0">
          {props.data.type}
        </p>
      </li>
    )
    : null;

  const year = (props.data.year && !props.small)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-calendar" />
        </div>
        <p className="m-0">
          {
            new Date(props.data.startDate).toLocaleDateString('fr-FR', options) !== 'Invalid Date'
              ? new Date(props.data.startDate).toLocaleDateString('fr-FR', options)
              : props.data.year
          }
        </p>
      </li>
    )
    : null;

  const status = (props.data.endDate && new Date(props.data.endDate).toLocaleDateString('fr-FR', options) > '2019')
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-battery-half" />
        </div>
        <p className="m-0">
          <FormattedHTMLMessage id="resultCard.status.running" defaultMessage="resultCard.status.running" />
        </p>
      </li>
    )
    : (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-battery-full" />
        </div>
        <p className="m-0">
          <FormattedHTMLMessage id="resultCard.status.over" defaultMessage="resultCard.status.over" />
        </p>
      </li>
    );

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

  let cardTitle = (getSelectedKey(props.data, 'label', props.language, 'default')) ? getSelectedKey(props.data, 'label', props.language, 'default') : getSelectedKey(props.data, 'acronym', props.language, 'default');
  if (!cardTitle) {
    cardTitle = props.data.id;
  }
  return (
    <React.Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <article className={`d-flex flex-column ${classes.ResultCard} ${classes[props.cardColor]}`}>
          <h3 className={`mb-auto pb-3 ${classes.CardTitle}`}>
            <a href={`project/${props.data.id}`}>
              { cardTitle }
            </a>
          </h3>
          <ul className="m-0 p-0">
            {type}
            {year}
            {status}
            <hr className={`mb-2 mt-2 ${classes.HighlightProjectSep}`} aria-hidden="true" />
            {highlight}
          </ul>
        </article>
      </IntlProvider>
    </React.Fragment>
  );
};

export default ProjectCard;

ProjectCard.defaultProps = {
  cardColor: 'CardWhite',
  small: false,
};

ProjectCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  highlights: PropTypes.array,
  cardColor: PropTypes.string,
  small: PropTypes.bool,
};
