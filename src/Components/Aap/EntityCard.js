import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import getSelectedKey from '../../Utils/getSelectKey';

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

  if (!props.data) { return null; }

  const identifier = (props.data && props.data.id)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-fingerprint" />
        </div>
        <p className={classes.Id}>
          {`ID: ${props.data.id}`}
        </p>
      </li>
    )
    : null;

  const address = (props.data && props.data.address && props.data.address.length > 0 && props.data.address[0].postcode)
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

  const kind = (props.data && props.data.kind && !props.small)
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


  const highlight = (props.highlights)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-search" />
        </div>
        <div className="m-0 flex-grow-1 pl-1">
          <p className={`m-0 ${classes.FoundIn}`}>
            Résultats trouvés dans :
          </p>
          <ul className={`m-0 ${classes.Highlights}`}>
            {
              Object.keys(props.highlights).map(key => (
                <li>
                  {`${highlights[props.language][key]} ${props.highlights[key].length} résultat(s)`}
                  {/* <ul>
                    {
                      props.highlights[key].map(OneHL => (
                        <li>
                          {Parser(OneHL)}
                        </li>
                      ))
                    }
                  </ul> */}
                </li>
              ))
            }
          </ul>
        </div>
      </li>
    )
    : null;

  const country = (props.data && props.data.country)
    ? (
      <li className="d-flex">
        <div className={classes.Icons}>
          <i aria-hidden="true" className="fas fa-map-marker" />
        </div>
        <p className="m-0">
          {props.data.country}
        </p>
      </li>
    )
    : null;

  return (
    <React.Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <article className={`d-flex flex-column ${classes.ResultCard} ${classes[props.cardColor]}`}>
          <h3 className={`mb-auto pb-3 ${classes.CardTitle} ${classes.blockWithText}`}>
            {
              (props.data && props.data.id) ? (
                <a href={`entite/${props.data.id}`} target={props.target}>
                  {getSelectedKey(props.data, 'label', props.language, 'default')}
                </a>
              ) : getSelectedKey(props.data, 'label', props.language, 'default')
            }
          </h3>
          <ul className="m-0 p-0">
            {kind}
            {address}
            {country}
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
  target: '_self',
};

EntityCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  highlights: PropTypes.array,
  cardColor: PropTypes.string,
  small: PropTypes.bool,
  target: PropTypes.string,
};
