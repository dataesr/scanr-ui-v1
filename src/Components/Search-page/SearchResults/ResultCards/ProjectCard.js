import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const ProjectCard = (props) => {
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
      // const status = ((parseInt(res.value.year, 0) + res.value.duration / 12) >= 2019) ? 'en cours' : 'terminé';
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const startDate = (res.value.startDate) ? new Date(res.value.startDate) : null;
      const endDate = (res.value.endDate) ? new Date(res.value.endDate) : null;
      return (
        <div className={classes.card} key={res.value.id}>
          <IntlProvider locale={props.language} messages={messages[props.language]}>
            <div className={`d-flex flex-column p-4 ${classes.ResultCard}`}>
              <a
                className={`mb-auto pb-4 align-items-top ${classes.CardHeader}`}
                href={`entite/${res.value.id}`}
              >
                {(res.value.label) ? res.value.label.en || res.value.label.en || res.value.label.default : null}
              </a>
              <div className="d-flex flex-row flex-wrap align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-building" />
                </div>
                <div className="flex-grow-1">
                  {(res.value.type)}
                </div>
              </div>
              <div className="d-flex flex-row flex-wrap align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-play" />
                </div>
                <div className="flex-grow-1">
                  {(startDate) ? (startDate.toLocaleDateString('fr-FR', options)) : 'unknown'}
                </div>
              </div>
              <div className="d-flex flex-row flex-wrap align-items-center">
                <div className={classes.Icons}>
                  <i className="fas fa-stop" />
                </div>
                <div className="flex-grow-1">
                  {(endDate) ? (endDate.toLocaleDateString('fr-FR', options)) : 'unknown'}
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

export default ProjectCard;

ProjectCard.propTypes = {
  language: PropTypes.string.isRequired,
  results: PropTypes.array,
};
