import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';


const EntityCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const ShouldRenderFoundIn = (res) => {
    if (res.highlights && res.highlights.length > 0) {
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
              res.highlights.map((h) => {
                const high = h.type.concat(': ').concat(h.value);
                return (<div className={classes.Highlights} dangerouslySetInnerHTML={{ __html: high }} />);
              })
            }
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    props.results.map(res => (
      <div className={classes.card} key={res.value.id}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className={`d-flex flex-column p-4 ${classes.ResultCard}`}>
            <a
              className={`mb-auto pb-4 align-items-top ${classes.CardHeader}`}
              href={`entite/${res.value.id}`}
            >
              {(res.value.label) ? res.value.label[props.language] : null}
            </a>
            <div className="d-flex flex-row flex-nowrap align-items-center">
              <div className={classes.Icons}>
                <i className="fas fa-map-marker" />
              </div>
              <div className="flex-grow-1">
                {
                  (res.value.address && res.value.address.length > 0 && res.value.address[0].postcode)
                    ? `${res.value.address[0].city} (${res.value.address[0].postcode.slice(0, 2)})`
                    : null
                }
              </div>
            </div>
            <div className="d-flex flex-row flex-nowrap align-items-center">
              <div className={classes.Icons}>
                <i className="fas fa-building" />
              </div>
              <div className="flex-grow-1">
                {res.value.nature}
              </div>
            </div>
            <div className="d-flex flex-row flex-nowrap align-items-center">
              <div className={classes.Icons}>
                <i className="fas fa-atom" />
              </div>
              <div className="flex-grow-1">
                {res.value.nature}
              </div>
            </div>
            <div className="d-flex flex-row flex-nowrap align-items-center">
              <div className={classes.Icons}>
                <i className="fas fa-th-large" />
              </div>
              <div className="flex-grow-1">
                {`Identifiant: ${res.value.id}`}
              </div>
            </div>
            {ShouldRenderFoundIn(res)}
          </div>
        </IntlProvider>
      </div>
    ))
  );
};

export default EntityCard;

EntityCard.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
};


// <div className={`pt-2 pr-3 pl-4 pb-4 d-none d-lg-flex align-items-center ${classes.CardFooter}`}>
//   <div className={classes.Icons}>
//     <i className="fas fa-question" />
//   </div>
//   <div className="col-6">
//     <u><FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" /></u>
//   </div>
//   <div className="ml-auto">
//     <a href={`entite/${res.value.id}`}>
//       <div className="container">
//         <div className={`row d-flex align-items-center ${classes.ButtonToPage}`}>
//           <div className={`col float-left ${classes.Text}`}>
//             <FormattedHTMLMessage id="resultCard.toPage" defaultMessage="resultCard.toPage" />
//           </div>
//           <div className={`col float-right ${classes.Text}`}>
//             <i className="fas fa-chevron-right" />
//           </div>
//         </div>
//       </div>
//     </a>
//   </div>
// </div>
//
