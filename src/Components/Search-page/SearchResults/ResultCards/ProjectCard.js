import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import getSelectedKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

const ProjectCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const startDate = (props.data.value.startDate) ? new Date(props.data.value.startDate) : null;
  const endDate = (props.data.value.endDate) ? new Date(props.data.value.endDate) : null;

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
        <React.Fragment>
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
        </React.Fragment>
      );
    }
    return null;
  };
  const isSmall = (props.size === 'small') ? { minHeight: '175px' } : { minHeight: '275px' };
  if (props.bgColor) {
    isSmall.backgroundColor = props.bgColor;
  }
  // const status = ((parseInt(props.data.value.year, 0) + props.data.value.duration / 12) >= 2019) ? 'en cours' : 'terminé';
  return (
    <div className={classes.card} key={props.data.value.id}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className={`d-flex flex-column p-4 ${classes.ResultCard}`} style={isSmall}>
          <a
            className={`mb-auto pb-4 align-items-top ${classes.CardHeader}`}
            href={`project/${props.data.value.id}`}
          >
            {getSelectedKey(props.data.value, 'label', props.language, 'default')}
          </a>
          <div className="d-flex flex-row flex-wrap align-items-center">
            <div className={classes.Icons}>
              <i className="fas fa-building" />
            </div>
            <div className="flex-grow-1">
              {(props.data.value.type)}
            </div>
          </div>
          {ShouldRenderSmall()}
          {ShouldRenderFoundIn(props.data, props.highlights)}
        </div>
      </IntlProvider>
    </div>
  );
};

export default ProjectCard;

ProjectCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  size: PropTypes.string.isRequired,
  highlights: PropTypes.bool,
  bgColor: PropTypes.string,
};
