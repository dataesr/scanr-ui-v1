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

const EntityCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const highlights = {
    fr: highlightsFr,
    en: highlightsEn,
  };

  const identifier = (props.data.id)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-fingerprint" />
        </div>
        <p className="m-0">
          {`ID: ${props.data.id}`}
        </p>
      </li>
    )
    : null;

  const address = (props.data.address && props.data.address.length > 0 && props.data.address[0].postcode)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-map-marker" />
        </div>
        <p className="m-0">
          {`${props.data.address[0].city} (${props.data.address[0].postcode.slice(0, 2)})`}
        </p>
      </li>
    )
    : null;

  const kind = (props.data.kind && !props.small)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-building" />
        </div>
        <p className="m-0">
          {props.data.kind.join(', ')}
        </p>
      </li>
    )
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
          <h3 className={`mb-auto pb-3 ${classes.CardTitle} ${classes.blockWithText}`}>
            <a href={`entite/${props.data.id}`}>
              {getSelectedKey(props.data, 'label', props.language, 'default')}
            </a>
          </h3>
          <ul className="m-0 p-0">
            {kind}
            {address}
            {identifier}
            <hr className={`mb-2 mt-2 ${classes.HighlightEntitySep}`} aria-hidden="true" />
            {highlight}
          </ul>
        </article>
      </IntlProvider>
    </React.Fragment>
  );
};

export default EntityCard;

EntityCard.defaultProps = {
  cardColor: 'CardWhite',
  small: false,
};

EntityCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  highlights: PropTypes.array,
  cardColor: PropTypes.string,
  small: PropTypes.bool,
};
