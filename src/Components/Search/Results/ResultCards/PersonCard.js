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

const PersonCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const highlights = {
    fr: highlightsFr,
    en: highlightsEn,
  };

  const affiliation = (props.data.affiliations && props.data.affiliations.length > 0 && props.data.affiliations[0].structure)
    ? props.data.affiliations.sort((a, b) => b.endDate - a.endDate)[0].structure
    : null;

  const address = (affiliation && affiliation.address && affiliation.address.length > 0)
    ? affiliation.address[0]
    : null;

  let domains = [];
  if (props.data.domains && props.data.domains.length > 0) {
    domains = props.data.domains.map(dom => getSelectedKey(dom, 'label', props.language, 'default'))
      .filter(txt => (txt))
      .filter(txt => (txt.length > 1))
      .filter(txt => (txt.length < 18))
      .sort((a, b) => a.length - b.length)
      .slice(-4);
  }
  domains = [...new Set(domains)];

  let affiliations;

  if (affiliation) {
    affiliations = (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-building" />
        </div>
        <p className="m-0">
          {getSelectedKey(affiliation, 'label', props.language, 'en')}
        </p>
      </li>
    );
  } else if (!affiliation && props.onlyExisting) {
    affiliations = null;
  } else {
    affiliations = (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-building" />
        </div>
        <p className={`m-0 ${classes.UnknownData}`}>
          {messages[props.language]['resultCard.unknownData']}
        </p>
      </li>
    );
  }

  const addresses = (address && !props.small)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-map-marker" />
        </div>
        <p className="m-0">
          {`${(address.city) ? address.city : ''} ${(address.postcode) ? ` ${address.postcode}` : ''}`}
        </p>
      </li>
    )
    : null;

  const identifier = (props.data.id)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-fingerprint" />
        </div>
        <p className="m-0">
          {`ID: ${props.data.id.slice(5)}`}
        </p>
      </li>
    )
    : null;

  const domain = (domains && domains.length > 0 && !props.small)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-tags" />
        </div>
        <ul className={`m-0 p-0 ${classes.NoneStyleUL}`}>
          {
            domains.map(d => (
              <li key={d} className={classes.InlineLI}>
                <a href={`recherche/persons?filters={"domains.label.${props.language}": {"type": "MultiValueSearchFilter", "op": "any", "values": ["${d}"]}}`}>{`#${d} `}</a>
              </li>
            ))
          }
        </ul>
      </li>
    )
    : null;

  // let previousHighlight = '';
  let allHighlights = '';
  if (props.highlights && props.highlights.length > 0) {
    // previousHighlight = [...new Set(props.highlights.map(h => (highlights[props.language][h.type] || h.type)))].join(', ');
    for (let i = 0; i < props.highlights.length; i += 1) {
      const currentH = props.highlights[i];
      const source = highlights[props.language][currentH.type];
      let value = currentH.value;
      if (value.length > 50) {
        value = value.concat('...');
      }
      if (i === 0) {
        allHighlights = source.concat(' : ', value, '<br/>');
      } else if (i === 1) {
        let otherHighlights = [...new Set(props.highlights.slice(1).map(h => (highlights[props.language][h.type] || h.type)))];
        otherHighlights = otherHighlights.slice(1);
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
            <a href={`person/${props.data.id}`}>
              {props.data.fullName || `${(props.data.firstName) ? props.data.firstName : ''} ${(props.data.lastName) ? ` ${props.data.lastName}` : ''}`}
            </a>
          </h3>
          <ul className="m-0 p-0">
            {identifier}
            {affiliations}
            {addresses}
            {domain}
            <hr className={`mb-2 mt-2 ${classes.HighlightPersonSep}`} aria-hidden="true" />
            {highlight}
          </ul>
        </article>
      </IntlProvider>
    </React.Fragment>
  );
};

export default PersonCard;

PersonCard.defaultProps = {
  cardColor: 'CardWhite',
  small: false,
  onlyExisting: false,
};

PersonCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  highlights: PropTypes.array,
  cardColor: PropTypes.string,
  small: PropTypes.bool,
  onlyExisting: PropTypes.bool,
};
