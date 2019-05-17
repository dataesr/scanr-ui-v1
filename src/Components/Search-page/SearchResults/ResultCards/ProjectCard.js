import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Cards.scss';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage'

const isEven = (value) => {
  if (value % 2 === 0) {
    return classes.cardIsLeft;
  }
  return classes.cardIsRight;
};

const ProjectCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  return (
    props.resultsData.map((res, index) => {
      const sideClass = isEven(index);
      return (
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className={`col-6 ${sideClass}`}>
            <div className={`container d-flex flex-column ${classes.ResultCard}`}>
              <a
                className={`row p-3 pl-4 pt-4 align-items-top flex-grow-1 ${classes.CardHeader}`}
                href={`entite/${res.value.id}`}
              >
                {res.value.type}
              </a>
              <div className={`row pr-3 pb-1 pl-4 align-items-center ${classes.CardContent}`}>
                <div className={classes.Icons}>
                  <i className="fas fa-map-marker" />
                </div>
                <div className="col-10">
                  p
                </div>
                <div className={classes.Icons}>
                  <i className="fas fa-building" />
                </div>
                <div className="col-10">
                  p
                </div>
                <div className={classes.Icons}>
                  <i className="fas fa-atom" />
                </div>
                <div className="col-10">
                  p
                </div>
                <div className={classes.Icons}>
                  <i className="fas fa-th-large" />
                </div>
                <div className="col-10">
                  p
                </div>
              </div>
              <div className={`row pt-2 pr-3 pl-4 pb-4 d-flex align-items-center ${classes.CardFooter}`}>
                <div className={classes.Icons}>
                  <i className="fas fa-question" />
                </div>
                <div className="col-6">
                  <u><FormattedHTMLMessage id="resultCard.foundIn" defaultMessage="resultCard.foundIn" /></u>
                </div>
                <div className="ml-auto">
                  <a href={`entite/${res.value.id}`}>
                    <div className="container">
                      <div className={`row d-flex align-items-center ${classes.ButtonToPage}`}>
                        <div className={`col float-left ${classes.Text}`}>
                          <FormattedHTMLMessage id="resultCard.toPage" defaultMessage="resultCard.toPage" />
                        </div>
                        <div className={`col float-right ${classes.Text}`}>
                          <i className="fas fa-chevron-right" />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </IntlProvider>
      );
    })
  );
};

export default ProjectCard;

ProjectCard.propTypes = {
  language: PropTypes.string.isRequired,
  resultsData: PropTypes.object,
};
