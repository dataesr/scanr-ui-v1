import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import getSelectedKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const PersonsCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  const affiliation = (props.data.value.affiliations && props.data.value.affiliations.length > 0 && props.data.value.affiliations[0].structure)
    ? props.data.value.affiliations[0].structure
    : null;

  const address = (affiliation && affiliation.address && affiliation.address.length > 0)
    ? affiliation.address[0]
    : null;

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
            (address)
              ? (
                <React.Fragment>
                  <div className={classes.Icons}>
                    <i className="fas fa-map-marker" />
                  </div>
                  <div className={`flex-grow-1 ${classes.UnknownData}`}>
                    {(address.postcode) ? `${(address.city) ? address.city : ''} (${address.postcode.slice(0, 2)})` : address.city}
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
  let domains = [];
  if (props.data.value.domains && props.data.value.domains.length > 0) {
    domains = props.data.value.domains.map(dom => getSelectedKey(dom, 'label', props.language, 'default'))
      .filter(txt => (txt))
      .filter(txt => (txt.length > 1))
      .filter(txt => (txt.length < 20))
      .sort((a, b) => b.length - a.length)
      .slice(-4);
  }

  const isSmall = (props.size === 'small') ? { minHeight: '175px' } : { minHeight: '275px' };
  if (props.bgColor) {
    isSmall.backgroundColor = props.bgColor;
  }
  if (props.size === 'minimal') {
    return (
      <React.Fragment>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className={`d-flex flex-column p-4 ${classes.ResultCard}`} style={{ minHeight: '100px' }}>
            <a
              className={`pb-1 align-items-top ${classes.CardHeader}`}
              href={`person/${props.data.value.id}`}
            >
              {props.data.value.fullName}
            </a>
            <div className={`d-flex align-items-center mb-auto ${classes.Unknown}`}>
              <i className={`fas fa-qrcode pr-1 ${classes.Icons}`} />
              {`idref: ${props.data.value.id.slice(5)}`}
            </div>
          </div>
        </IntlProvider>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className={`d-flex flex-column p-4 ${classes.ResultCard}`} style={isSmall}>
          <a
            className={`pb-1 align-items-top ${classes.CardHeader}`}
            href={`person/${props.data.value.id}`}
          >
            {`${props.data.value.firstName} ${props.data.value.lastName || null}`}
          </a>
          <div className={`d-flex align-items-center mb-auto ${classes.Unknown}`}>
            <i className={`fas fa-qrcode pr-1 ${classes.Icons}`} />
            {`idref: ${props.data.value.id.slice(5)}`}
          </div>
          <div className="d-flex flex-row flex-nowrap align-items-center">
            {
              (affiliation)
                ? (
                  <React.Fragment>
                    <div className={classes.Icons}>
                      <i className="fas fa-building" />
                    </div>
                    <div className={`flex-grow-1 ${classes.UnknownData}`}>
                      {getSelectedKey(affiliation, 'label', props.language, 'en')}
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
                    <a href={`recherche/persons?filters={"domains.label.${props.language}": {"type": "MultiValueSearchFilter", "op": "any", "values": ["${d}"]}}`}>{`#${d} `}</a>
                  ))
                }
              </div>
            </div>
          </div>
          {ShouldRenderFoundIn(props.data, props.highlights)}
        </div>
      </IntlProvider>
    </React.Fragment>
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
