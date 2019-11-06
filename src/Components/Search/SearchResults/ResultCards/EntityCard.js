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
        <p p className="m-0">
          {props.data.kind.join(', ')}
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


// <div className={`pt-2 pr-3 pl-4 pb-4 d-none d-lg-flex align-items-center ${classes.CardFooter}`}>
//   <div className={classes.Icons}>
//     <i aria-hidden="true" className="fas fa-question" />
//   </div>
//   <div className="col-6">
//     <u><FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" /></u>
//   </div>
//   <div className="ml-auto">
//     <a href={`entite/${props.data.id}`}>
//       <div className="container">
//         <div className={`row d-flex align-items-center ${classes.ButtonToPage}`}>
//           <div className={`col float-left ${classes.Text}`}>
//             <FormattedHTMLMessage id="resultCard.toPage" defaultMessage="resultCard.toPage" />
//           </div>
//           <div className={`col float-right ${classes.Text}`}>
//             <i aria-hidden="true" className="fas fa-chevron-right" />
//           </div>
//         </div>
//       </div>
//     </a>
//   </div>
// </div>
//
