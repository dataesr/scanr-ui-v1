import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const PersonsCard = (props) => {
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
    props.results.map((res) => {
      const domains = res.value.domains.map(dom => dom.label[props.language])
        .filter(txt => (txt))
        .filter(txt => (txt.length > 1))
        .filter(txt => (txt.length < 20))
        .sort((a, b) => b.length - a.length)
        .slice(-4);

      return (
        <div className={classes.card} key={res.value.id}>
          <IntlProvider locale={props.language} messages={messages[props.language]}>
            <div className={`d-flex flex-column p-4 ${classes.ResultCard}`}>
              <a
                className={`mb-auto pb-4 align-items-top ${classes.CardHeader}`}
                href={`personnes/${res.value.id}`}
              >
                {`${res.value.firstName} ${res.value.lastName || null}`}
              </a>
              <div className="d-flex flex-row flex-nowrap align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-building" />
                </div>
                <div className="flex-grow-1">
                  {
                    (res.value.affiliations.length > 0 && res.value.affiliations[0].structure.label)
                      ? res.value.affiliations[0].structure.label.fr
                      : <div className={classes.UnknownData}><FormattedHTMLMessage id="resultCard.unknownData" defaultMessage="resultCard.unknownData" /></div>
                  }
                </div>
              </div>
              <div className="d-flex flex-row flex-nowrap align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-map-marker" />
                </div>
                <div className="flex-grow-1">
                  {
                    (res.value.affiliations.length > 0 && res.value.affiliations[0].structure.address.length > 0 && res.value.affiliations[0].structure.address[0].postcode)
                      ? `${res.value.affiliations[0].structure.address[0].city} (${res.value.affiliations[0].structure.address[0].postcode.slice(0, 2)})`
                      : <div className={classes.UnknownData}><FormattedHTMLMessage id="resultCard.unknownData" defaultMessage="resultCard.unknownData" /></div>
                  }
                </div>
              </div>
              <div className="d-flex flex-row flex-nowrap align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-th-large" />
                </div>
                <div className="flex-grow-1">
                  {`idref: ${res.value.id.slice(5)}`}
                </div>
              </div>
              <div className="d-flex flex-row flex-nowrap">
                <div className={classes.Icons}>
                  <i className="fas fa-tags" />
                </div>
                <div className="flex-grow-1">
                  <div className={classes.Tags}>
                    {
                      domains.map(d => (
                        <a href={`recherche/persons?filters={"domains.label.fr": {"type": "MultiValueSearchFilter", "op": "any", "values": ["${d}"]}}`}>{`#${d} `}</a>
                      ))
                    }
                  </div>
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

export default PersonsCard;

PersonsCard.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
};
