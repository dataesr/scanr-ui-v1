import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '../../../Shared/SectionTitle';

// import getSelectKey from '../../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Evaluations.scss';
import logo from '../../../../Shared/images/hceres-logo.png';

/**
 * Evaluations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Evaluations = (props) => {
  // Test des données
  if (!props.data || !props.data.evaluations || !props.data.evaluations.length > 0) {
    return null;
  }

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  const evaluations = props.data.evaluations;

  // 1) Liste des évaluateurs
  const evaluators = [];
  /* eslint-disable-next-line */
  for (const evaluation of evaluations) {
    const evaluator = evaluation.evaluator.split('__')[0];
    if (!evaluators.includes(evaluator)) {
      evaluators.push(evaluator);
    }
  }

  const JSXcontents = [];

  // Groupement par évaluateur
  /* eslint-disable-next-line */
  for (const evaluator of evaluators) {
    const listOfEvaluations = evaluations.filter(ev => ev.evaluator.split('__')[0] === evaluator);
    console.log('listOfEvaluations/', evaluator);
    console.log('listOfEvaluations=>', listOfEvaluations);

    // 2) Groupement par année
    const years = [];
    /* eslint-disable-next-line */
    for (const evaluation of listOfEvaluations) {
      if (!years.includes(evaluation.year)) {
        years.push(evaluation.year);
      }
    }
    // Plus récentes en premier
    years.sort((a, b) => b - a);

    console.log('listOfEvaluations', years);
    const jsx = years.map((year) => {
      let finalList = evaluations.filter(ev => ev.evaluator.split('__')[0] === evaluator && ev.year === year);
      const counter = finalList.length;
      let miniListJSX = null;
      let listJSX = null;
      if (counter < 4) {
        miniListJSX = finalList.map((el) => {
          const labels = el.evaluator.split('__');
          return (
            <div>
              <div>
                {labels[1]}
              </div>
              <div className="d-flex flex-row">
                <div>
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    {labels[2]}
                    &nbsp;
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
            </div>
          );
        });
        finalList = null;
      } else {
        listJSX = finalList.map((el) => {
          const labels = el.evaluator.split('__');
          return (
            <div className={classes.InnerListItem}>
              <div>
                {labels[1]}
              </div>
              <div className="d-flex flex-row">
                <div>
                  <a href={el.url} target="_blank" rel="noopener noreferrer">
                    {labels[2]}
                    &nbsp;
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </div>
            </div>
          );
        });
      }

      return (
        <div className={`col-md-6 ${classes.NoSpace} ${classes.CardContainer}`}>
          <div className={classes.EvaluationCard}>
            <div className="d-flex flex-row">
              <p className="w-100 text-center">
                <p className={classes.TitleYear}>{year}</p>
                <p className={classes.NbReports}>{counter}</p>
                <p className={classes.ReportsLabel}>
                  {messages[props.language].report}
                  {(counter > 1) ? 's' : null}
                </p>
              </p>
              <div className="ml-auto">
                <img src={logo} alt="Evaluator logo" />
              </div>
            </div>
            <div>
              {miniListJSX}
              {(finalList) ? (<div>{listJSX}</div>) : null}
            </div>
          </div>
        </div>
      );
    });
    JSXcontents.push(jsx);
  }


  return (
    <div className={classes.Evaluations}>
      <div className="container">
        <SectionTitle
          icon="fa-landmark"
          objectType="structures"
          language={props.language}
          id={props.id}
          title={messages[props.language].title}
        />
        <div className="row">
          {
            JSXcontents.map(card => card)
          }
        </div>
      </div>
    </div>
  );
};

export default Evaluations;

Evaluations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
