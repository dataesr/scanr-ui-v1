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
        <div className="d-flex flex-row flex-nowrap align-items-center">
          {
            (props.data.value.affiliations && props.data.value.affiliations.length > 0 && props.data.value.affiliations[0].structure.address.length > 0 && props.data.value.affiliations[0].structure.address[0].postcode)
              ? (
                <React.Fragment>
                  <div className={classes.Icons}>
                    <i className="fas fa-map-marker" />
                  </div>
                  <div className={`flex-grow-1 ${classes.UnknownData}`}>
                    {`${props.data.value.affiliations[0].structure.address[0].city} (${props.data.value.affiliations[0].structure.address[0].postcode.slice(0, 2)})`}
                  </div>
                </React.Fragment>
              )
              : null
          }
        </div>
      );
    }
    return null;
  };
  const domains = props.data.value.domains.map(dom => dom.label[props.language])
    .filter(txt => (txt))
    .filter(txt => (txt.length > 1))
    .filter(txt => (txt.length < 20))
    .sort((a, b) => b.length - a.length)
    .slice(-4);

  const isSmall = (props.size === 'small') ? { minHeight: '175px' } : { minHeight: '275px' };
  if (props.bgColor) {
    isSmall.backgroundColor = props.bgColor;
  }
  return (
    <div>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className={`d-flex flex-column p-4 ${classes.ResultCard}`} style={isSmall}>
          <a
            className={`pb-1 align-items-top ${classes.CardHeader}`}
            href={`personnes/${props.data.value.id}`}
          >
            {`${props.data.value.firstName} ${props.data.value.lastName || null}`}
          </a>
          <div className={`d-flex align-items-center mb-auto ${classes.Unknown}`}>
            <i className={`fas fa-qrcode pr-1 ${classes.Icons}`} />
            {`idref: ${props.data.value.id.slice(5)}`}
          </div>
          <div className="d-flex flex-row flex-nowrap align-items-center">
            {
              (props.data.value.affiliations && props.data.value.affiliations.length > 0 && props.data.value.affiliations[0].structure.address.length > 0 && props.data.value.affiliations[0].structure.address[0].postcode)
                ? (
                  <React.Fragment>
                    <div className={classes.Icons}>
                      <i className="fas fa-building" />
                    </div>
                    <div className={`flex-grow-1 ${classes.UnknownData}`}>
                      {`${props.data.value.affiliations[0].structure.label.fr}`}
                    </div>
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <div className={classes.Icons}>
                      <i className="fas fa-building" />
                    </div>
                    <div className={classes.UnknownData}><FormattedHTMLMessage id="resultCard.unknownData" defaultMessage="resultCard.unknownData" /></div>
                  </React.Fragment>
                )
            }
          </div>
          {ShouldRenderSmall()}
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
          {ShouldRenderFoundIn(props.data, props.highlights)}
        </div>
      </IntlProvider>
    </div>
  );
};

export default PersonsCard;

PersonsCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  size: PropTypes.string.isRequired,
  highlights: PropTypes.bool,
  bgColor: PropTypes.string,
};
